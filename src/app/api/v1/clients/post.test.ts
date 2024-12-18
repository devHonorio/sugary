import { beforeAll, test } from '@jest/globals';
import orchestrator from '../../orchestrator/orchestrator';

beforeAll(async () => {
  orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
});

const user: {
  name: string;
  phone: string;
} = { name: 'John Doe', phone: '0123456789' };

describe('POST /api/v1/clients', () => {
  describe('Anonymous user', () => {
    describe('Creating client with valid data', () => {
      test('valid data', async () => {
        const response = await fetch('http://localhost:3000/api/v1/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        expect(response.status).toBe(201);

        try {
          await response.json();
        } catch (error) {
          expect(error).toBeDefined();
        }
      });
      test('Client already exists', async () => {
        const response = await fetch('http://localhost:3000/api/v1/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        expect(response.status).toBe(400);
      });
    });

    describe('Creating client with invalid data', () => {
      test('invalid phone', async () => {
        const response = await fetch('http://localhost:3000/api/v1/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: 'John Doe', phone: '012345678' }),
        });

        expect(response.status).toBe(400);

        const body = await response.json();

        expect(body).toEqual({
          error: { message: 'Telefone deve ter entre 10 e 11 dígitos' },
        });
      });

      test('invalid body', async () => {
        const response = await fetch('http://localhost:3000/api/v1/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        expect(response.status).toBe(400);

        const body = await response.json();

        expect(body).toEqual({
          error: { message: 'Nome deve ter entre 3 e 255 caracteres' },
        });
      });
    });
  });
});
