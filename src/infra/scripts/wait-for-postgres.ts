const { exec } = require('node:child_process');

process.stdout.write('\n\n🔴 Aguardando conexão com Postgres...');

const checkPostgres = () => {
  exec('docker exec sugary_container pg_isready', (error, stdout) => {
    if (stdout.search('accepting connections') === -1) {
      process.stdout.write('.');
      checkPostgres();
      return;
    }
    process.stdout.write('\n🟢 Postgres está aceitando conexões\n\n\n');
  });
};

checkPostgres();
