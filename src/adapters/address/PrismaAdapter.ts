import { AddressNotFound } from 'src/errors/addresses';
import { prismaClient } from 'src/infra/prisma';
import { IDbClient } from 'src/interfaces/DbClient';
import { AddressType } from 'src/types/address';
import { paginateRules } from 'src/utils/prisma/paginateRulles';

export class PrismaAdapter implements IDbClient<AddressType> {
  async create(address: AddressType) {
    await prismaClient.address.create({ data: address });
  }

  async paginate(page: number, peer_page: number) {
    const size = await prismaClient.address.count();
    const addresses = await prismaClient.address.findMany({
      ...paginateRules(page, peer_page),
      orderBy: { street: 'asc' },
    });

    return { size, data: addresses };
  }

  async findById(id: string) {
    return await prismaClient.address.findUnique({ where: { id } });
  }

  async delete(id: string) {
    try {
      await prismaClient.address.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.message.search('not found') !== -1) {
        throw new AddressNotFound();
      }
      throw error;
    }
  }
  async update({
    city,
    district,
    number,
    street,
    complement,
    id,
    surname,
  }: AddressType) {
    try {
      await prismaClient.address.update({
        where: { id },
        data: {
          city,
          complement,
          district,
          id,
          number,
          street,
          surname,
        },
      });
    } catch (error) {
      if (error.message.search('not found') !== -1) {
        throw new AddressNotFound();
      }

      throw error;
    }
  }
}
