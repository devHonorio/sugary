import { prismaClient } from 'src/infra/prisma';
import { IDbClient } from 'src/interfaces/clients/IDbClient';

class PrismaAdapter implements IDbClient {
  async createClient(name: string, phone: string) {
    await prismaClient.client.create({
      data: {
        name,
        phone,
      },
    });
  }

  async paginateClients(page: number, peerPage: number) {
    return await prismaClient.client.findMany({
      skip: (page - 1) * peerPage,
      take: peerPage,
    });
  }
}

export const prismaAdapter = new PrismaAdapter();
