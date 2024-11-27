namespace grandeomega2

#nowarn "20"

open Blogs
open System
open System.Collections.Generic
open System.IO
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.HttpsPolicy
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.Options
open Ballerina.Coroutines
open Ballerina.CRUD
open Migrations
open Microsoft.EntityFrameworkCore
open Oxpecker
open Oxpecker.OpenApi
open Newtonsoft.Json
open MBrace.FsPickler
open MBrace.FsPickler.Json
open Microsoft.AspNetCore.Mvc
open Microsoft.AspNetCore.Http.Json
open System.Text.Json
open System.Text.Json.Serialization
open Ballerina.Queries
open absample.models
// open FSharp.SystemTextJson.Swagger
open Microsoft.OpenApi.Models

module Program =
  type PositionOptions() = 
    member val Title:string = "" with get, set
    member val Name:string = "" with get, set
    static member Position = "Position"
    override p.ToString() = $"title={p.Title} name={p.Name}"

  let Counter = {| 
    updaters={| 
      counter=fun u (s:{| counter:int |}) -> 
        {| s with counter = u(s.counter) |} 
      |} 
    |}
  let mutable state = {| counter=0 |}
  let p:Coroutine<Unit, {| counter:int |}, Unit> = 
    co{
      wait (TimeSpan.FromSeconds 1.0)
      do! co.SetState (Counter.updaters.counter(fun x -> x + 1))
      wait (TimeSpan.FromSeconds 2.0)
      do! co.SetState (Counter.updaters.counter(fun x -> x + 2))
    } |> co.Repeat
  let initialEvals : EvaluatedCoroutines<_,_> = { 
    active = Map.empty |> Map.add (Guid.NewGuid()) p;
    waiting = Map.empty;
    waitingOrListening = Map.empty;
    listening = Map.empty;
    stopped = Set.empty;
  }

  let jsonSerializer = FsPickler.CreateJsonSerializer(indent = false)
  let text = jsonSerializer.PickleToString initialEvals
  File.WriteAllText("evals.json", text)

  Console.Clear()
  let mutable lastT = DateTime.Now
  let start = DateTime.Now
  while false do
    let now = DateTime.Now
    let dT = now - lastT
    lastT <- now
    let evals = jsonSerializer.UnPickleOfString<EvaluatedCoroutines<{| counter:int |},Unit>>(File.ReadAllText("evals.json"))
    let resumedWaiting, stillWaiting = evals.waiting |> Map.partition (fun _ v -> v.Until <= now) 
    let active = (evals.active |> Map.values |> Seq.toList) @ (resumedWaiting |> Seq.map (fun w -> w.Value.P) |> Seq.toList) |> Seq.map (fun p -> Guid.NewGuid(), p) |> Map.ofSeq
    let (evals', u_s, u_e) = evalMany (active) (state, Set.empty, dT)
    match u_s with
    | Some u_s -> 
      state <- u_s state
    | None -> ()
    let newWaiting = evals'.waiting |> Seq.map (fun w -> w.Value) |> Seq.map (fun v -> Guid.NewGuid(), v) |> Seq.toList
    let newWaiting = newWaiting @ (stillWaiting |> Seq.map (fun w -> w.Value) |> Seq.map (fun v -> Guid.NewGuid(), v) |> Seq.toList)
    let evals' = { evals' with waiting = newWaiting |> Map.ofSeq }
    let text = jsonSerializer.PickleToString evals'
    File.WriteAllText("evals.json", text)
    printf "\r%A(%.1f)                                               " state ((now - start)).TotalSeconds

  let exitCode = 0

  // let AB(db:BloggingContext) : Crud<absample.models.AB> = {
  //   create = fun e -> 
  //     let id = Guid.NewGuid()
  //     do db.ABs.Add({ e with ABId=id })
  //     async{ 
  //       let! _ = db.SaveChangesAsync() |> Async.AwaitTask
  //       return id 
  //     }
  //   delete = fun id -> 
  //     async{
  //       let! _ = db.ABs.Where(fun e -> e.ABId = id).ExecuteDeleteAsync() |> Async.AwaitTask
  //       return ()
  //     }
  //   update = fun id u -> 
  //     async{
  //       let! es = db.ABs.Where(fun e -> e.ABId = id).ToListAsync() |> Async.AwaitTask
  //       let es = es.Select(u)
  //       db.ABs.UpdateRange(es)
  //       let! _ = db.SaveChangesAsync() |> Async.AwaitTask
  //       return ()
  //     }      
  //   get = fun id -> 
  //     async{
  //       let! es = db.ABs.Where(fun e -> e.ABId = id).ToListAsync() |> Async.AwaitTask
  //       return es |> Seq.tryHead
  //     }
  //   getN = fun id predicate -> 
  //     async {
  //       return db.ABs.Where(ToLinq predicate) // .OrderBy()
  //     }
  // }

  // let ABEvent(db:BloggingContext) : Crud<absample.models.ABEvent> = {
  //   create = fun _ -> failwith ""
  //   delete = fun _ -> failwith ""
  //   update = fun _ -> failwith ""
  //   get = fun _ -> failwith ""
  //   getN = fun _ -> failwith ""
  // }

  [<EntryPoint>]
  let main args =
    let builder = WebApplication.CreateBuilder(args)
    builder.Services.Configure<PositionOptions>(builder.Configuration.GetSection(PositionOptions.Position))
    builder.Services.Configure<JsonOptions>(fun (options:JsonOptions) -> 
      // JsonFSharpOptions.Default().AddToJsonSerializerOptions(options.SerializerOptions) |> ignore
      options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
    )
    // builder.Services.AddSwaggerForSystemTextJson(JsonFSharpOptions())

    builder.Services.AddDbContext<BloggingContext>(fun opt -> 
      opt.UseNpgsql(
        builder.Configuration.GetConnectionString("DbConnection")
        // "User ID=postgres;Password=;Host=localhost;Port=5432;Database=blog;Pooling=true;Maximum Pool Size=50;"
        ) |> ignore)
    builder.Services
        .AddRouting()
        // .AddOxpecker()
        .AddEndpointsApiExplorer() // use the API Explorer to discover and describe endpoints
        .AddSwaggerGen(fun options ->
            options.UseOneOfForPolymorphism()
            options.SelectDiscriminatorNameUsing(fun _ -> "$type")
          )

    let app = builder.Build()
    // app.UseHttpsRedirection()

    // app.MapGet("/FirstBlog", new Func<_,_>(fun (db:BloggingContext) -> db.Blogs.FirstOrDefault()))
    // app.MapGet("/positionOptions", new Func<_,_>(fun (position:IOptions<PositionOptions>) -> position))
    app.MapGet("/AEvent", new Func<_, _>(fun (db:BloggingContext) -> 
      ABEvent.AEvent(
        { 
          ABEventId=Guid.NewGuid(); 
          ABId=Guid.NewGuid(); 
          AB={ ABId=Guid.Empty; ACount=0; BCount=0; AFailCount=0; BFailCount=0; };
          // A1EventId=Guid.NewGuid();
          // A1Event=A1Event.A1EventX({ A1EventXId=Guid.Empty; Value="Value"; }) 
          })
          |> absample.efmodels.ABEvent.FromUnion
        ))
      .WithOpenApi() 
    app.MapGet("/BEvent", new Func<_, _>(fun (db:BloggingContext) -> 
      ABEvent.BEvent(
        { ABEventId=Guid.NewGuid(); ABId=Guid.NewGuid(); 
          AB={ ABId=Guid.Empty; ACount=0; BCount=0; AFailCount=0; BFailCount=0 } 
        }) |> absample.efmodels.ABEvent.FromUnion))
      .WithOpenApi()
    app.MapPost("/ABEvent", new Func<_,_,_>(fun (db:BloggingContext) ([<FromBody>] msg: absample.efmodels.ABEvent) -> 
      msg))
      .WithOpenApi()

      // app.MapGet("/BEvent", new Func<_>(fun () -> ABEvent.B({| ABEventId=Guid.NewGuid(); BValue=222 |})))
    // app.MapPost("/add", new Func<_,_>(fun ([<FromBody>] msg: {| value: int |}) -> {| value = msg.value + 1 |}))

    // let endpoints = [
    //     // POST [
    //     //     route "/AEvent" (ABEvent.AEvent({ ABEventId=Guid.NewGuid(); ABId=Guid.NewGuid(); AB={ ABId=Guid.Empty; ACount=0; BCount=0; AFailCount=0; BFailCount=0 } }) |> json)
    //     //         |> addOpenApi (OpenApiConfig(
    //     //             requestBody = RequestBody(typeof<Product>),
    //     //             responseBodies = [| ResponseBody(typeof<string>) |],
    //     //             configureOperation = (fun o -> o.OperationId <- "PostProduct"; o)
    //     //         ))
    //     // ]

    //     GET [
    //         route "/AEvent" (ABEvent.AEvent({ ABEventId=Guid.NewGuid(); ABId=Guid.NewGuid(); AB={ ABId=Guid.Empty; ACount=0; BCount=0; AFailCount=0; BFailCount=0 } }) |> json)
    //             |> addOpenApiSimple<Unit, ABEvent>
    //     ]

    //     // // addOpenApiSimple is a shortcut for simple cases
    //     // GET [
    //     //     routef "/product/{%i}" (
    //     //         fun id ->
    //     //             products
    //     //             |> Array.find (fun f -> f.Id = num)
    //     //             |> json
    //     //     )
    //     //         |> configureEndpoint _.WithName("GetProduct")
    //     //         |> addOpenApiSimple<int, Product>
    //     // ]
    //     // // such route won't work with OpenAPI, since HTTP method is not specified
    //     // route "/hello" <| text "Hello, world!"
    // ]

    app .UseRouting()
        // .UseOxpecker(endpoints)
        .UseSwagger() // for json OpenAPI endpoint
        .UseSwaggerUI() // for

    app.Run("http://localhost:5000")

    exitCode
