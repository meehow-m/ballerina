module abcdsample.typeCheck

open System
open System.Linq
open positions.model
open Ballerina.Fun
open Ballerina.Option

let typeCheck (context:Context) (vars:VarTypes) : Expr -> Option<ExprType * VarTypes> =
  let rec eval (vars:VarTypes) (e:positions.model.Expr) : Option<ExprType * VarTypes> =
    match e with
    | positions.model.Expr.Exists(varName, entityDescriptor, condition) -> 
      if entityDescriptor.EntityDescriptorId = context.Schema.AB.Entity.EntityDescriptorId then
        option{
          let vars' = vars |> Map.add varName (ExprType.LookupType { EntityDescriptorId=context.Schema.AB.Entity.EntityDescriptorId; EntityName="AB" })
          return! eval vars' condition
        }
      else if entityDescriptor.EntityDescriptorId = context.Schema.CD.Entity.EntityDescriptorId then
        option{
          let vars' = vars |> Map.add varName (ExprType.LookupType { EntityDescriptorId=context.Schema.CD.Entity.EntityDescriptorId; EntityName="CD" })
          return! eval vars' condition
        }
      else
        failwith "only entities AB and CD supported for now"
    | positions.model.Expr.VarLookup v -> 
      option{
        let! varType = vars |> Map.tryFind v
        return (varType, vars)
      }
    | positions.model.Expr.FieldLookup(var, []) -> eval vars var
    | positions.model.Expr.FieldLookup(var, [field]) -> 
      option{
        let! varType,vars' = eval vars var
        match varType with
        | LookupType entityDescriptor -> 
          if entityDescriptor.EntityDescriptorId = context.Schema.AB.Entity.EntityDescriptorId then
            if field.FieldDescriptorId = context.Schema.AB.ACount.Self.FieldDescriptorId then
              return PrimitiveType IntType, vars'
            else if field.FieldDescriptorId = context.Schema.AB.BCount.Self.FieldDescriptorId then
              return PrimitiveType IntType, vars'
            else if field.FieldDescriptorId = context.Schema.AB.CD.Self.FieldDescriptorId then
              return LookupType { EntityDescriptorId=context.Schema.CD.Entity.EntityDescriptorId; EntityName="CD" }, vars'
          else if entityDescriptor.EntityDescriptorId = context.Schema.CD.Entity.EntityDescriptorId then
            if field.FieldDescriptorId = context.Schema.CD.CCount.Self.FieldDescriptorId then
              return PrimitiveType IntType, vars'
          else
            failwith "only entities AB and CD supported for now"
        | PrimitiveType _ -> ()
      }
    | positions.model.Expr.FieldLookup(var, field::fields) -> 
      eval vars (FieldLookup(FieldLookup(var, [field]), fields))
    | positions.model.Expr.Value v ->
      option{ 
        match v with
        | Value.ConstInt _ -> 
          return PrimitiveType PrimitiveType.IntType, vars
        | Value.ConstBool _ -> 
          return PrimitiveType PrimitiveType.BoolType, vars
        | _ -> ()
      }
    | positions.model.Expr.Binary(Plus, e1, e2) -> 
      option{
        let! t1,vars' = eval vars e1
        let! t2,vars'' = eval vars' e2
        match t1,t2 with
        | PrimitiveType IntType, PrimitiveType IntType -> return PrimitiveType IntType,vars''
        | _ -> ()
      }
    | e -> 
      printfn "not implemented Expr type checker for %A" e
      option{        
      }
  eval vars
