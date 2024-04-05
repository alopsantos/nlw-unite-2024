import { PrismaEventsRepository } from "../infra/prisma/repositories/prisma.events.repository";
import { EventsRegisterUseCase } from "../use-cases/register";

export function makeEventsForRegisterUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository();
  const eventsRegisterUseCase = new EventsRegisterUseCase(
    prismaEventsRepository
  );

  return eventsRegisterUseCase;
}
