import nextJest from 'next/jest';

const createNextConfig = nextJest({
  dir: '.',
});
const jestConfig = createNextConfig({
  moduleDirectories: ['node_modules', '<rootDir>'],
});

export default jestConfig;
