export class LengthName extends Error {
  constructor() {
    super('Nome deve ter entre 3 e 255 caracteres');
  }
}
