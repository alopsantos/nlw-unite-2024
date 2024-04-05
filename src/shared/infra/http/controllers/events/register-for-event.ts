import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "lib/prisma";

export async function registerForEvent(
  request: FastifyRequest,
  replay: FastifyReply
) {
  const createRegisterForEventSchema = z.object({
    name: z.string().min(4),
    email: z.string().email()
  });
  const createRegisterForEventParamsSchema = z.object({
    eventId: z.string().uuid()
  });

  const { eventId } = createRegisterForEventParamsSchema.parse(request.params);
  const { name, email } = createRegisterForEventSchema.parse(request.body);

  const attendeeFromEmail = await prisma.attendee.findUnique({
    where: {
      eventId_email: {
        email,
        eventId
      }
    }
  });

  if (attendeeFromEmail) {
    throw new Error("This e-mail is already registered for this event.");
  }
  const [event, amountOfAttendeesForEvent] = await Promise.all([
    prisma.event.findUnique({ where: { id: eventId } }),

    prisma.attendee.count({
      where: {
        eventId
      }
    })
  ]);

  if (
    event?.maximumAttendees &&
    amountOfAttendeesForEvent >= event.maximumAttendees
  ) {
    throw new Error(
      "O maximo de participantes para esse evento foi atingido, aguarde pelo proximo evento!"
    );
  }
  const attendee = await prisma.attendee.create({
    data: {
      name,
      email,
      eventId
    }
  });

  return replay.status(201).send({ attendeeId: attendee.id });
}
