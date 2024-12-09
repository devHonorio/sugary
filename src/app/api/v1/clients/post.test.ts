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
    describe('Creating user with valid data', () => {
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
      test('User already exists', async () => {
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

    describe('Creating user with invalid data', () => {
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
          errors: [{ message: 'O telefone deve ter pelo menos 10 dígitos' }],
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
          errors: [
            { message: 'name é obrigatório' },
            { message: 'phone é obrigatório' },
          ],
        });
      });
    });
  });
});
