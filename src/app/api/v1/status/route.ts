import { prismaClient } from 'src/infra/prisma';

export async function GET() {
  const dateNow = new Date().toISOString();

  const ResponseDatabaseVersion =
    await prismaClient.$queryRaw`SHOW server_version;`;

  const databaseVersion = ResponseDatabaseVersion[0].server_version;

  const responseMaxConnections =
    await prismaClient.$queryRaw`SHOW max_connections;`;

  const maxConnections = +responseMaxConnections[0].max_connections;

  const responseOpenedConnections =
    await prismaClient.$queryRaw`SELECT count(*)::int FROM pg_stat_activity WHERE datname = ${process.env.DATABASE_NAME};`;

  const openedConnections = responseOpenedConnections[0].count;

  return Response.json({
    updated_at: dateNow,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: maxConnections,
        opened_connections: openedConnections,
      },
    },
  });
}
