import { LengthName, LengthPhone } from 'src/errors/client';
import { ClientType } from 'src/types';

export class Client {
  id: string;
  name: string;
  phone: string;

  constructor({ id, name, phone }: ClientType) {
    if (!this.validateName(name)) {
      throw new LengthName();
    }
    if (!this.validatePhone(phone)) {
      throw new LengthPhone();
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
