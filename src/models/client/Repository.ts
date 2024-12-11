import { prismaAdapter } from 'src/adapters/clients/PrismaAdapter';
import { IClient } from 'src/interfaces/clients/IClient';
import { IDbClient } from 'src/interfaces/clients/IDbClient';
import { IClientRepository } from 'src/interfaces/clients/IRepositoy';

class Repository implements IClientRepository {
  private dbClient: IDbClient;
  constructor(dbClient: IDbClient) {
    this.dbClient = dbClient;
  }

  async create({ name, phone }: Pick<IClient, 'name' | 'phone'>) {
    await this.dbClient.createClient(name, phone);
  }
}

export const clientRepository = new Repository(prismaAdapter);
