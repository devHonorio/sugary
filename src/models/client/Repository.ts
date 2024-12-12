import { IDbClient } from 'src/interfaces/clients/IDbClient';
import { IClientRepository } from 'src/interfaces/clients/IRepositoy';

export class Repository implements IClientRepository {
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
}
