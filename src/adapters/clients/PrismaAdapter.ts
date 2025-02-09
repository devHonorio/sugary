import { ClientNotFound } from 'src/errors/client/repository';
import { prismaClient } from 'src/infra/prisma';
import { IDbClient } from 'src/interfaces/DbClient';
import { ClientType } from 'src/types';
import { paginateRules } from 'src/utils/prisma/paginateRulles';

export class PrismaAdapter implements IDbClient<ClientType> {
  async create(data: ClientType) {
    await prismaClient.client.create({ data });
  }
  async findById(id: string) {
    return await prismaClient.client.findUnique({ where: { id } });
  }

  async paginate(page: number, peerPage: number) {
    const clients = await prismaClient.client.findMany({
      ...paginateRules(page, peerPage),
    });

    const size = await prismaClient.client.count();

    return { size, data: clients };
  }

  async delete(id: string) {
    await prismaClient.client.delete({ where: { id } });
  }

  async update(client: Required<ClientType>) {
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
