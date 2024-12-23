import { AddressType } from 'src/types/address';

export interface IDbAddress {
  createAddress(address: Omit<AddressType, 'id'>): Promise<void>;
}
