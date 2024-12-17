import { IDbClient } from 'src/interfaces/clients/IDbClient';
import { ClientType } from 'src/types';

export class Repository {
  private dbClient: IDbClient;
  constructor(dbClient: IDbClient) {
    this.dbClient = dbClient;
  }

  async create({ name, phone }) {
    await this.dbClient.createClient(name, phone);
  }

  async paginate(page: number, peerPage: number) {
    return await this.dbClient.paginateClients(page, peerPage);
  }
  async delete(id: string) {
    await this.dbClient.deleteClient(id);
  }

  validatePeerPage(peer_page: number) {
    return peer_page > 0 && peer_page <= 100;
  }

  async findById(id: string) {
    return await this.dbClient.findById(id);
  }

  async update(client: Required<ClientType>) {
    await this.dbClient.updateClient(client);
  }
}
