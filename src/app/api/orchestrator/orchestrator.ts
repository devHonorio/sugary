import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
dotenvExpand.expand(dotenv.config({ path: '.env.development' }));

import retry from 'async-retry';
import { client } from 'src/infra/prisma';

const waitForAllServices = () => {
  retry(
    async () => {
      process.stdout.write('.');
      const response = await fetch('http://localhost:3000/api/v1/status');

      await response.json();
    },
    {
      retries: 100,
      maxTimeout: 500,
      minTimeout: 50,
    },
  );
};

const cleanDatabase = async () => {
  await client.client.deleteMany();
};

const seedClient = async () => {
  await client.client.create({
    data: {
      id: '1',
      name: 'John Doe',
      phone: '0123456789',
    },
  });
};
const seedDatabase = { seedClient };
const orchestrator = { waitForAllServices, cleanDatabase, seedDatabase };
export default orchestrator;
