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

export const GET = async (_req, { params }: Params) => {
  try {
    const response = await client.client.findUnique({
      where: { id: params.id },
    });

    if (!response) {
      return new Response(null, { status: 404 });
    }
    return Response.json(response);
  } catch {
    return new Response(null, { status: 500 });
  }
};
