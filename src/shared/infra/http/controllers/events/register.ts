import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { generateSlug } from "@utils/generate-slug";
import { prisma } from "lib/prisma";
import { makeEventsRegisterUseCase } from "@modules/Events/factories/make-register-events-use-case";

export async function registerEvents(
  request: FastifyRequest,
  replay: FastifyReply
) {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable()
  });
  const { title, details, maximumAttendees } = createEventSchema.parse(
    request.body
  );
  const slug = generateSlug(title);

  const eventWithSameSlug = await prisma.event.findUnique({
    where: { slug }
  });

  if (eventWithSameSlug) {
    throw new Error("Another event with same title already exists");
  }

  try {
    const registerEventsUseCase = makeEventsRegisterUseCase();
    const { events } = await registerEventsUseCase.execute({
      title,
      details,
      maximumAttendees,
      slug
    });
    return replay.status(201).send({ eventId: events.id });
  } catch (error) {
    // return replay.status(409).send({ message: error });
    console.log(error);
  }
}
