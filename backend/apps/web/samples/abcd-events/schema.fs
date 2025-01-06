module abcdsample.schema
#nowarn 40

open System
open System.Linq
open positions.model
open Ballerina.Fun
open Ballerina.Coroutines
open Ballerina.Option
open Ballerina.BusinessRules
open Ballerina.BusinessRuleEvaluation
open Ballerina.BusinessRuleTypeChecking

let private updateSingleField<'a,'f when 'f : equality> (getE:Guid -> Option<'a>) (setE:'a -> Guid -> unit) 
  (getField:'a -> 'f) (setField:'a -> 'f -> 'a) (One entityId) (updater:Updater<'f>) =
  let e = getE entityId
  match e with 
  | Some e ->
    let f = getField e
    let f' = updater f
    let e' = setField e f'
    if f <> f' then
      setE e' entityId
      FieldUpdateResult.ValueChanged
    else
      FieldUpdateResult.ValueStayedTheSame
  | None -> 
    FieldUpdateResult.Failure

let createABCDSchema (allABs:ref<Map<Guid,AB>>) (allCDs:ref<Map<Guid,CD>>) =
  let rec descriptors = {|
    CD = {|
      Entity = {|
        Descriptor = { 
          EntityDescriptorId = Guid.NewGuid(); EntityName = "CD";
          GetId = 
            (function
            | :? CD as e ->  Some e.CDId
            | _ -> None);
          Lookup = (fun (obj, fields) -> 
            match obj with
            | :? CD as e -> 
              match fields with
              | [] -> Some obj
              | field::fields ->
                if field.FieldDescriptorId = descriptors.CD.C.FieldDescriptorId then
                  Some(e.C :> obj)
                else
                  None
            | _ -> None);
          GetEntities = fun () -> allCDs.contents |> Map.values |> Seq.map (fun e -> e :> obj) |> List.ofSeq
          GetFieldDescriptors = fun () -> [descriptors.CD.C]
        }
        UpdateSingleField =
          updateSingleField
            (fun entityId -> allCDs.contents |> Map.tryFind entityId)
            (fun e' entityId -> allCDs.contents <- allCDs.contents |> Map.add entityId e')
        TryFind = fun id -> allCDs.contents |> Map.tryFind id |> Option.map(fun e -> e :> obj);
      |}
      C = { 
        FieldDescriptorId=Guid.NewGuid(); 
        FieldName = "C"; 
        Type = fun () -> ExprType.PrimitiveType IntType
        Lookup = Option<AB>.fromObject >> Option.map(fun e -> e.C |> Value.ConstInt)
        Get = fun id -> descriptors.CD.Entity.TryFind id |> Option.bind descriptors.CD.C.Lookup;
        Update = {|
          AsInt = 
            fun (One entityId) updater -> 
              descriptors.CD.Entity.UpdateSingleField
                (fun e -> e.C) (fun e f -> { e with C = f })
                (One entityId) updater;
          AsRef = (fun _ _ -> FieldUpdateResult.Failure);
          AsRefs = (fun _ _ -> FieldUpdateResult.Failure);
        |}
      }
    |}
    AB = {|
      Entity = {|
        Descriptor = 
          { EntityDescriptorId = Guid.NewGuid(); EntityName = "AB"; 
            GetId = 
              (function
              | :? AB as e ->  Some e.ABId
              | _ -> None);
            Lookup = (fun (obj, fields) -> 
              match obj with
              | :? AB as e -> 
                match fields with
                | [] -> Some obj
                | field::fields ->
                  if field.FieldDescriptorId = descriptors.AB.A.FieldDescriptorId then
                    Some(e.A :> obj)
                  else if field.FieldDescriptorId = descriptors.AB.B.FieldDescriptorId then
                    Some(e.B :> obj)
                  else if field.FieldDescriptorId = descriptors.AB.CD.FieldDescriptorId then
                    descriptors.CD.Entity.Descriptor.Lookup(e.CD :> obj, fields)
                  else
                    None
              | _ -> None);
            GetEntities = fun () -> allABs.contents |> Map.values |> Seq.map (fun e -> e :> obj) |> List.ofSeq
            GetFieldDescriptors = fun () -> [descriptors.AB.A; descriptors.AB.B; descriptors.AB.CD; descriptors.AB.TotalABC]
          }      
        UpdateSingleField = 
          updateSingleField
            (fun entityId -> allABs.contents |> Map.tryFind entityId) 
            (fun e' entityId -> allABs .contents <- allABs.contents |> Map.add entityId e')      
        TryFind = fun id -> allABs.contents |> Map.tryFind id |> Option.map(fun e -> e :> obj);
      |}
      A = { 
        FieldDescriptorId=Guid.NewGuid(); 
        FieldName = "A"; 
        Type = fun () -> ExprType.PrimitiveType IntType
        Lookup = Option<AB>.fromObject >> Option.map(fun e -> e.A |> Value.ConstInt);
        Get = fun id -> descriptors.AB.Entity.TryFind id |> Option.bind descriptors.AB.A.Lookup;
        Update = {|
          AsInt = 
            fun (One entityId) updater -> 
                descriptors.AB.Entity.UpdateSingleField
                  (fun e -> e.A) (fun e f -> { e with A = f })
                  (One entityId) updater;
          AsRef = (fun _ _ -> FieldUpdateResult.Failure);
          AsRefs = (fun _ _ -> FieldUpdateResult.Failure);
        |};
      }
      B = { 
        FieldDescriptorId=Guid.NewGuid(); 
        FieldName = "B"; 
        Type = fun () -> ExprType.PrimitiveType IntType
        Lookup = Option<AB>.fromObject >> Option.map(fun e -> e.B |> Value.ConstInt) 
        Get = fun id -> descriptors.AB.Entity.TryFind id |> Option.bind descriptors.AB.B.Lookup;
        Update = {|
          AsInt = 
            fun (One entityId) updater -> 
              descriptors.AB.Entity.UpdateSingleField
                (fun e -> e.B) (fun e f -> { e with B = f })
                (One entityId) updater;
          AsRef = (fun _ _ -> FieldUpdateResult.Failure);
          AsRefs = (fun _ _ -> FieldUpdateResult.Failure);
        |};    
      }
      TotalABC = { 
        FieldDescriptorId=Guid.NewGuid(); 
        FieldName = "TotalABC"; 
        Type = fun () -> ExprType.PrimitiveType IntType
        Lookup = Option<AB>.fromObject >> Option.map(fun e -> e.TotalABC |> Value.ConstInt) 
        Get = fun id -> descriptors.AB.Entity.TryFind id |> Option.bind descriptors.AB.TotalABC.Lookup;
        Update = {|
          AsInt = 
            fun (One entityId) updater -> 
              descriptors.AB.Entity.UpdateSingleField
                (fun e -> e.TotalABC) (fun e f -> { e with TotalABC = f })
                (One entityId) updater;
          AsRef = (fun _ _ -> FieldUpdateResult.Failure);
          AsRefs = (fun _ _ -> FieldUpdateResult.Failure);
        |}
      }
      CD = { 
        FieldDescriptorId=Guid.NewGuid(); 
        FieldName = "CD"; 
        Type = fun () -> ExprType.LookupType descriptors.CD.Entity.Descriptor.ToEntityDescriptorId
        Lookup = Option<AB>.fromObject >> Option.map(fun e -> e.CD.CDId |> Value.ConstGuid)
        Get = fun id -> descriptors.AB.Entity.TryFind id |> Option.bind descriptors.AB.CD.Lookup;
        Update = {|
          AsInt = (fun _ _ -> FieldUpdateResult.Failure);
          AsRef = (fun _ _ -> FieldUpdateResult.Failure);
          AsRefs = 
            fun entitiesIdentifier updater -> 
              match entitiesIdentifier with 
              | All -> 
                let mutable changes = 0
                allABs .contents <- allABs.contents |> Map.map (fun key -> (fun e -> 
                  let e' = { e with CD = allCDs.contents.[updater(e.CD.CDId)]}
                  if e.CD.CDId <> e'.CD.CDId then changes <- changes + 1
                  e')) 
                if changes > 0 then FieldUpdateResult.ValueChanged
                else FieldUpdateResult.ValueStayedTheSame
              | Multiple abIds ->  
                let mutable changes = 0
                allABs .contents <- allABs.contents |> Map.map (fun key -> 
                  if abIds |> Set.contains key then 
                    (fun e -> 
                      let e' = { e with CD = allCDs.contents.[updater(e.CD.CDId)]}
                      if e.CD.CDId <> e'.CD.CDId then changes <- changes + 1
                      e'
                    ) 
                  else id)
                if changes > 0 then FieldUpdateResult.ValueChanged
                else FieldUpdateResult.ValueStayedTheSame
        |}
      }
    |}
  |}
  let rec allEntities = 
    [
      descriptors.AB.Entity.Descriptor; descriptors.CD.Entity.Descriptor
    ] |> Seq.map (fun e -> e.EntityDescriptorId, e) |> Map.ofSeq
  and allFields = 
    [
      for e in allEntities |> Map.values do
      yield! e.GetFieldDescriptors(); 
    ] |> Seq.map (fun f -> f.FieldDescriptorId, f) |> Map.ofSeq
  descriptors, allEntities, allFields
