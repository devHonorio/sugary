import orchestrator from '../../orchestrator/orchestrator';

beforeAll(async () => {
  orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
  await orchestrator.seedDatabase.seedAddresses(20);
});

describe('GET /api/v1/addresses', () => {
  describe('Anonymous user', () => {
    test('Retrieving paginated addresses', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/addresses?page=1&peer_page=10',
      );
      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.size).toBe(20);
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBe(10);

      expect(body.data[0]).toHaveProperty('id');
      expect(body.data[0]).toHaveProperty('surname');
      expect(body.data[0]).toHaveProperty('street');
      expect(body.data[0]).toHaveProperty('number');
      expect(body.data[0]).toHaveProperty('district');
      expect(body.data[0]).toHaveProperty('city');
      expect(body.data[0]).toHaveProperty('complement');
    });

    test('Retrieving invalid paginated addresses', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/addresses?peer_page=101',
      );

      expect(response.status).toBe(400);

      const body = await response.json();
      expect(body).toEqual({
        error: {
          message: 'Endereços por pagina deve ser menor ou igual a 100.',
        },
      });
    });
  });
});
