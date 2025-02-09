import orchestrator from 'src/app/api/orchestrator/orchestrator';

beforeAll(async () => {
  orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
  await orchestrator.seedDatabase.seedAddress();
});

describe('DELETE /api/v1/addresses/:id', () => {
  describe('Anonymous user', () => {
    test('Delete address', async () => {
      const response = await fetch('http://localhost:3000/api/v1/addresses/1', {
        method: 'DELETE',
      });

      expect(response.status).toBe(204);
    });

    test('Delete address not found', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/addresses/88',
        { method: 'DELETE' },
      );

      expect(response.status).toBe(404);
    });
  });
});
