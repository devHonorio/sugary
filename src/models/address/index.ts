import { Repository } from './Repository';
import { prismaAdapter } from 'src/adapters/address';

export const addressRepository = new Repository(prismaAdapter);
