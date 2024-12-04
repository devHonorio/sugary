import retry from 'async-retry';

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

const orchestrator = { waitForAllServices };
export default orchestrator;
