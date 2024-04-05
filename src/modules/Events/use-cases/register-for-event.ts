import { Event } from "@prisma/client";
import { IEventsRepository } from "../repositories/events.repository";

interface IEventsRegisterUseCase {
  id?: string;
  title: string;
  details?: string;
  maximumAttendees?: number;
  slug: string;
}
interface IEventsRegisterUseCaseResponse {
  events: Event;
}
export class EventsRegisterUseCase {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute({
    title,
    details,
    maximumAttendees,
    slug
  }: IEventsRegisterUseCase): Promise<IEventsRegisterUseCaseResponse> {
    const events = await this.eventsRepository.create({
      title,
      details,
      maximumAttendees,
      slug
    });
    return { events };
  }
}
