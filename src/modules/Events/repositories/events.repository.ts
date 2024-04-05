import { Prisma, Event } from "@prisma/client";

export interface IEventsRepository {
  findById(eventId: string): Promise<Event | null>;
  create(data: Prisma.EventCreateInput): Promise<Event>;
  save(event: Prisma.EventUpdateInput): Promise<Event>;
  deleteById(eventId: string): Promise<void>;
}
