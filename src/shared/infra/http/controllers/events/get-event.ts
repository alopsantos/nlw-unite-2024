import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeEventsGetUseCase } from "@modules/Events/factories/make-get-events-use-case";

export async function getEvent(request: FastifyRequest, replay: FastifyReply) {
  const getEventSchema = z.object({
    eventId: z.string().uuid()
  });
  const { eventId } = getEventSchema.parse(request.params);

  try {
    const getEventUseCase = makeEventsGetUseCase();
    const { events } = await getEventUseCase.execute({ eventId });

    if (!events) {
      throw new Error("Nenhum evento econtrado com esse id");
    }

    return replay.status(200).send({
      event: {
        id: events.id,
        title: events.title,
        slug: events.slug,
        details: events.details,
        maximumAttendees: events.maximumAttendees,
        attendeesAmount: events._count.attendees
      }
    });
  } catch (error) {
    console.log(error);
  }
}
