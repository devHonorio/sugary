export class InvalidAddress extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidAddress';
  }
}

export class InvalidLengthStreet extends InvalidAddress {
  constructor() {
    super('Street deve ter entre 3 e 255 caracteres');
  }
}

export class InvalidNumber extends InvalidAddress {
  constructor() {
    super('Number deve ser um número inteiro positivo');
  }
}

export class InvalidDistrict extends InvalidAddress {
  constructor() {
    super('District deve ter entre 3 e 255 caracteres');
  }
}

export class InvalidCity extends InvalidAddress {
  constructor() {
    super('City deve ter entre 3 e 255 caracteres');
  }
}

export class InvalidSurname extends InvalidAddress {
  constructor() {
    super('Surname deve ter entre 3 e 255 caracteres');
  }
}

export class InvalidComplement extends InvalidAddress {
  constructor() {
    super('Complement deve ter entre 3 e 255 caracteres');
  }
}

export class AddressNotFound extends Error {
  constructor() {
    super('Endereço nao encontrado');
    this.name = 'AddressNotFound';
  }
}