import React from 'react'
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const errorMessage = faker.random.words()
  validationStub.errorMessage = errorMessage
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with inital state', () => {
    const { sut, validationStub } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const password = sut.getByTestId('password-status')
    expect(password.title).toBe(validationStub.errorMessage)
    expect(password.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email if Validation succeeds', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = ''
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('ok')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password if Validation succeeds', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = ''
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('ok')
    expect(passwordStatus.textContent).toBe('🟢')
  })
})
