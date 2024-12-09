import orchestrator from '../../orchestrator/orchestrator';

beforeAll(async () => {
  orchestrator.waitForAllServices();
});

describe('GET /api/v1/status', () => {
  describe('Anonymous user', () => {
    test('Retrieving current status', async () => {
      const response = await fetch('http://localhost:3000/api/v1/status');

      expect(response.status).toBe(200);

      const body = await response.json();

      const parseUpdatedAt = new Date(body.updated_at).toISOString();

      expect(body).toEqual({
        updated_at: parseUpdatedAt,
        dependencies: {
          database: {
            version: '16.4',
            max_connections: 100,
            opened_connections: 0,
          },
        },
      });
    });
  });
});
