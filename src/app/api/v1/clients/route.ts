import { client } from 'src/infra/prisma';
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

    await client.client.create({
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
    throw error;
  }
};
