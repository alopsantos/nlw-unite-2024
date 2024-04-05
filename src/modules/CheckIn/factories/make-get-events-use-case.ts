import { PrismaCheckInRepository } from "../infra/prisma/repositories/prisma.checkin.repository";
import { CheckInGetUseCase } from "../use-case/get-checkin";

export function makeCheckInGetUseCase() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const checkInGetUseCase = new CheckInGetUseCase(prismaCheckInRepository);

  return checkInGetUseCase;
}
