import { Attendee, Prisma } from "@prisma/client";

export interface IAttendeesRepository {
  findById(attendeeId: number): Promise<Attendee | null>;
  create(data: Prisma.AttendeeCreateInput): Promise<Attendee | null>;
  save(attendee: Prisma.AttendeeUpdateInput): Promise<Attendee>;
  delete(attendeeId: number): Promise<void>;
}
