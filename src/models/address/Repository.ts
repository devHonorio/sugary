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

  async paginate(page: number, peerPage: number) {
    return await this.dbClient.paginateAddresses(page, peerPage);
  }

  async findById(id: string) {
    return await this.dbClient.findById(id);
  }
}
