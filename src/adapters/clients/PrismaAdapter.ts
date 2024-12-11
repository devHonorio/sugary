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
}

export const prismaAdapter = new PrismaAdapter();
