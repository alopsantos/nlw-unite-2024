import z from "zod";
import { FastifyInstance } from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { registerCheckIn } from "../controllers/checkin/register";

export async function checkInRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeId/checkin",
    {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int()
        })
      }
    },
    registerCheckIn
  );
}
