export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User Already Exists.");
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials.");
  }
}

export class InsufficientFundsError extends Error {
  constructor() {
    super(
      "It seems to you that this budget does not have enough funds to carry out this operation."
    );
  }
}
