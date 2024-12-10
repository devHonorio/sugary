import { prismaClient } from 'src/infra/prisma';
import { z } from 'zod';

interface Params {
  params: { id: string };
}

export const DELETE = async (_req, { params }: Params) => {
  try {
    await prismaClient.client.delete({ where: { id: params.id } });
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
    const response = await prismaClient.client.findUnique({
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

const schemaClient = z.object({
  name: z.string().min(3).max(255).optional(),
  phone: z.string().min(10).max(11).optional(),
});
export const PATCH = async (req: Request, { params }: Params) => {
  try {
    const data = await req.json();

    const { name, phone } = schemaClient.parse(data);

    await prismaClient.client.update({
      where: { id: params.id },
      data: { name, phone },
    });
    return Response.json(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ errors: error.errors }), {
        status: 400,
      });
    }
    if (error instanceof Error) {
      if (error.message.search('not found') !== -1) {
        return new Response(null, { status: 404 });
      }
      if (error.message.search('Unexpected end of JSON input') !== -1) {
        return new Response(
          JSON.stringify({
            errors: [{ message: 'requisição deve conter um body' }],
          }),
          { status: 400 },
        );
      }
    }

    return new Response(null, { status: 500 });
  }
};
