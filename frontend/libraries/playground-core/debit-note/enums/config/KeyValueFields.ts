import { CollectionReference, BoolExpr, Unit } from "ballerina-core";

const keyValueFields: Array<[CollectionReference, BoolExpr<Unit>]> = [
  [CollectionReference.Default("ZERO_PROTO", "ZERO_PROTO"), BoolExpr.Default.true()],
  [CollectionReference.Default("INVOICE_NO", "INVOICE_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("INVOICE_DATE", "INVOICE_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("DELIVERY_NO", "DELIVERY_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("DELIVERY_DATE", "DELIVERY_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("ORDER_NO", "ORDER_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("ORDER_DATE", "ORDER_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("COMPANY_NAME", "COMPANY_NAME"), BoolExpr.Default.true()],
  [CollectionReference.Default("STREET", "STREET"), BoolExpr.Default.true()],
  [CollectionReference.Default("POSTCODE", "POSTCODE"), BoolExpr.Default.true()],
  [CollectionReference.Default("CITY", "CITY"), BoolExpr.Default.true()],
  [CollectionReference.Default("SUBTOTAL", "SUBTOTAL"), BoolExpr.Default.true()],
  [CollectionReference.Default("TAX", "TAX"), BoolExpr.Default.true()],
  [CollectionReference.Default("TOTAL", "TOTAL"), BoolExpr.Default.true()],
  [CollectionReference.Default("DISCOUNT_PAYMENT_DATE", "DISCOUNT_PAYMENT_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("LATEST_PAYMENT_DATE", "LATEST_PAYMENT_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("BANK_ACCOUNT", "BANK_ACCOUNT"), BoolExpr.Default.true()],
  [CollectionReference.Default("IBAN", "IBAN"), BoolExpr.Default.true()],
  [CollectionReference.Default("BIC", "BIC"), BoolExpr.Default.true()],
  [CollectionReference.Default("VAT_NO", "VAT_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("TAX_NO", "TAX_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("DIRECT_DEBIT", "DIRECT_DEBIT"), BoolExpr.Default.true()],
  [CollectionReference.Default("CUSTOMER_NO", "CUSTOMER_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAGE_NO", "PAGE_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("EMAIL", "EMAIL"), BoolExpr.Default.true()],
  [CollectionReference.Default("URL", "URL"), BoolExpr.Default.true()],
  [CollectionReference.Default("SENDER_NO", "SENDER_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("PURCHASE_ORDER_NO", "PURCHASE_ORDER_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("PURCHASE_ORDER_DATE", "PURCHASE_ORDER_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("ADDITIONAL_COST", "ADDITIONAL_COST"), BoolExpr.Default.true()],
  [CollectionReference.Default("SUM_OF_GOODS", "SUM_OF_GOODS"), BoolExpr.Default.true()],
  [CollectionReference.Default("ADDITIONAL_DISCOUNT", "ADDITIONAL_DISCOUNT"), BoolExpr.Default.true()],
  [CollectionReference.Default("CASH_DISCOUNT", "CASH_DISCOUNT"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_ACCOUNT", "PAYMENTSLIP_ACCOUNT"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_REFERENCE_ID", "PAYMENTSLIP_REFERENCE_ID"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_AMOUNT", "PAYMENTSLIP_AMOUNT"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_ESR", "PAYMENTSLIP_ESR"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_BANK_NAME", "PAYMENTSLIP_BANK_NAME"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_BANK_POSTCODECITY", "PAYMENTSLIP_BANK_POSTCODECITY"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_RECEIVER_NAME", "PAYMENTSLIP_RECEIVER_NAME"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_RECEIVER_POSTCODECITY", "PAYMENTSLIP_RECEIVER_POSTCODECITY"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_RECEIVER_STREET", "PAYMENTSLIP_RECEIVER_STREET"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_PAYER_NAME", "PAYMENTSLIP_PAYER_NAME"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_PAYER_POSTCODECITY", "PAYMENTSLIP_PAYER_POSTCODECITY"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_PAYER_STREET", "PAYMENTSLIP_PAYER_STREET"), BoolExpr.Default.true()],
  [CollectionReference.Default("CURRENCY", "CURRENCY"), BoolExpr.Default.true()],
  [CollectionReference.Default("TAX_RATE", "TAX_RATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_RECEIVER_COUNTRY", "PAYMENTSLIP_RECEIVER_COUNTRY"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_PAYER_COUNTRY", "PAYMENTSLIP_PAYER_COUNTRY"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_MESSAGE", "PAYMENTSLIP_MESSAGE"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_QRCODE", "PAYMENTSLIP_QRCODE"), BoolExpr.Default.true()],
  [CollectionReference.Default("DOCUMENT_TYPE", "DOCUMENT_TYPE"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENTSLIP_IBAN", "PAYMENTSLIP_IBAN"), BoolExpr.Default.true()],
  [CollectionReference.Default("DOCUMENT_NO", "DOCUMENT_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("DOCUMENT_DATE", "DOCUMENT_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("MIN_AMOUNT", "MIN_AMOUNT"), BoolExpr.Default.true()],
  [CollectionReference.Default("ITEM_NO", "ITEM_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("CHARGE", "CHARGE"), BoolExpr.Default.true()],
  [CollectionReference.Default("SERIAL_NO", "SERIAL_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("REFERENCE_NO", "REFERENCE_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("REFERENCE_DATE", "REFERENCE_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("ORDER_CONFIRMATION_NO", "ORDER_CONFIRMATION_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("ORDER_CONFIRMATION_DATE", "ORDER_CONFIRMATION_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("VALUE_DATE", "VALUE_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("CREDIT_VOUCHER_NO", "CREDIT_VOUCHER_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("CREDIT_VOUCHER_DATE", "CREDIT_VOUCHER_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("RECEIPT_NO", "RECEIPT_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("RECEIPT_DATE", "RECEIPT_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("INVOICE_CORRECTION_NO", "INVOICE_CORRECTION_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("INVOICE_CORRECTION_DATE", "INVOICE_CORRECTION_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("DELIVER_DATE", "DELIVER_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("BLZ_NO", "BLZ_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("CATALOG_NO", "CATALOG_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("CERTIFICATE_NO", "CERTIFICATE_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("CHARGE_EXPIRY_DATE", "CHARGE_EXPIRY_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("COMMISSION_NO", "COMMISSION_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("CONTRACT_NO", "CONTRACT_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("CUSTOMS_NO", "CUSTOMS_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("DELIVERY_CONDITIONS", "DELIVERY_CONDITIONS"), BoolExpr.Default.true()],
  [CollectionReference.Default("DELIVERY_METHOD", "DELIVERY_METHOD"), BoolExpr.Default.true()],
  [CollectionReference.Default("DESIRED_DATE", "DESIRED_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("DISPATCH_DATE", "DISPATCH_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("DISPATCH_NO", "DISPATCH_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("DOCUMENT_CREATION_DATE", "DOCUMENT_CREATION_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("DOCUMENT_PRINT_DATE", "DOCUMENT_PRINT_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("DRAWING_INDEX_DATE", "DRAWING_INDEX_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("DRAWING_INDEX_NO", "DRAWING_INDEX_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("DRAWING_NO", "DRAWING_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("EU_PRODUCT_NO", "EU_PRODUCT_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("EXPIRY_DATE", "EXPIRY_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("FAX_NUMBER", "FAX_NUMBER"), BoolExpr.Default.true()],
  [CollectionReference.Default("GOODS_TARIFF_NO", "GOODS_TARIFF_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("HS_NO", "HS_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("PRODUCT_ORIGIN", "PRODUCT_ORIGIN"), BoolExpr.Default.true()],
  [CollectionReference.Default("MAINTENANCE_CONTRACT_NO", "MAINTENANCE_CONTRACT_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("MATERIAL_GROUP", "MATERIAL_GROUP"), BoolExpr.Default.true()],
  [CollectionReference.Default("MATERIAL_NO", "MATERIAL_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("OFFER_DATE", "OFFER_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("OFFER_NO", "OFFER_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("OFFER_VALIDITY_DATE", "OFFER_VALIDITY_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("OUTLINE_AGREEMENT_DATE", "OUTLINE_AGREEMENT_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("OUTLINE_AGREEMENT_NO", "OUTLINE_AGREEMENT_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("PART_NO", "PART_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENT_REFERENCE", "PAYMENT_REFERENCE"), BoolExpr.Default.true()],
  [CollectionReference.Default("PERFORMANCE_DATE", "PERFORMANCE_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("PHONE_NUMBER", "PHONE_NUMBER"), BoolExpr.Default.true()],
  [CollectionReference.Default("PROCESS_NO", "PROCESS_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("PRODUCT_GROUP", "PRODUCT_GROUP"), BoolExpr.Default.true()],
  [CollectionReference.Default("PRODUCT_NO", "PRODUCT_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("PROJECT_DATE", "PROJECT_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("PROJECT_NO", "PROJECT_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("RELEASE_ORDER_NO", "RELEASE_ORDER_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("REQUEST_DATE", "REQUEST_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("REQUEST_NO", "REQUEST_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("RETURN_DELIVERY_NO", "RETURN_DELIVERY_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROUNDING_AMOUNT", "ROUNDING_AMOUNT"), BoolExpr.Default.true()],
  [CollectionReference.Default("SUPPLIER_ITEM_NO", "SUPPLIER_ITEM_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("DELIVER_WEEK", "DELIVER_WEEK"), BoolExpr.Default.true()],
  [CollectionReference.Default("DISPATCH_WEEK", "DISPATCH_WEEK"), BoolExpr.Default.true()],
  [CollectionReference.Default("COUNTRY", "COUNTRY"), BoolExpr.Default.true()],
  [CollectionReference.Default("ADDRESS_INFO", "ADDRESS_INFO"), BoolExpr.Default.true()],
  [CollectionReference.Default("POSTFACH", "POSTFACH"), BoolExpr.Default.true()],
  [CollectionReference.Default("CONTACT_PERSON", "CONTACT_PERSON"), BoolExpr.Default.true()],
  [CollectionReference.Default("CONTACT_PERSON_INTERNAL", "CONTACT_PERSON_INTERNAL"), BoolExpr.Default.true()],
  [CollectionReference.Default("R_ADDRESS_INFO", "R_ADDRESS_INFO"), BoolExpr.Default.true()],
  [CollectionReference.Default("DELIVERY_TERM", "DELIVERY_TERM"), BoolExpr.Default.true()],
  [CollectionReference.Default("OCR", "OCR"), BoolExpr.Default.true()],
  [CollectionReference.Default("KID", "KID"), BoolExpr.Default.true()],
  [CollectionReference.Default("INCOTERM", "INCOTERM"), BoolExpr.Default.true()],
  [CollectionReference.Default("VAT_DATE", "VAT_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("CZECH_PAYMENT_REFERENCE", "CZECH_PAYMENT_REFERENCE"), BoolExpr.Default.true()],
  [CollectionReference.Default("CURRENCY_FACTOR", "CURRENCY_FACTOR"), BoolExpr.Default.true()],
  [CollectionReference.Default("QC_MATERIAL_NO", "QC_MATERIAL_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("MATERIAL_DESCRIPTION", "MATERIAL_DESCRIPTION"), BoolExpr.Default.true()],
  [CollectionReference.Default("LOT_NUMBER", "LOT_NUMBER"), BoolExpr.Default.true()],
  [CollectionReference.Default("DELIVERY_QUANTITY", "DELIVERY_QUANTITY"), BoolExpr.Default.true()],
  [CollectionReference.Default("MANUFACTURE_DATE", "MANUFACTURE_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("BEST_BEFORE_DATE", "BEST_BEFORE_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("PRODUCTION_PERIOD", "PRODUCTION_PERIOD"), BoolExpr.Default.true()],
  [CollectionReference.Default("REMARK", "REMARK"), BoolExpr.Default.true()],
  [CollectionReference.Default("COMPANY_CODE", "COMPANY_CODE"), BoolExpr.Default.true()],
  [CollectionReference.Default("REQUESTER", "REQUESTER"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_QC_MATERIAL_NO", "ROCHE_QC_MATERIAL_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_MATERIAL_DESCRIPTION", "ROCHE_MATERIAL_DESCRIPTION"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_LOT_NUMBER", "ROCHE_LOT_NUMBER"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_DELIVERY_QUANTITY", "ROCHE_DELIVERY_QUANTITY"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_MANUFACTURE_DATE", "ROCHE_MANUFACTURE_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_MANUFACTURE_DATE_START", "ROCHE_MANUFACTURE_DATE_START"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_MANUFACTURE_DATE_END", "ROCHE_MANUFACTURE_DATE_END"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_BEST_BEFORE_DATE", "ROCHE_BEST_BEFORE_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_PRODUCTION_PERIOD", "ROCHE_PRODUCTION_PERIOD"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_REMARK", "ROCHE_REMARK"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_GLOBAL_MATERIAL_NO", "ROCHE_GLOBAL_MATERIAL_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_PRODUCTION_PERIOD_START", "ROCHE_PRODUCTION_PERIOD_START"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_PRODUCTION_PERIOD_END", "ROCHE_PRODUCTION_PERIOD_END"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_EXPIRY_DATE", "ROCHE_EXPIRY_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("ROCHE_TECHNICAL_DELIVERY_CONDITIONS", "ROCHE_TECHNICAL_DELIVERY_CONDITIONS"), BoolExpr.Default.true()],
  [CollectionReference.Default("DATE_OF_SERVICE", "DATE_OF_SERVICE"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENT_ADVICE_NO", "PAYMENT_ADVICE_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("PAYMENT_ADVICE_DATE", "PAYMENT_ADVICE_DATE"), BoolExpr.Default.true()],
  [CollectionReference.Default("DEBIT_NOTE_NO", "DEBIT_NOTE_NO"), BoolExpr.Default.true()],
  [CollectionReference.Default("DEBIT_NOTE_DATE", "DEBIT_NOTE_DATE"), BoolExpr.Default.true()]
];

export default keyValueFields;