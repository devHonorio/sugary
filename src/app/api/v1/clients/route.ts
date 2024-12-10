import { NextRequest } from 'next/server';
import { prismaClient } from 'src/infra/prisma';
import { z } from 'zod';

const schemaClient = z.object({
  name: z
    .string({ errorMap: () => ({ message: 'name é obrigatório' }) })
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(255, 'O nome deve ter no máximo 255 caracteres'),
  phone: z
    .string({ errorMap: () => ({ message: 'phone é obrigatório' }) })
    .min(10, 'O telefone deve ter pelo menos 10 dígitos')
    .max(11, 'O telefone deve ter no máximo 11 dígitos'),
});

export const POST = async (req: Request) => {
  const user = await req.json();

  try {
    const { name, phone } = schemaClient.parse(user);

    await prismaClient.client.create({
      data: {
        name,
        phone,
      },

      select: {
        id: true,
      },
    });

    return new Response(null, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((error) => ({
        message: error.message,
      }));

      return new Response(JSON.stringify({ errors: errorMessages }), {
        status: 400,
      });
    }

    if (error instanceof Error) {
      if (error.message.search('Unique constraint failed') !== -1) {
        return new Response(null, { status: 400 });
      }
    }

    return new Response(null, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const page = +searchParams.get('page') || 1;
  const peerPage = +searchParams.get('peer_page') || 10;

  if (peerPage > 100) {
    return new Response(
      JSON.stringify({
        errors: [{ message: 'O limite máximo de clientes é 100' }],
      }),
      {
        status: 400,
      },
    );
  }

  const clients = await prismaClient.client.findMany({
    skip: (page - 1) * peerPage,
    take: peerPage,
  });
  return Response.json(clients);
};
