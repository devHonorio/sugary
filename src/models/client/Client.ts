import { IClient } from 'src/interfaces/clients/IClient';

export class Client implements IClient {
  id: string;
  name: string;
  phone: string;

  constructor({ id, name, phone }: IClient) {
    if (!this.validateName(name)) {
      throw new Error(`Nome deve ter entre 3 e 255 caracteres`);
    }
    if (!this.validatePhone(phone)) {
      throw new Error(`Telefone deve ter entre 10 e 11 dígitos`);
    }

    this.id = id;
    this.name = name;
    this.phone = phone;
  }

  validateName(name: string): boolean {
    if (!name) {
      return false;
    }
    return name.length >= 3 && name.length <= 255;
  }

  validatePhone(phone: string): boolean {
    if (!phone) {
      return false;
    }
    return phone.length >= 10 && phone.length <= 11;
  }
}
