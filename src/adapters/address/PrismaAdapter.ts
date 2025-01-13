import { prismaClient } from 'src/infra/prisma';
import { IDbAddress } from 'src/interfaces/addresses/IDbAddress';
import { AddressType } from 'src/types/address';

export class PrismaAdapter implements IDbAddress {
  async createAddress(address: Omit<AddressType, 'id'>) {
    await prismaClient.address.create({ data: address });
  }

  async paginateAddresses(page: number, peer_page: number) {
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
}
