import { IClient } from './IClient';

export interface IClientRepository {
  create: ({ name, phone }: Pick<IClient, 'name' | 'phone'>) => Promise<void>;
  paginate: (
    page: number,
    peer_page: number,
  ) => Promise<Pick<IClient, 'name' | 'phone' | 'id'>[]>;
  validatePeerPage(peerPage: number): boolean;
}
