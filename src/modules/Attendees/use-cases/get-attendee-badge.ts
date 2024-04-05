import { Attendee } from "@prisma/client";
import { IAttendeesRepository } from "../repositories/IAttendees.repository";

interface IAttendeeGetBadgeUseCase {
  attendeeId: number;
}
interface IAttendeeGetBadgeUseCaseResponse {
  attendees: Attendee;
}
export class AttendeeGetBadgeUseCase {
  constructor(private attendeesRepository: IAttendeesRepository) {}

  async execute({
    attendeeId
  }: IAttendeeGetBadgeUseCase): Promise<IAttendeeGetBadgeUseCaseResponse> {
    const attendees = await this.attendeesRepository.findById(attendeeId);

    if (!attendees) {
      throw new Error("Nenhum evento encontrado");
    }

    return { attendees };
  }
}
