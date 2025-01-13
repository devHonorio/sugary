import { Repository } from '../repository';
import { prismaAdapter } from 'src/adapters/address';

export const addressRepository = new Repository(prismaAdapter);
