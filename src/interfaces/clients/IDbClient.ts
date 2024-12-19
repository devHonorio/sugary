import { ClientType } from 'src/types';

export interface IDbClient {
  createClient: (name: string, phone: string) => Promise<void>;

  paginateClients: (page: number, peer_page: number) => Promise<ClientType[]>;

  deleteClient: (id: string) => Promise<void>;

  findById: (id: string) => Promise<ClientType | null>;

  updateClient: (client: ClientType) => Promise<void | Error>;
}
