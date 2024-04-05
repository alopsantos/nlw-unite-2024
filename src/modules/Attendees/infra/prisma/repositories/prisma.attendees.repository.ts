import { prisma } from "lib/prisma";
import { Prisma } from "@prisma/client";
import { IAttendeesRepository } from "@modules/Attendees/repositories/IAttendees.repository";

export class PrismaAttendeeRepository implements IAttendeesRepository {
  async findById(attendeeId: number) {
    const attendee = await prisma.attendee.findUnique({
      where: { id: attendeeId },
      select: {
        id: true,
        name: true,
        email: true,
        event: {
          select: {
            title: true
          }
        }
      }
    });

    return attendee;
  }
  create(data: Prisma.AttendeeCreateInput): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    eventId: string;
  } | null> {
    throw new Error("Method not implemented.");
  }
  save(attendee: Prisma.AttendeeUpdateInput): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    eventId: string;
  }> {
    throw new Error("Method not implemented.");
  }
  delete(attendeeId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
