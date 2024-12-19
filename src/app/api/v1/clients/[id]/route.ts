import { ClientNotFound } from 'src/errors/client/repository';
import { clientRepository } from 'src/models/client';
import { Client } from 'src/models/client/Client';

interface Params {
  params: { id: string };
}

export const DELETE = async (_req, { params }: Params) => {
  try {
    await clientRepository.delete(params.id);

    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 404 });
  }
};

export const GET = async (_req, { params }: Params) => {
  try {
    const response = await clientRepository.findById(params.id);

    if (!response) {
      return new Response(null, { status: 404 });
    }
    return Response.json(response);
  } catch {
    return new Response(null, { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: Params) => {
  try {
    const data = await req.json();

    const client = new Client({
      name: data.name,
      phone: data.phone,
      id: params.id,
    });

    await clientRepository.update({
      name: client.name,
      phone: client.phone,
      id: client.id,
    });

    return Response.json(null, { status: 200 });
  } catch (error) {
    if (error instanceof ClientNotFound)
      return new Response(null, { status: 404 });

    if (error.message.search('Unexpected end of JSON input') !== -1) {
      return new Response(
        JSON.stringify({
          error: { message: 'requisição deve conter um body' },
        }),
        { status: 400 },
      );
    }

    return new Response(null, { status: 500 });
  }
};
