import {
  InvalidCity,
  InvalidComplement,
  InvalidDistrict,
  InvalidLengthStreet,
  InvalidNumber,
  InvalidSurname,
} from 'src/errors/addresses';
import { AddressType } from 'src/types/address';

export class Address {
  private props: AddressType;
  constructor(props: AddressType) {
    if (props.surname) {
      if (!this.isSurnameValid(props.surname)) {
        throw new InvalidSurname();
      }
    }

    if (!this.isStreetValid(props.street)) {
      throw new InvalidLengthStreet();
    }
    if (!this.isNumberValid(props.number)) {
      throw new InvalidNumber();
    }
    if (!this.isDistrictValid(props.district)) {
      throw new InvalidDistrict();
    }
    if (!this.isCityValid(props.city)) {
      throw new InvalidCity();
    }

    if (props.complement) {
      if (!this.isComplementValid(props.complement)) {
        throw new InvalidComplement();
      }
    }

    this.props = props;
  }

  private isLengthStringValid(str: string) {
    if (str?.length > 3 || str?.length < 255) {
      return true;
    }
    return false;
  }
  isSurnameValid(surname: string) {
    return this.isLengthStringValid(surname);
  }

  isStreetValid(street: string) {
    return this.isLengthStringValid(street);
  }
  isNumberValid(number: number) {
    if (!number) {
      return false;
    }
    return number > 0;
  }
  isDistrictValid(district: string) {
    return this.isLengthStringValid(district);
  }
  isCityValid(city: string) {
    return this.isLengthStringValid(city);
  }

  isComplementValid(complement: string) {
    return this.isLengthStringValid(complement);
  }

  get surname() {
    return this.props.surname;
  }
  get street() {
    return this.props.street;
  }
  get number() {
    return this.props.number;
  }
  get district() {
    return this.props.district;
  }
  get city() {
    return this.props.city;
  }
  get complement() {
    return this.props.complement;
  }
}
