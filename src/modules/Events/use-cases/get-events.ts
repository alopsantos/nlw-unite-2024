import { IEventsRepository } from "../repositories/events.repository";
import { Event } from "@prisma/client";
interface IEventGetUseCase {
  eventId: string;
}
interface IEventGetUseCaseResponse {
  events: Event;
}
export class EventGetUseCase {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute({
    eventId
  }: IEventGetUseCase): Promise<IEventGetUseCaseResponse> {
    const events = await this.eventsRepository.findById(eventId);

    if (!events) {
      throw new Error("Nenhum evento encontrado");
    }
    return { events };
  }
}
