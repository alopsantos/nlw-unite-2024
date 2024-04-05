import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "lib/prisma";
import { makeCheckInRegisterUseCase } from "@modules/CheckIn/factories/make-register-events-use-case";

export async function registerCheckIn(
  request: FastifyRequest,
  replay: FastifyReply
) {
  const createEventSchema = z.object({
    attendeeId: z.coerce.number().int().positive().nullable()
  });
  const { attendeeId } = createEventSchema.parse(request.params);
  console.log(attendeeId);
  const attendeeCheckIn = await prisma.event.findUnique({
    where: { attendees: attendeeId }
  });

  if (attendeeCheckIn) {
    throw new Error("Another event with same title already exists");
  }

  try {
    const registerCheckInUseCase = makeCheckInRegisterUseCase();
    await registerCheckInUseCase.execute({
      attendeeId
    });
    return replay.status(201).send();
  } catch (error) {
    // return replay.status(409).send({ message: error });
    console.log(error);
  }
}
