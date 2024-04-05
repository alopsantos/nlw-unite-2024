import { makeAttendeeGetBadgeUseCase } from "@modules/Attendees/factories/make-get-attendee-badge";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getAttendeeBadge(
  request: FastifyRequest,
  replay: FastifyReply
) {
  const getAttendeeBadge = z.object({
    attendeeId: z.coerce.number().int()
  });
  const { attendeeId } = getAttendeeBadge.parse(request.params);

  try {
    const getAttendeeBadgeUseCase = makeAttendeeGetBadgeUseCase();
    const { attendees } = await getAttendeeBadgeUseCase.execute({
      attendeeId
    });

    if (!attendees) {
      throw new Error("Nenhum attendees econtrado com esse id.");
    }

    const baseUrl = `${request.protocol}://${request.hostname}`;
    const checkInUrl = new URL(`/attendee/${attendeeId}/check-in/`, baseUrl);

    return replay.status(200).send({
      badge: {
        name: attendees.name,
        email: attendees.email,
        eventTitle: attendees.event.title,
        checkInURL: checkInUrl.toString()
      }
    });
  } catch (error) {
    console.log(error);
  }
}
