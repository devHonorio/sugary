import { ClientType } from 'src/types';
import { Repository } from '../repository';
import { prismaAdapter } from 'src/adapters/clients';

export const clientRepository = new Repository<ClientType>(prismaAdapter);
