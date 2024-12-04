import { BasicUpdater, Updater } from "../../main";

export type ApiResponseHandler<response, errors> = {
  handleSuccess?: (_?: response) => void;
  handleError?: (_?: errors) => void;
};

export type ApiResponseChecker = { apiResponseChecked: boolean };

export const ApiResponseChecker = {
  Default: (_?: boolean): ApiResponseChecker => ({
    apiResponseChecked: _ ?? false,
  }),
  Updaters: {
    toChecked:
      <CheckedState extends ApiResponseChecker>(): BasicUpdater<CheckedState> =>
      (_) => ({
        ..._,
        apiResponseChecked: true,
      }),
    toUnchecked:
      <CheckedState extends ApiResponseChecker>(): BasicUpdater<CheckedState> =>
      (_) => ({
        ..._,
        apiResponseChecked: false,
      }),
  },
  Operations: {
    checked: (_: ApiResponseChecker) => _.apiResponseChecked,
  },
};
