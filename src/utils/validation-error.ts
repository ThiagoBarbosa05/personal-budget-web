export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User Already Exists.')
    }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials.')
  }
}