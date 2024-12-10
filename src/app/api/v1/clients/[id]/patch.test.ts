import orchestrator from 'src/app/api/orchestrator/orchestrator';

beforeAll(async () => {
  orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
  await orchestrator.seedDatabase.seedClient();
});

describe('PATCH /api/v1/clients/:id', () => {
  describe('Anonymous user', () => {
    test('Updating client name', async () => {
      const response = await fetch('http://localhost:3000/api/v1/clients/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'John Doe' }),
      });

      expect(response.status).toBe(200);
    });

    test('Updating client phone', async () => {
      const response = await fetch('http://localhost:3000/api/v1/clients/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: '0123456789' }),
      });

      expect(response.status).toBe(200);
    });

    test('Updating client not found', async () => {
      const response = await fetch('http://localhost:3000/api/v1/clients/2', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'John Doe' }),
      });

      expect(response.status).toBe(404);
    });

    test('Updating client with invalid data', async () => {
      const response = await fetch('http://localhost:3000/api/v1/clients/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status).toBe(400);

      const body = await response.json();

      expect(body).toEqual({
        error: { message: 'requisição deve conter um body' },
      });
    });
  });
});
