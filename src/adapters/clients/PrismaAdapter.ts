import { prismaClient } from 'src/infra/prisma';
import { IDbClient } from 'src/interfaces/clients/IDbClient';

export class PrismaAdapter implements IDbClient {
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

  async deleteClient(id: string) {
    await prismaClient.client.delete({ where: { id } });
  }

  async findById(id: string) {
    return await prismaClient.client.findUnique({ where: { id } });
  }
}
