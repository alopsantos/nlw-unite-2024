import { IEventsRepository } from "@modules/Events/repositories/events.repository";
import { Prisma, Event } from "@prisma/client";
import { prisma } from "lib/prisma";

export class PrismaEventsRepository implements IEventsRepository {
  async findById(eventId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        details: true,
        slug: true,
        maximumAttendees: true,
        _count: { select: { attendees: true } }
      }
    });
    return event;
  }
  async create(data: Prisma.EventCreateInput) {
    const event = await prisma.event.create({
      data
    });
    return event;
  }
  async save(data: Event): Promise<Event> {
    const event = await prisma.event.update({
      where: { id: data.id },
      data
    });
    return event;
  }
  async deleteById(eventId: string): Promise<void> {
    await prisma.event.delete({
      where: { id: eventId }
    });
  }
}
