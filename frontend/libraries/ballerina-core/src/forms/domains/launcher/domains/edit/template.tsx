import { AsyncState, editFormRunner, replaceWith, SimpleCallback, unit } from "../../../../../../main";
import { Template } from "../../../../../template/state";
import { EditFormContext, EditFormForeignMutationsExpected, EditFormState, EditFormWritableState } from "./state";

export type EditFormView<E, FS> =
  Template<
  EditFormContext<E, FS> & EditFormWritableState<E, FS>,
  EditFormWritableState<E, FS>,
  EditFormForeignMutationsExpected<E, FS> & { onSubmit: SimpleCallback<void> },
    {
      actualForm: JSX.Element | undefined
    }>
export type EditFormTemplate<E, FS> =
  Template<
    EditFormContext<E, FS> & EditFormWritableState<E, FS>,
    EditFormWritableState<E, FS>,
    EditFormForeignMutationsExpected<E, FS>,
    EditFormView<E, FS>>
export const EditFormTemplate = <E, FS>() : EditFormTemplate<E,FS> =>
  Template.Default<
    EditFormContext<E, FS> & EditFormWritableState<E, FS>,
    EditFormWritableState<E, FS>,
    EditFormForeignMutationsExpected<E, FS>,
    EditFormView<E, FS>
    >(props =>
      <>
      {
        props.view({
          ...props,
          foreignMutations: {
            ...props.foreignMutations,
            onSubmit: () => {
              props.setState(EditFormState<E, FS>().Updaters.Template.submit())
            }
          },
          view: {
            ...props.view,
            actualForm:
          !AsyncState.Operations.hasValue(props.context.entity.sync) ? undefined :
            props.context.actualForm({
              context: {
                value: props.context.entity.sync.value,
                ...props.context.formState,
              },
              setState: _ => {
                props.setState(
                  EditFormState<E, FS>().Updaters.Core.formState(_)
                )
              },
              foreignMutations: {
                onChange: (e) => {
                  props.setState(EditFormState<E, FS>().Updaters.Template.entity(e))
                },
              },
              view: unit
            })
          }
        })
      }
      </>
    ).any([
      editFormRunner<E, FS>().mapContextFromProps(props => ({
        ...props.context,
        apiHandlers: {
          success: props.foreignMutations.apiHandlers?.success,
          error: props.foreignMutations.apiHandlers?.error
        }
      }))
    ])
