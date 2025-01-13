import orchestrator from '../../orchestrator/orchestrator';

beforeAll(async () => {
  orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
  await orchestrator.seedDatabase.seedClients();
});

describe('GET /api/v1/clients', () => {
  describe('Anonymous user', () => {
    test('Retrieving all clients', async () => {
      const response = await fetch('http://localhost:3000/api/v1/clients');

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(Array.isArray(body.data)).toBe(true);

      expect(body.data.length).toBe(10);
      expect(body.data[0]).toHaveProperty('id');
      expect(body.data[0]).toHaveProperty('name');
      expect(body.data[0]).toHaveProperty('phone');

      expect(body.size).toBe(10);
    });

    test('Retrieving with pagination', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/clients?page=2&peer_page=5',
      );

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(Array.isArray(body.data)).toBe(true);

      expect(body.data.length).toBe(5);
      expect(body.data[0]).toHaveProperty('id');
      expect(body.data[0]).toHaveProperty('name');
      expect(body.data[0]).toHaveProperty('phone');

      expect(body.size).toBe(10);
    });

    test('Retrieving with invalid pagination', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/clients?page=2&peer_page=101',
      );

      expect(response.status).toBe(400);

      const body = await response.json();

      expect(body).toEqual({
        error: { message: 'O limite máximo de clientes é 100' },
      });
    });

    test('Retrieving with invalid page', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/clients?page=0&peer_page=5',
      );

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.data.length).toBe(5);
      expect(body.size).toBe(10);
    });

    test('Retrieving page not found', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/clients?page=3&peer_page=5',
      );

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.data.length).toBe(0);
      expect(body.size).toBe(10);
    });
  });
});
