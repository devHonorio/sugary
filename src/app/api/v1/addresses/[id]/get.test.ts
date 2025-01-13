import orchestrator from 'src/app/api/orchestrator/orchestrator';

beforeAll(async () => {
  orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
  await orchestrator.seedDatabase.seedAddress();
});

describe('GET /api/v1/addresses/:id', () => {
  describe('Anonymous user', () => {
    test('Searching address by id', async () => {
      const response = await fetch('http://localhost:3000/api/v1/addresses/1');

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body).toEqual({
        id: '1',
        surname: 'John Doe',
        street: 'Rua 1',
        number: 123,
        district: 'Bairro 1',
        city: 'Cidade 1',
        complement: 'Complemento 1',
      });
    });

    test('Searching address not found', async () => {
      const response = await fetch('http://localhost:3000/api/v1/addresses/2');

      expect(response.status).toBe(404);
    });
  });
});
