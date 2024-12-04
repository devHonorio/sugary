import orchestrator from 'src/app/api/orchestrator/orchestrator';

beforeAll(async () => {
  orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
  await orchestrator.seedDatabase.seedClient();
});

describe('DELETE /api/v1/clients/:id', () => {
  describe('Anonymous user', () => {
    test('delete user', async () => {
      const response = await fetch('http://localhost:3000/api/v1/clients/1', {
        method: 'DELETE',
      });

      expect(response.status).toBe(204);
    });

    test('user not found', async () => {
      const response = await fetch('http://localhost:3000/api/v1/clients/2', {
        method: 'DELETE',
      });

      expect(response.status).toBe(404);
    });
  });
});
