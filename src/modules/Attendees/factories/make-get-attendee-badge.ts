import { PrismaAttendeeRepository } from "../infra/prisma/repositories/prisma.attendees.repository";
import { AttendeeGetBadgeUseCase } from "../use-cases/get-attendee-badge";

export function makeAttendeeGetBadgeUseCase() {
  const prismaAttendeeRepository = new PrismaAttendeeRepository();
  const attendeesGetBadgeUseCase = new AttendeeGetBadgeUseCase(
    prismaAttendeeRepository
  );

  return attendeesGetBadgeUseCase;
}
