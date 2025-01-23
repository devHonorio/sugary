import orchestrator from 'src/app/api/orchestrator/orchestrator';
import { AddressType } from 'src/types/address';
beforeAll(async () => {
  orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
  await orchestrator.seedDatabase.seedAddress();
});

describe('PATCH /api/v1/addresses/:id', () => {
  const address: AddressType = {
    surname: 'Casa do Joao',
    city: 'Cidade do Joao',
    district: 'Bairro do Joao',
    number: 123,
    street: 'Rua do Joao',
    complement: 'Complemento do Joao',
    id: '1',
  };
  describe('Anonymous user', () => {
    test('Update address', async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/addresses/${address.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(address),
          headers: { 'Content-Type': 'application/json' },
        },
      );

      expect(response.status).toBe(200);
    });

    test('Update address not found', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/addresses/88',
        {
          method: 'PATCH',
          body: JSON.stringify(address),
          headers: { 'Content-Type': 'application/json' },
        },
      );

      expect(response.status).toBe(404);
    });

    test('Update address with invalid data', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/addresses/88',
        { method: 'PATCH' },
      );

      expect(response.status).toBe(400);
    });
  });
});
