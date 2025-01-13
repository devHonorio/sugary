import { prismaClient } from 'src/infra/prisma';
import { IDbClient } from 'src/interfaces/DbClient';
import { AddressType } from 'src/types/address';

export class PrismaAdapter implements IDbClient<AddressType> {
  async create(address: AddressType) {
    await prismaClient.address.create({ data: address });
  }

  async paginate(page: number, peer_page: number) {
    const size = await prismaClient.address.count();
    const addresses = await prismaClient.address.findMany({
      skip: (page - 1) * peer_page,
      take: peer_page,
      orderBy: { street: 'asc' },
    });

    return { size, data: addresses };
  }

  async findById(id: string) {
    return await prismaClient.address.findUnique({ where: { id } });
  }

  delete: (id: string) => Promise<void>;
  update: (client: AddressType) => Promise<void | Error>;
}
