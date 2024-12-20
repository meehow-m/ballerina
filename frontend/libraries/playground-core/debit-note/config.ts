export const DebitNoteHeaderConfig = {
  types: {
    DocumentNumberDefaultingsFromKeyValueRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    DocumentDateDefaultingsFromKeyValueRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    ConfigurableNumberDefaultingsFromKeyValueRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    ConfigurableNumber2DefaultingsFromKeyValueRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    InformationKeysRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    InformationCardFieldsRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    InformationCardFieldsDisabledRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    InformationKeysDisabledRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    RequiredKeyValueFieldsRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    HighConfidenceKeyValueFieldsRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    ContextRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    FilterGroupOpRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    FiltersOpRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    AccountingPositionFieldsRef: {
      extends: ["CollectionReference"],
      fields: {},
    },
    DebitNoteResultFieldsRef: {
      extends: ["CollectionReference"],
      fields: {},
    },

    FieldContext: {
      fields: {
        accountingPositionFields: {
          fun: "Multiselection",
          args: ["AccountingPositionFieldsRef"],
        },
      },
    },
    Filters: {
      fields: {
        name: "string",
        filterOp: {
          fun: "SingleSelection",
          args: ["FiltersOpRef"],
        },
      },
    },
    FilterGroup: {
      fields: {
        filterGroupOp: {
          fun: "SingleSelection",
          args: ["FilterGroupOpRef"],
        },
        filters: { fun: "List", args: ["Filters"] },
      },
    },
    DocumentDateCommitChecks: {
      fields: {
        documentDateIsSet: "boolean",
        documentDateIsHighConfidence: "boolean",
      },
    },
    DocumentNumberCommitChecks: {
      fields: {
        documentNumberIsSet: "boolean",
        documentNumberIsHighConfidence: "boolean",
        maxDocumentNumberLength: "number",
        configurableNumberIsSet: "boolean",
        configurableNumberIsHighConfidence: "boolean",
        configurableNumber2IsSet: "boolean",
        configurableNumber2IsHighConfidence: "boolean",
      },
    },
    SynchronizedDataFilterGroupCommitChecks: {
      fields: {
        synchronizedDataFilterGroupCommitChecks: {
          fun: "List",
          args: ["string"],
        },
      },
    },
    DataFilterGroupCommitChecks: {
      fields: {
        name: "string",
        nameTranslations: "string",
        description: "string",
        descriptionTranslations: "string",
        context: { fun: "SingleSelection", args: ["ContextRef"] },
        filterGroup: "FilterGroup",
        fieldContext: "FieldContext",
      },
    },
    KeyValueCommitChecks: {
      fields: {
        requiredKeyValueFields: {
          fun: "Multiselection",
          args: ["RequiredKeyValueFieldsRef"],
        },
        highConfidenceKeyValueFields: {
          fun: "Multiselection",
          args: ["HighConfidenceKeyValueFieldsRef"],
        },
      },
    },
    UnequalTableToDocumentRowsCheck: {
      fields: {
        unequalTableToDocumentRowsCheck: "boolean",
      },
    },
    KeyValueFields: {
      fields: {
        informationKeys: {
          fun: "Multiselection",
          args: ["InformationKeysRef"],
        },
        informationKeysDisabled: {
          fun: "Multiselection",
          args: ["InformationKeysDisabledRef"],
        },
        informationFreeKeys: {
          fun: "List",
          args: ["string"],
        },
      },
    },
    InformationCardFields: {
      fields: {
        informationCardFields: {
          fun: "Multiselection",
          args: ["InformationCardFieldsRef"],
        },
      },
    },
    InformationCardFieldsDisabled: {
      fields: {
        informationCardFieldsDisabled: {
          fun: "Multiselection",
          args: ["InformationCardFieldsDisabledRef"],
        },
      },
    },
    HeaderFieldsDefaults: {
      fields: {
        documentNumberDefaultingsFromKeyValue: {
          fun: "Multiselection",
          args: ["DocumentNumberDefaultingsFromKeyValueRef"],
        },
        documentDateDefaultingsFromKeyValue: {
          fun: "Multiselection",
          args: ["DocumentDateDefaultingsFromKeyValueRef"],
        },
        configurableNumberDefaultingsFromKeyValue: {
          fun: "Multiselection",
          args: ["ConfigurableNumberDefaultingsFromKeyValueRef"],
        },
        configurableNumber2DefaultingsFromKeyValue: {
          fun: "Multiselection",
          args: ["ConfigurableNumber2DefaultingsFromKeyValueRef"],
        },
      },
    },
    Automation: {
      fields: {
        headerFieldsDefaults: "HeaderFieldsDefaults",
      },
    },
    Dashboard: {
      fields: {
        keyValueFields: "KeyValueFields",
        informationCardFields: "InformationCardFields",
        informationCardFieldsDisabled: "InformationCardFieldsDisabled",
      },
    },
    SystemConfig: {
      fields: {
        debitNoteResultFields: {
          fun: "Multiselection",
          args: ["DebitNoteResultFieldsRef"],
        },
        automation: "Automation",
      },
    },
    CommitChecks: {
      fields: {
        keyValueCommitChecks: "KeyValueCommitChecks",
        dataFilterGroupCommitChecks: "DataFilterGroupCommitChecks",
        synchronizedDataFilterGroupCommitChecks:
          "SynchronizedDataFilterGroupCommitChecks",
        documentNumberCommitChecks: "DocumentNumberCommitChecks",
        documentDateCommitChecks: "DocumentDateCommitChecks",
        unequalTableToDocumentRowsCheck: "UnequalTableToDocumentRowsCheck",
      },
    },
    DebitNoteHeaderConfig: {
      fields: {
        commitChecks: "CommitChecks",
        dashboard: "Dashboard",
        systemConfig: "SystemConfig",
      },
    },
  },

  apis: {
    enumOptions: {
      requiredKeyValueFieldsEnum: "RequiredKeyValueFieldsRef",
      highConfidenceKeyValueFieldsEnum: "HighConfidenceKeyValueFieldsRef",
      contextEnum: "ContextRef",
      filterGroupOpEnum: "FilterGroupOpRef",
      filtersOpEnum: "FiltersOpRef",
      accountingPositionFieldsEnum: "AccountingPositionFieldsRef",
      informationKeysEnum: "InformationKeysRef",
      informationKeysDisabledEnum: "InformationKeysDisabledRef",
      informationCardFieldsEnum: "InformationCardFieldsRef",
      informationCardFieldsDisabledEnum: "InformationCardFieldsDisabledRef",
      debitNoteResultFieldsEnum: "DebitNoteResultFieldsRef",
      documentNumberDefaultingsFromKeyValueEnum:
        "DocumentNumberDefaultingsFromKeyValueRef",
      documentDateDefaultingsFromKeyValueEnum:
        "DocumentDateDefaultingsFromKeyValueRef",
      configurableNumberDefaultingsFromKeyValueEnum:
        "ConfigurableNumberDefaultingsFromKeyValueRef",
      configurableNumber2DefaultingsFromKeyValueEnum:
        "ConfigurableNumber2DefaultingsFromKeyValueRef",
    },
    searchableStreams: {},
    entities: {
      debitNoteHeaderConfigApi: {
        type: "DebitNoteHeaderConfig",
        methods: ["get", "update"],
      },
    },
  },

  mappings: {},

  forms: {
    headerFieldsDefaultsForm: {
      type: "HeaderFieldsDefaults",
      fields: {
        documentNumberDefaultingsFromKeyValue: {
          renderer: "defaultEnumMultiselect",
          options: "documentNumberDefaultingsFromKeyValueEnum",
          visible: { kind: "true" },
        },
        documentDateDefaultingsFromKeyValue: {
          renderer: "defaultEnumMultiselect",
          options: "documentDateDefaultingsFromKeyValueEnum",
          visible: { kind: "true" },
        },
        configurableNumberDefaultingsFromKeyValue: {
          renderer: "defaultEnumMultiselect",
          options: "configurableNumberDefaultingsFromKeyValueEnum",
          visible: { kind: "true" },
        },
        configurableNumber2DefaultingsFromKeyValue: {
          renderer: "defaultEnumMultiselect",
          options: "configurableNumber2DefaultingsFromKeyValueEnum",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            HeaderFieldsDefaults: {
              groups: {
                main: [
                  "documentNumberDefaultingsFromKeyValue",
                  "documentDateDefaultingsFromKeyValue",
                  "configurableNumberDefaultingsFromKeyValue",
                  "configurableNumber2DefaultingsFromKeyValue",
                ],
              },
            },
          },
        },
      },
    },
    automationForm: {
      type: "Automation",
      fields: {
        headerFieldsDefaults: {
          renderer: "headerFieldsDefaultsForm",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            Automation: {
              groups: {
                main: ["headerFieldsDefaults"],
              },
            },
          },
        },
      },
    },
    informationCardFieldsDisbaledForm: {
      type: "InformationCardFieldsDisabled",
      fields: {
        informationCardFieldsDisabled: {
          renderer: "defaultEnumMultiselect",
          options: "informationCardFieldsDisabledEnum",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            InformationCardFieldsDisabled: {
              groups: {
                main: ["informationCardFieldsDisabled"],
              },
            },
          },
        },
      },
    },
    informationCardFieldsForm: {
      type: "InformationCardFields",
      fields: {
        informationCardFields: {
          renderer: "defaultEnumMultiselect",
          options: "informationCardFieldsEnum",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            InformationCardFields: {
              groups: {
                main: ["informationCardFields"],
              },
            },
          },
        },
      },
    },
    keyValueFieldsForm: {
      type: "KeyValueFields",
      fields: {
        informationKeys: {
          renderer: "defaultEnumMultiselect",
          options: "informationKeysEnum",
          visible: { kind: "true" },
        },
        informationKeysDisabled: {
          renderer: "defaultEnumMultiselect",
          options: "informationKeysDisabledEnum",
          visible: { kind: "true" },
        },
        informationFreeKeys: {
          renderer: "defaultList",
          elementRenderer: "defaultString",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            KeyValueFields: {
              groups: {
                main: [
                  "informationKeys",
                  "informationKeysDisabled",
                  "informationFreeKeys",
                ],
              },
            },
          },
        },
      },
    },
    unequalTableToDocumentRowsCheckForm: {
      type: "UnequalTableToDocumentRowsCheck",
      fields: {
        unequalTableToDocumentRowsCheck: {
          renderer: "defaultBoolean",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            UnequalTableToDocumentRowsCheck: {
              groups: {
                main: ["unequalTableToDocumentRowsCheck"],
              },
            },
          },
        },
      },
    },
    documentDateCommitChecksForm: {
      type: "DocumentDateCommitChecks",
      fields: {
        documentDateIsSet: {
          renderer: "defaultBoolean",
          visible: { kind: "true" },
        },
        documentDateIsHighConfidence: {
          renderer: "defaultBoolean",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            DocumentDateCommitChecks: {
              groups: {
                main: ["documentDateIsSet", "documentDateIsHighConfidence"],
              },
            },
          },
        },
      },
    },
    documentNumberCommitChecksForm: {
      type: "DocumentNumberCommitChecks",
      fields: {
        documentNumberIsSet: {
          renderer: "defaultBoolean",
          visible: { kind: "true" },
        },
        documentNumberIsHighConfidence: {
          renderer: "defaultBoolean",
          visible: { kind: "true" },
        },
        maxDocumentNumberLength: {
          renderer: "defaultNumber",
          visible: { kind: "true" },
        },
        configurableNumberIsSet: {
          renderer: "defaultBoolean",
          visible: { kind: "true" },
        },
        configurableNumberIsHighConfidence: {
          renderer: "defaultBoolean",
          visible: { kind: "true" },
        },
        configurableNumber2IsSet: {
          renderer: "defaultBoolean",
          visible: { kind: "true" },
        },
        configurableNumber2IsHighConfidence: {
          renderer: "defaultBoolean",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            DocumentNumberCommitChecks: {
              groups: {
                main: [
                  "documentNumberIsSet",
                  "documentNumberIsHighConfidence",
                  "maxDocumentNumberLength",
                  "configurableNumberIsSet",
                  "configurableNumberIsHighConfidence",
                  "configurableNumber2IsSet",
                  "configurableNumber2IsHighConfidence",
                ],
              },
            },
          },
        },
      },
    },
    synchronizedDataFilterGroupCommitChecksForm: {
      type: "SynchronizedDataFilterGroupCommitChecks",
      fields: {
        synchronizedDataFilterGroupCommitChecks: {
          renderer: "defaultList",
          elementRenderer: "defaultString",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            SynchronizedDataFilterGroupCommitChecks: {
              groups: {
                main: ["synchronizedDataFilterGroupCommitChecks"],
              },
            },
          },
        },
      },
    },
    fieldContextForm: {
      type: "FieldContext",
      fields: {
        accountingPositionFields: {
          renderer: "defaultEnumMultiselect",
          options: "accountingPositionFieldsEnum",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            FieldContext: {
              groups: {
                main: ["accountingPositionFields"],
              },
            },
          },
        },
      },
    },
    filtersForm: {
      type: "Filters",
      fields: {
        name: {
          renderer: "defaultString",
          visible: { kind: "true" },
        },
        filterOp: {
          renderer: "defaultEnum",
          options: "filtersOpEnum",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            Filters: {
              groups: {
                main: ["name", "filterOp"],
              },
            },
          },
        },
      },
    },
    filterGroupForm: {
      type: "FilterGroup",
      fields: {
        filterGroupOp: {
          renderer: "defaultEnum",
          options: "filterGroupOpEnum",
          visible: { kind: "true" },
        },
        filters: {
          renderer: "defaultList",
          elementRenderer: "filtersForm",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            FilterGroup: {
              groups: {
                main: ["filterGroupOp", "filters"],
              },
            },
          },
        },
      },
    },
    dataFilterGroupCommitChecksForm: {
      type: "DataFilterGroupCommitChecks",
      fields: {
        name: {
          renderer: "defaultString",
          visible: { kind: "true" },
        },
        nameTranslations: {
          renderer: "defaultString",
          visible: { kind: "true" },
        },
        description: {
          renderer: "defaultString",
          visible: { kind: "true" },
        },
        descriptionTranslations: {
          renderer: "defaultString",
          visible: { kind: "true" },
        },
        context: {
          renderer: "defaultEnum",
          options: "contextEnum",
          visible: { kind: "true" },
        },
        filterGroup: {
          renderer: "filterGroupForm",
          visible: { kind: "true" },
        },
        fieldContext: {
          renderer: "fieldContextForm",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            DataFilterGroupCommitChecks: {
              groups: {
                main: [
                  "name",
                  "nameTranslations",
                  "description",
                  "descriptionTranslations",
                  "context",
                  "filterGroup",
                  "fieldContext",
                ],
              },
            },
          },
        },
      },
    },
    keyValueCommitChecksForm: {
      type: "KeyValueCommitChecks",
      fields: {
        requiredKeyValueFields: {
          renderer: "defaultEnumMultiselect",
          options: "requiredKeyValueFieldsEnum",
          visible: { kind: "true" },
        },
        highConfidenceKeyValueFields: {
          renderer: "defaultEnumMultiselect",
          options: "highConfidenceKeyValueFieldsEnum",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            KeyValueCommitChecks: {
              groups: {
                main: [
                  "requiredKeyValueFields",
                  "highConfidenceKeyValueFields",
                ],
              },
            },
          },
        },
      },
    },
    systemConfigForm: {
      type: "SystemConfig",
      fields: {
        debitNoteResultFields: {
          renderer: "defaultEnumMultiselect",
          options: "debitNoteResultFieldsEnum",
          visible: { kind: "true" },
        },
        automation: {
          renderer: "automationForm",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            SystemConfig: {
              groups: {
                main: ["debitNoteResultFields", "automation"],
              },
            },
          },
        },
      },
    },
    dashboardForm: {
      type: "Dashboard",
      fields: {
        keyValueFields: {
          renderer: "keyValueFieldsForm",
          visible: { kind: "true" },
        },
        informationCardFields: {
          renderer: "informationCardFieldsForm",
          visible: { kind: "true" },
        },
        informationCardFieldsDisabled: {
          renderer: "informationCardFieldsDisbaledForm",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            Dashboard: {
              groups: {
                main: [
                  "keyValueFields",
                  "informationCardFields",
                  "informationCardFieldsDisabled",
                ],
              },
            },
          },
        },
      },
    },
    commitChecksForm: {
      type: "CommitChecks",
      fields: {
        keyValueCommitChecks: {
          renderer: "keyValueCommitChecksForm",
          visible: { kind: "true" },
        },
        dataFilterGroupCommitChecks: {
          renderer: "dataFilterGroupCommitChecksForm",
          visible: { kind: "true" },
        },
        synchronizedDataFilterGroupCommitChecks: {
          renderer: "synchronizedDataFilterGroupCommitChecksForm",
          visible: { kind: "true" },
        },
        documentNumberCommitChecks: {
          renderer: "documentNumberCommitChecksForm",
          visible: { kind: "true" },
        },
        documentDateCommitChecks: {
          renderer: "documentDateCommitChecksForm",
          visible: { kind: "true" },
        },
        unequalTableToDocumentRowsCheck: {
          renderer: "unequalTableToDocumentRowsCheckForm",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            CommitChecks: {
              groups: {
                main: [
                  "keyValueCommitChecks",
                  "dataFilterGroupCommitChecks",
                  "synchronizedDataFilterGroupCommitChecks",
                  "documentNumberCommitChecks",
                  "documentDateCommitChecks",
                  "unequalTableToDocumentRowsCheck",
                ],
              },
            },
          },
        },
      },
    },
    debitNoteHeaderConfigForm: {
      type: "DebitNoteHeaderConfig",
      fields: {
        commitChecks: {
          renderer: "commitChecksForm",
          visible: { kind: "true" },
        },
        dashboard: {
          renderer: "dashboardForm",
          visible: { kind: "true" },
        },
        systemConfig: {
          renderer: "systemConfigForm",
          visible: { kind: "true" },
        },
      },
      tabs: {
        main: {
          columns: {
            CommitChecks: {
              groups: {
                main: ["commitChecks"],
              },
            },
            Dashboard: {
              groups: {
                main: ["dashboard"],
              },
            },
            SystemConfig: {
              groups: {
                main: ["systemConfig"],
              },
            },
          },
        },
      },
    },
  },

  launchers: {
    DEBIT_NOTE_HEADER_CONFIG: {
      kind: "edit",
      form: "debitNoteHeaderConfigForm",
      api: "debitNoteHeaderConfigApi",
    },
  },
};
