export interface IDbClient {
  createClient: (name: string, phone: string) => Promise<void>;
}
