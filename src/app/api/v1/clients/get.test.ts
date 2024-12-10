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

      expect(Array.isArray(body)).toBe(true);

      expect(body.length).toBe(10);
      expect(body[0]).toHaveProperty('id');
      expect(body[0]).toHaveProperty('name');
      expect(body[0]).toHaveProperty('phone');
    });

    test('Retrieving with pagination', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/clients?page=2&peer_page=5',
      );

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(Array.isArray(body)).toBe(true);

      expect(body.length).toBe(5);
      expect(body[0]).toHaveProperty('id');
      expect(body[0]).toHaveProperty('name');
      expect(body[0]).toHaveProperty('phone');
    });

    test('Retrieving with invalid pagination', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/clients?page=2&peer_page=101',
      );

      expect(response.status).toBe(400);

      const body = await response.json();

      expect(body).toEqual({
        errors: [{ message: 'O limite máximo de clientes é 100' }],
      });
    });

    test('Retrieving with invalid page', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/clients?page=0&peer_page=5',
      );

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.length).toBe(5);
    });

    test('Retrieving page not found', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/clients?page=3&peer_page=5',
      );

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.length).toBe(0);
    });
  });
});
