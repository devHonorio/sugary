import { client } from 'src/infra/prisma';

interface Params {
  params: { id: string };
}

export const DELETE = async (_req, { params }: Params) => {
  try {
    await client.client.delete({ where: { id: params.id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return new Response(null, { status: 404 });
  }
};
