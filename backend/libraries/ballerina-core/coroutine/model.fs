﻿module Ballerina.Coroutines
open Ballerina.Fun
open System
open System.Threading.Tasks

type DeltaT = TimeSpan

type Coroutine<'a, 's, 'e> = Co of ('s * Map<Guid, 'e> * DeltaT -> CoroutineResult<'a, 's, 'e> * Option<U<'s>> * Option<U<Map<Guid, 'e>>>)
  with 
    static member map<'a, 'b, 's, 'e> (f:('a -> 'b)) ((Co p):Coroutine<'a,'s,'e>): Coroutine<'b, 's, 'e> = 
      Co(fun (s, e, dt) ->
        let (p_result, s_updater, e_updater) = p(s,e,dt)
        (CoroutineResult.map f p_result, s_updater, e_updater)
      )

and CoroutineResult<'a, 's, 'e> = 
  | Return of 'a
  | Any of List<Coroutine<'a, 's, 'e>>
  // | All of List<Coroutine<'a, 's, 'e>>
  | Spawn of Coroutine<Unit, 's, 'e>
  | Wait of TimeSpan * Coroutine<'a, 's, 'e>
  | On of ('e -> Option<'a>)
  | Do of ('s -> 'a)
  | Await of Async<'a>
  | Awaiting of Guid * Async<'a> * Task<'a>
  | Then of (Coroutine<Coroutine<'a, 's, 'e>, 's, 'e>)
  | Combine of (Coroutine<Unit, 's, 'e> * Coroutine<'a, 's, 'e>)
  with 
    static member map<'a, 'b, 's, 'e> (f:('a -> 'b)) (p:CoroutineResult<'a,'s,'e>) : CoroutineResult<'b, 's, 'e> = 
      match p with
      | Return x -> x |> f |> Return
      | Any ps -> ps |> List.map(Coroutine.map f) |> Any
      // | All ps -> ps |> List.map(Coroutine.map f) |> All
      | Spawn p -> p |> Spawn
      | Do (g) -> Do(g >> f)
      | Wait (t, p) -> Wait(t, p |> Coroutine.map f)
      | On(e_predicate) -> On(fun e -> e |> e_predicate |> Option.map f)
      | Awaiting (id,p,t) -> 
          Awaiting(
            id,
            async{ 
              let! x = p
              return f x
            },
            t.ContinueWith(new Func<_,_>(fun (a:Task<'a>) -> f(a.Result)))
          )
      | Await (p) -> 
          Await(
            async{ 
              let! x = p
              return f x
            }
          )
      | Then(p_p) -> 
          p_p |> Coroutine.map (Coroutine.map f) |> CoroutineResult.Then
        // Then(p', k >> (Coroutine.map f))
      | Combine(p, k) -> 
        Combine(p, k |> Coroutine.map  f)

let rec bind(p:Coroutine<'a, 's, 'e>, k:'a -> Coroutine<'b, 's, 'e>) = 
    Co(fun _ -> Then(p |> Coroutine.map k), None, None)
and repeat (p:Coroutine<'a,'s,'e>) = 
  bind(p, fun _ -> repeat p)
  
type CoroutineBuilder() = 
  member _.Zero() = 
    Co(fun _ -> CoroutineResult.Return(()), None, None)
  member _.Return(result:'a) = 
    Co(fun _ -> CoroutineResult.Return(result), None, None)
  member _.Yield(result:'a) = 
    Co(fun _ -> CoroutineResult.Return(result), None, None)
  member co.Yield() =
    Co(fun _ -> CoroutineResult.Wait(TimeSpan.FromMilliseconds(0), co.Return()), None, None)
  member _.Bind(p:Coroutine<'a, 's, 'e>, k:'a -> Coroutine<'b, 's, 'e>) = 
    bind(p, k)
  member _.Combine(p:Coroutine<Unit, 's, 'e>, k:Coroutine<'a, 's, 'e>) = 
    Co(fun _ -> CoroutineResult.Combine(p, k), None, None)
  member _.Any(ps:List<Coroutine<'a,'s,'e>>) =
    Co(fun _ -> CoroutineResult.Any(ps), None, None)
  // member _.All(ps:List<Coroutine<'a,'s,'e>>) =
  //   Co(fun _ -> CoroutineResult.Any(ps), None, None)
  member _.On(p_e:'e -> Option<'a>) =
    Co(fun _ -> CoroutineResult.On(p_e), None, None)
  [<CustomOperation("wait", MaintainsVariableSpaceUsingBind = true) >]
  member co.Wait(p:Coroutine<_,_,_>, [<ProjectionParameter>] t) =
    co.Bind(p, fun x -> 
      Co(fun _ -> CoroutineResult.Wait(t x, co.Return()), None, None)
    )
  // member co.Wait(t) =
  //     Co(fun _ -> CoroutineResult.Wait(t, co.Return()), None, None)
  member _.Do(f : 's -> 'a) =
    Co(fun _ -> CoroutineResult.Do(f), None, None)
  member _.Await(p : Async<'a>) =
    Co(fun _ -> CoroutineResult.Await(p), None, None)
  member _.Awaiting(id:Guid, p : Async<'a>, t:Task<'a>) =
    Co(fun _ -> CoroutineResult.Awaiting(id,p,t), None, None)
  member _.Spawn(p:Coroutine<Unit,'s,'e>) =
    Co(fun _ -> CoroutineResult.Spawn(p), None, None)
  member _.Repeat(p:Coroutine<'a,'s,'e>) : Coroutine<Unit,'s,'e> =
    repeat p    
  member _.GetState() =
    Co(fun (s,es,dt) -> CoroutineResult.Return(s), None, None)
  member _.SetState(u:U<'s>) =
    Co(fun (s,es,dt) -> CoroutineResult.Return(), Some u, None)
  member co.ReturnFrom(p:Coroutine<'a,'s,'e>) = 
    co{
      let! res = p
      return res
    }
    
let co = CoroutineBuilder()

type WaitingCoroutine<'a, 's, 'e> = { P:Coroutine<'a, 's, 'e>; Until:DateTime }
type EvaluatedCoroutine<'a, 's, 'e> = 
  | Done of 'a * Option<U<'s>> * Option<U<Map<Guid, 'e>>>
  | Spawned of List<Coroutine<Unit, 's, 'e>> * Option<U<'s>> * Option<U<Map<Guid, 'e>>> * Option<Coroutine<'a, 's, 'e>>
  | Active of Coroutine<'a, 's, 'e> * Option<U<'s>> * Option<U<Map<Guid, 'e>>>
  | Listening of Coroutine<'a, 's, 'e> * Option<U<'s>> * Option<U<Map<Guid, 'e>>>
  | Waiting of WaitingCoroutine<'a, 's, 'e> * Option<U<'s>> * Option<U<Map<Guid, 'e>>>
  | WaitingOrListening of WaitingCoroutine<'a, 's, 'e> * Option<U<'s>> * Option<U<Map<Guid, 'e>>>
  with 
    member this.After(u_s, u_e) = 
      match this with
      | Done(x, u_s', u_e') -> Done(x, u_s >>? u_s', u_e >>? u_e')
      | Spawned(x, u_s', u_e', p) -> Spawned(x, u_s >>? u_s', u_e >>? u_e', p)
      | Active(x, u_s', u_e') -> Active(x, u_s >>? u_s', u_e >>? u_e')
      | Listening(x, u_s', u_e') -> Listening(x, u_s >>? u_s', u_e >>? u_e')
      | Waiting(x, u_s', u_e') -> Waiting(x, u_s >>? u_s', u_e >>? u_e')
      | WaitingOrListening(x, u_s', u_e') -> WaitingOrListening(x, u_s >>? u_s', u_e >>? u_e')

let mutable awaited:Map<Guid, obj> = Map.empty
type EvaluatedCoroutines<'s, 'e> = {
    active:Map<Guid, Coroutine<Unit, 's, 'e>>
    stopped:Set<Guid>
    waiting:Map<Guid, WaitingCoroutine<Unit, 's, 'e>>
    listening:Map<Guid, Coroutine<Unit, 's, 'e>>
    waitingOrListening:Map<Guid, WaitingCoroutine<Unit, 's, 'e>>
  }

type Eval<'s,'e>() = class end
  with 
    static member eval<'a> ((Co p):Coroutine<'a,'s,'e>) (ctx:'s * Map<Guid, 'e> * DeltaT) : EvaluatedCoroutine<'a,'s,'e> = 
      let (s,es,dt) = ctx
      let (step, u_s, u_e) = p ctx
      match step with
      | Then(p_p) ->
        match Eval.eval p_p ctx with
        | Done(p, u_s, u_e) -> 
          let res = Eval.eval p ctx
          res.After(u_s, u_e)
        | Spawned(p', u_s, u_e, rest:Option<Coroutine<Coroutine<'a, 's, 'e>, 's, 'e>>) -> 
          Spawned(p', u_s, u_e, rest |> Option.map (fun rest_p -> Co(fun _ -> CoroutineResult.Then(rest_p), None, None)))
        | Active(p_p', u_s, u_e) -> 
          Active(Co(fun _ -> CoroutineResult.Then(p_p'), None, None), u_s, u_e)
        | Listening(p_p', u_s, u_e) -> 
          Listening(Co(fun _ -> CoroutineResult.Then(p_p'), None, None), u_s, u_e)
        | Waiting(w, u_s, u_e) -> 
          Waiting({ P = Co(fun _ -> CoroutineResult.Then(w.P), None, None); Until = w.Until }, u_s, u_e)
        | WaitingOrListening(w, u_s, u_e) -> 
          Waiting({ P = Co(fun _ -> CoroutineResult.Then(w.P), None, None); Until = w.Until }, u_s, u_e)
      | Combine (p, k) -> 
        match Eval.eval p ctx with
        | Done(p', u_s, u_e) -> 
          let res = Eval.eval k ctx
          res.After(u_s, u_e)
        | Spawned(p', u_s, u_e, rest) -> 
          Spawned(p', u_s, u_e, rest |> Option.map (fun p -> bind(p, fun () -> k)) |> Option.orElse (Some k))
        | Active(p', u_s, u_e) -> 
          Active(co.Combine(p', k), u_s, u_e)
        | Listening(p', u_s, u_e) -> 
          Listening(co.Combine(p', k), u_s, u_e)
        | Waiting(w, u_s, u_e) -> 
          Waiting({ P = co.Combine(w.P, k); Until = w.Until }, u_s, u_e)
        | WaitingOrListening(w, u_s, u_e) -> 
          Waiting({ P = co.Combine(w.P, k); Until = w.Until }, u_s, u_e)
      | Return res -> Done(res, u_s, u_e)
      | Any(ps) ->
        let res = 
          ps |> List.fold
            (fun res p -> 
              match res with
              | Choice2Of2 _ -> res
              | Choice1Of2(ps', spawned', u_s, u_e) ->
                match Eval.eval p ctx with
                | Done(res, u_s', u_e') -> Choice2Of2(res, u_s >>? u_s', u_e >>? u_e')
                | Spawned(p', u_s', u_e', rest) -> Choice1Of2(ps' @ Option.toList rest, p' @ spawned', u_s >>? u_s', u_e >>? u_e')
                | Active(p',u_s',u_e')
                | Listening(p',u_s',u_e') ->
                  Choice1Of2(p'::ps', spawned', u_s >>? u_s', u_e >>? u_e')
                | Waiting({ P = p'; Until = until }, u_s', u_e')
                | WaitingOrListening({ P = p'; Until = until }, u_s', u_e') ->
                  Choice1Of2(Co(fun _ -> CoroutineResult.Wait(until-DateTime.Now, p'), None, None)::ps', spawned', u_s >>? u_s', u_e >>? u_e')
            ) (Choice1Of2([], [], None, None)) 
        match res with
        | Choice1Of2(ps', [], u_s, u_e) -> 
          Active(co.Any ps', u_s, u_e)
        | Choice1Of2(ps', spawned, u_s, u_e) -> 
          Spawned(spawned, u_s, u_e, Some(co.Any ps'))
        | Choice2Of2(res, u_s, u_e) -> 
          Done(res, u_s, u_e)
      | Wait(timeSpan, p':Coroutine<'a,'s,'e>) -> 
        if timeSpan.TotalSeconds <= 0 then
          Active(p', None, None)
        else
          Waiting({ P=p'; Until=DateTime.Now + timeSpan - dt }, None, None)
        // let timeSpan' = timeSpan - dt
        // if timeSpan'.TotalMilliseconds <= 0 then
        //   Active(p', None, None)
        // else
        //   Active(co{ 
        //     do! co.Wait timeSpan'
        //     return! p'
        //   }, None, None)
      | On(p_e) ->
        match es |> Seq.map (fun e -> p_e e.Value, e) |> Seq.tryFind (function Some _, e -> true | _ -> false) with
        | Some(Some res,e) -> Done(res, None, Some(Map.remove e.Key))
        | _ -> Active(co.On p_e, None, None)
      | Spawn(p) -> 
        Spawned([p], None, None, None)
      | Do(f) ->
        Done(f s, None, None)
      | Await(a:Async<'a>) ->
        let id = Guid.NewGuid()
        let task = a |> Async.StartAsTask
        Active(co.Awaiting(id, a, task), None, None)
      | Awaiting(id, a, task) ->
        do printfn "%A" task.Status
        if task.IsCompletedSuccessfully then
          Done(task.Result, None, None)
        else 
          Active(co.Awaiting(id, a, task), None, None)

let rec evalMany (ps:Map<Guid, Coroutine<Unit, 's, 'e>>) ((s, es, dt):'s * Map<Guid, 'e> * DeltaT) : EvaluatedCoroutines<'s, 'e> * Option<U<'s>> * Option<U<Map<Guid, 'e>>> =
    let ctx = (s,es,dt)
    let mutable u_s:Option<U<'s>> = None
    let mutable u_e:Option<U<Map<Guid, 'e>>> = None
    let mutable evaluated:EvaluatedCoroutines<'s, 'e> = {
      active=Map.empty;
      stopped=Set.empty;
      waiting=Map.empty;
      listening=Map.empty;
      waitingOrListening=Map.empty;
    }
    for p in ps do
      match Eval.eval p.Value ctx with
      | Done(_, u_s', u_e') -> 
        evaluated <- { evaluated with stopped = evaluated.stopped.Add p.Key }; u_s <- u_s >>? u_s'; u_e <- u_e >>? u_e'
      | Spawned (spawned, u_s', u_e', rest) ->
        match rest with 
        | Some p' ->
          evaluated <- { evaluated with active = evaluated.active.Add(p.Key, p') }; u_s <- u_s >>? u_s'; u_e <- u_e >>? u_e'
        | _ -> ()
        for p' in spawned do
          evaluated <- { evaluated with active = evaluated.active.Add(Guid.NewGuid(), p') }; u_s <- u_s >>? u_s'; u_e <- u_e >>? u_e'
      | Active (p', u_s', u_e') -> 
        evaluated <- { evaluated with active = evaluated.active.Add(p.Key, p') }; u_s <- u_s >>? u_s'; u_e <- u_e >>? u_e'
      | Listening (p', u_s', u_e') -> 
        evaluated <- { evaluated with listening = evaluated.listening.Add(p.Key, p') }; u_s <- u_s >>? u_s'; u_e <- u_e >>? u_e'
      | Waiting (p', u_s', u_e') -> 
        evaluated <- { evaluated with waiting = evaluated.waiting.Add(p.Key, p') }; u_s <- u_s >>? u_s'; u_e <- u_e >>? u_e'
      | WaitingOrListening (p', u_s', u_e') -> 
        evaluated <- { evaluated with waitingOrListening = evaluated.waitingOrListening.Add(p.Key, p') }; u_s <- u_s >>? u_s'; u_e <- u_e >>? u_e'
      
    evaluated, u_s, u_e

