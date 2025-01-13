import { AddressType } from 'src/types/address';

export interface IDbAddress {
  createAddress(address: Omit<AddressType, 'id'>): Promise<void>;

  paginateAddresses(
    page: number,
    peer_page: number,
  ): Promise<{ size: number; data: AddressType[] }>;

  findById(id: string): Promise<AddressType | null>;
}
