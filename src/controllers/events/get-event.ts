import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function getEvent(request: FastifyRequest, replay: FastifyReply) {
  const getEventSchema = z.object({
    eventId: z.string().uuid(),
  });
  const { eventId } = getEventSchema.parse(request.params);
  const event = await prisma.event.findUnique({
    select: {
      id: true,
      title: true,
      details: true,
      slug: true,
      maximumAttendees: true,
      _count: { select: { attendees: true } },
    },
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error("Nenhum evento econtrado com esse id");
  }

  return replay.send({
    event: {
      id: event.id,
      title: event.title,
      slug: event.slug,
      details: event.details,
      maximumAttendees: event.maximumAttendees,
      attendeesAmount: event._count.attendees,
    },
  });
}
