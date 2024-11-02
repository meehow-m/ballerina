import { AsyncState, FormsConfig, Sum, Synchronize, Unit } from "../../../../../main"
import { CoTypedFactory } from "../../../../coroutines/builder"
import { builtInsFromFieldViews, FormParsingResult, FormsParserContext, FormsParserState, parseForms } from "../state"

export const LoadValidateAndParseFormsConfig = () => {
  const Co = CoTypedFactory<FormsParserContext, FormsParserState>()

 return Co.Template<Unit>(
  Co.GetState().then(current => 
  Synchronize<Unit, FormParsingResult>(async() => {
    const formsConfig = await current.getFormsConfig()
    const builtIns = builtInsFromFieldViews(current.fieldViews)
    const validationResult = FormsConfig.Default.validateAndParseAPIResponse(builtIns)(formsConfig)
    if (validationResult.kind == "r")
      return Sum.Default.right(validationResult.value)
    return parseForms(
      current.containerFormView,
      current.fieldViews,
      current.infiniteStreamSources,
      current.enumOptionsSources,
      current.entityApis,
      current.leafPredicates)(validationResult.value)
  }, _ => "transient failure", 5, 50)
    .embed(
      _ => _.formsConfig,
      FormsParserState.Updaters.formsConfig
    )
  ),
  {
    interval:15,
    runFilter:props => !AsyncState.Operations.hasValue(props.context.formsConfig.sync)
  }
 )
}