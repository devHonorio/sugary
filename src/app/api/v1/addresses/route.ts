import { NextRequest } from 'next/server';
import { InvalidAddress } from 'src/errors/addresses';
import { addressRepository } from 'src/models/address';
import { Address } from 'src/models/address/Address';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const address = new Address(body);

    await addressRepository.create({
      surname: address.surname,
      street: address.street,
      number: address.number,
      district: address.district,
      city: address.city,
      complement: address.complement,
    });

    return new Response(null, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof InvalidAddress) {
      return new Response(
        JSON.stringify({ error: { message: error.message } }),
        { status: 400 },
      );
    }

    return new Response(
      JSON.stringify({
        error: { message: 'requisição deve conter um body.' },
      }),
      {
        status: 400,
      },
    );
  }
};

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const page = +searchParams.get('page') || 1;
  const peerPage = +searchParams.get('peer_page') || 10;

  if (peerPage > 100)
    return new Response(
      JSON.stringify({
        error: {
          message: 'Endereços por pagina deve ser menor ou igual a 100.',
        },
      }),
      { status: 400 },
    );

  const paginated = await addressRepository.paginate(page, peerPage);

  return Response.json(paginated);
};
