export interface IDbClient<TData> {
  create: (data: TData) => Promise<void>;

  paginate: (
    page: number,
    peer_page: number,
  ) => Promise<{ size: number; data: TData[] }>;

  delete: (id: string) => Promise<void>;

  findById: (id: string) => Promise<TData | null>;

  update: (client: TData) => Promise<void | Error>;
}
