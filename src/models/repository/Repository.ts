import { IDbClient } from 'src/interfaces/DbClient';

export class Repository<TData> {
  constructor(private dbClient: IDbClient<TData>) {
    this.dbClient = dbClient;
  }
  async create(data: TData) {
    await this.dbClient.create(data);
  }

  async findById(id: string) {
    return await this.dbClient.findById(id);
  }

  async update(client: TData) {
    await this.dbClient.update(client);
  }
  async delete(id: string) {
    await this.dbClient.delete(id);
  }

  validatePeerPage(peerPage: number, min = 0, max = 100) {
    return peerPage > min && peerPage <= max;
  }
  async paginate(page: number, peerPage: number) {
    return await this.dbClient.paginate(page, peerPage);
  }
}
