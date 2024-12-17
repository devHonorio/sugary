import { ClientNotFound } from 'src/errors/client/repository';
import { prismaClient } from 'src/infra/prisma';
import { IDbClient } from 'src/interfaces/clients/IDbClient';
import { ClientType } from 'src/types';

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

  async updateClient(client: Required<ClientType>) {
    try {
      await prismaClient.client.update({
        where: { id: client.id },
        data: { name: client.name, phone: client.phone },
      });
    } catch (error) {
      if (error.message.search('not found') !== -1) {
        throw new ClientNotFound();
      }
      throw error;
    }
  }
}
