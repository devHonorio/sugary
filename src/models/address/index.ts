import { prismaAdapter } from 'src/adapters/address';
import { Repository } from '../repository';

export const addressRepository = new Repository(prismaAdapter);
