import retry from 'async-retry';

const waitForAllServices = () => {
  process.stdout.write('\n\n🔴 Aguardando serviços');
  retry(
    async () => {
      process.stdout.write('.');
      const response = await fetch('http://localhost:3000/api/v1/status');

      await response.json();

      return process.stdout.write('\n🟢 Serviços prontos!\n\n\n');
    },
    {
      retries: 100,
      maxTimeout: 500,
      minTimeout: 50,
    },
  );
};

export const orchestrator = { waitForAllServices };
