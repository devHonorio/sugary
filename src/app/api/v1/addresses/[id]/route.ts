import { AddressNotFound } from 'src/errors/addresses';
import { addressRepository } from 'src/models/address';
import { Address } from 'src/models/address/Address';

interface Params {
  params: { id: string };
}
export const GET = async (_req, { params }: Params) => {
  const address = await addressRepository.findById(params.id);

  if (!address) {
    return new Response(null, { status: 404 });
  }
  return Response.json(address);
};

export const DELETE = async (_req, { params }: Params) => {
  try {
    await addressRepository.delete(params.id);
  } catch (error) {
    if (error instanceof AddressNotFound) {
      return new Response(null, { status: 404 });
    }

    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 204 });
};

export const PATCH = async (req: Request, { params }: Params) => {
  try {
    const body = await req.json();

    const addressReq = new Address(body);

    await addressRepository.update({
      id: params.id,
      surname: addressReq.surname,
      street: addressReq.street,
      number: addressReq.number,
      district: addressReq.district,
      city: addressReq.city,
      complement: addressReq.complement,
    });

    return Response.json(null, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return new Response(null, { status: 400 });
    }

    if (error instanceof AddressNotFound) {
      return new Response(null, { status: 404 });
    }

    return new Response(null, { status: 500 });
  }
};
