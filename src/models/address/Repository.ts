import { IDbAddress } from 'src/interfaces/addresses/IDbAddress';
import { AddressType } from 'src/types/address';

export class Repository {
  private dbClient: IDbAddress;

  constructor(dbClient: IDbAddress) {
    this.dbClient = dbClient;
  }

  async create(address: Omit<AddressType, 'id'>) {
    await this.dbClient.createAddress(address);
  }
}
