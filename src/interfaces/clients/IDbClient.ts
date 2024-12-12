import { IClient } from './IClient';

export interface IDbClient {
  createClient: (name: string, phone: string) => Promise<void>;
  paginateClients: (
    page: number,
    peer_page: number,
  ) => Promise<Pick<IClient, 'name' | 'phone' | 'id'>[]>;
  deleteClient: (id: string) => Promise<void>;
  findById: (
    id: string,
  ) => Promise<Pick<IClient, 'name' | 'phone' | 'id'> | null>;
}
