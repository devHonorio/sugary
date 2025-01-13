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
