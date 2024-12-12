import { NextRequest } from 'next/server';
import { clientRepository } from 'src/models/client';
import { Client } from 'src/models/client/Client';

export const POST = async (req: Request) => {
  const user = await req.json();

  try {
    const client = new Client(user);

    await clientRepository.create({ name: client.name, phone: client.phone });

    return new Response(null, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ error: { message: error.message } }),
        { status: 400 },
      );
    }

    return new Response(null, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const page = +searchParams.get('page') || 1;
  const peerPage = +searchParams.get('peer_page') || 10;

  if (!clientRepository.validatePeerPage(peerPage)) {
    return new Response(
      JSON.stringify({
        error: { message: 'O limite máximo de clientes é 100' },
      }),
      {
        status: 400,
      },
    );
  }

  const clients = await clientRepository.paginate(page, peerPage);
  return Response.json(clients);
};
