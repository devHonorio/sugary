import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
dotenvExpand.expand(dotenv.config({ path: '.env.development' }));

import { fakerPT_BR as faker } from '@faker-js/faker';

import retry from 'async-retry';
import { prismaClient } from 'src/infra/prisma';

const waitForAllServices = () => {
  retry(
    async () => {
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
  await prismaClient.client.deleteMany();
};

const seedClient = async () => {
  await prismaClient.client.create({
    data: {
      id: '1',
      name: 'John Doe',
      phone: '0123456789',
    },
  });
};

const seedClients = async (quantity = 10) => {
  await prismaClient.client.createMany({
    data: Array.from({ length: quantity }).map(() => {
      const name = faker.person.fullName();
      const phone = faker.phone
        .number({ style: 'national' })
        .replaceAll(/[^\d]+/g, '');

      return {
        name,
        phone,
      };
    }),
  });
};
const seedDatabase = { seedClient, seedClients };
const orchestrator = { waitForAllServices, cleanDatabase, seedDatabase };
export default orchestrator;
