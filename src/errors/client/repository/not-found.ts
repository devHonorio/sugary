export class ClientNotFound extends Error {
  constructor() {
    super('Cliente não encontrado');
  }
}
