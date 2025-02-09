import { prismaAdapter } from 'src/adapters/clients';
import { Repository } from '../repository';

export const clientRepository = new Repository(prismaAdapter);
