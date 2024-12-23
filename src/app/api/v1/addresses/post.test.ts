import orchestrator from '../../orchestrator/orchestrator';

beforeAll(() => {
  orchestrator.waitForAllServices();
});
describe('POST /api/v1/addresses', () => {
  describe('Anonymous user', () => {
    test('Creating address with invalid body', async () => {
      const response = await fetch('http://localhost:3000/api/v1/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status).toBe(400);

      const body = await response.json();

      expect(body).toEqual({
        error: { message: 'requisição deve conter um body.' },
      });
    });

    test('Creating address with invalid data', async () => {
      const response = await fetch('http://localhost:3000/api/v1/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      expect(response.status).toBe(400);

      const body = await response.json();

      expect(body).toEqual({
        error: { message: 'Street deve ter entre 3 e 255 caracteres' },
      });
    });

    test('Creating address', async () => {
      const response = await fetch('http://localhost:3000/api/v1/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surname: 'Casa do Joao',
          street: 'Rua do Joao',
          number: 123,
          district: 'Bairro do Joao',
          city: 'Cidade do Joao',
          complement: 'Complemento do Joao',
        }),
      });

      expect(response.status).toBe(201);
    });
  });
});
