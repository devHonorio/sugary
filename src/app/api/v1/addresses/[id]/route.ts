import { AddressNotFound } from 'src/errors/addresses';
import { addressRepository } from 'src/models/address';

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


export const DELETE = async(_req, { params }: Params) => {
  try {

      await addressRepository.delete(params.id)

  } catch(error)  {
    if (error instanceof AddressNotFound) {
     

      return new Response(null, { status: 404 });
    }

    return new Response(null, { status: 500 });
  }
  

  return new Response(null, { status: 204 });
} 