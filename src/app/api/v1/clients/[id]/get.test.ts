import orchestrator from 'src/app/api/orchestrator/orchestrator';

beforeAll(async () => {
  orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
  await orchestrator.seedDatabase.seedClient();
});

describe('GET /api/v1/clients/:id', () => {
  describe('Anonymous user', () => {
    test('Searching client by id', async () => {
      const response = await fetch('http://localhost:3000/api/v1/clients/1');

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body).toEqual({
        id: '1',
        name: 'John Doe',
        phone: '0123456789',
      });
    });

    test('Searching client not found', async () => {
      const response = await fetch('http://localhost:3000/api/v1/clients/2');

      expect(response.status).toBe(404);
    });
  });
});
