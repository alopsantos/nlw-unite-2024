import z from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getAttendeeBadge } from "../controllers/attendee/get-attendee-badge";

export async function attendeesRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeId/badge",
    {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int()
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url()
            })
          })
        }
      }
    },
    getAttendeeBadge
  );
}
