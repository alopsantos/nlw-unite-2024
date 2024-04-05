import { PrismaEventsRepository } from "../infra/prisma/repositories/prisma.events.repository";
import { EventGetUseCase } from "../use-cases/get-events";

export function makeEventsGetUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository();
  const eventsGetUseCase = new EventGetUseCase(prismaEventsRepository);

  return eventsGetUseCase;
}
