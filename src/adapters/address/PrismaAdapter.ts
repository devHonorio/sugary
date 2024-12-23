import { prismaClient } from 'src/infra/prisma';
import { IDbAddress } from 'src/interfaces/addresses/IDbAddress';
import { AddressType } from 'src/types/address';

export class PrismaAdapter implements IDbAddress {
  async createAddress(address: Omit<AddressType, 'id'>) {
    await prismaClient.address.create({ data: address });
  }
}
