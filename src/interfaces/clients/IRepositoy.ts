import { IClient } from './IClient';

export interface IClientRepository {
  create: ({ name, phone }: Pick<IClient, 'name' | 'phone'>) => Promise<void>;
}
