import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from '@/validation/validators'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = ValidationComposite.build(fieldValidationSpy)
  return {
    sut,
    fieldValidationSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName: string = faker.database.column()
    const { sut, fieldValidationSpy } = makeSut(fieldName)

    const errorMessage: string = faker.word.words()
    fieldValidationSpy[0].error = new Error(errorMessage)
    fieldValidationSpy[1].error = new Error(faker.word.words())

    const error = sut.validate(fieldName, { [fieldName]: faker.word.sample() })
    expect(error).toBe(errorMessage)
  })

  test('Should return falsy if there is no error', () => {
    const fieldName: string = faker.database.column()
    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, { [fieldName]: faker.word.sample() })
    expect(error).toBeFalsy()
  })
})
