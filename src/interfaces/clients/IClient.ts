export interface IClient {
  id?: string;
  name: string;
  phone: string;

  validateName(name: string): boolean;
  validatePhone(name: string): boolean;
}
