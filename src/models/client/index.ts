import { prismaAdapter } from 'src/adapters/clients';
import { Repository } from './Repository';

export const clientRepository = new Repository(prismaAdapter);
