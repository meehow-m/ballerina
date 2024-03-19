import {
  BasicFun,
  Fun,
  Updater,
} from "../../../../Shared/widgets-library/widgets-main";

export type AsyncState<a> = (
  | ((
      | { kind: "unloaded" }
      | { kind: "loading" }
      | { kind: "extra-loading"; value: a }
      | { kind: "error"; value: any }
    ) & { failedLoadingAttempts: number })
  | { kind: "loaded"; value: a }
) & {
  map: <b>(f: BasicFun<a, b>) => AsyncState<b>;
  getLoadingAttempts: <a>(this: AsyncState<a>) => number;
};

function map<a, b>(this: AsyncState<a>, f: BasicFun<a, b>): AsyncState<b> {
  return this.kind == "loaded"
    ? AsyncState.Default.loaded(f(this.value))
    : this.kind == "unloaded"
      ? AsyncState.Default.unloaded()
      : this.kind == "error"
        ? AsyncState.Default.error()
        : this.kind == "loading"
          ? AsyncState.Default.loading()
          : AsyncState.Default.extraLoading(f(this.value));
}

function getLoadingAttempts<a>(this: AsyncState<a>): number {
  return this.kind == "loaded" ? 0 : this.failedLoadingAttempts;
}

export const AsyncState = {
  Default: {
    unloaded: <a>(): AsyncState<a> => ({
      kind: "unloaded",
      map,
      getLoadingAttempts,
      failedLoadingAttempts: 0,
    }),
    loading: <a>(): AsyncState<a> => ({
      kind: "loading",
      map,
      getLoadingAttempts,
      failedLoadingAttempts: 0,
    }),
    extraLoading: <a>(value: a): AsyncState<a> => ({
      kind: "extra-loading",
      value,
      map,
      getLoadingAttempts,
      failedLoadingAttempts: 0,
    }),
    error: <a>(value?: any): AsyncState<a> => ({
      kind: "error",
      map,
      value,
      getLoadingAttempts,
      failedLoadingAttempts: 0,
    }),
    loaded: <a>(value: a): AsyncState<a> => ({
      kind: "loaded",
      value,
      map,
      getLoadingAttempts,
    }),
  },
  Updaters: {
    failedLoadingAttempts: <a>(_: Updater<number>): Updater<AsyncState<a>> =>
      Updater((current) =>
        current.kind == "loaded"
          ? current
          : {
              ...current,
              failedLoadingAttempts: _(current.failedLoadingAttempts),
            }
      ),
    toUnloaded: <a>(): Updater<AsyncState<a>> =>
      Updater((_) => ({
        kind: "unloaded",
        map,
        getLoadingAttempts,
        failedLoadingAttempts: 0,
      })),
    toLoading: <a>(): Updater<AsyncState<a>> =>
      Updater((current) => ({
        kind: "loading",
        map,
        getLoadingAttempts,
        failedLoadingAttempts: current.getLoadingAttempts(),
      })),
    toExtraLoading: <a>(value: a): Updater<AsyncState<a>> =>
      Updater((current) => ({
        kind: "extra-loading",
        value,
        map,
        getLoadingAttempts,
        failedLoadingAttempts: current.getLoadingAttempts(),
      })),
    toError: <a>(value?: any): Updater<AsyncState<a>> =>
      Updater((current) => ({
        kind: "error",
        map,
        value,
        getLoadingAttempts,
        failedLoadingAttempts: current.getLoadingAttempts() + 1,
      })),
    toLoaded: <a>(value: a): Updater<AsyncState<a>> =>
      Updater((_) => ({ kind: "loaded", value, map, getLoadingAttempts })),
  },
  Operations: {
    map: <a, b>(f: BasicFun<a, b>): Fun<AsyncState<a>, AsyncState<b>> =>
      Fun((_) => _.map(f)),
  },
};
