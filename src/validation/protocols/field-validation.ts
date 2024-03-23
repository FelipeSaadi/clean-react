export interface FieldValidation {
  field: string
  validate: (value: string) => null | Error
}
