import { type FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  error: Error | null
  constructor (readonly field: string) {}

  validate (input: object): Error | null {
    return this.error
  }
}
