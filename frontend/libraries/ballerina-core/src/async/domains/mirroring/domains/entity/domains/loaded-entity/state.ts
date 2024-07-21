import { AsyncState } from "../../../../../../state";
import { Entity } from "../../state";

export type LoadedEntity<E> = {
  value?: E;
  isSubmitting:boolean;
  isReloading:boolean;
  synchronizationErrors:Array<any>
};
export const LoadedEntity = {
  Default:{
    fromEntity:<E>(e:Entity<E>) : LoadedEntity<E> =>
      ({
        value:AsyncState.Operations.hasValue(e.value.value.sync) ? e.value.value.sync.value : undefined,
        isSubmitting:AsyncState.Operations.isLoading(e.value.sync),
        isReloading:AsyncState.Operations.isLoading(e.value.value.sync),
        synchronizationErrors:[...AsyncState.Operations.errors(e.value.sync),...AsyncState.Operations.errors(e.value.value.sync)],
      })
  }
}
