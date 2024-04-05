import { PrismaCheckInRepository } from "../infra/prisma/repositories/prisma.checkin.repository";
import { CheckInRegisterUseCase } from "../use-case/register-checkin";

export function makeCheckInRegisterUseCase() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const checkInRegisterUseCase = new CheckInRegisterUseCase(
    prismaCheckInRepository
  );

  return checkInRegisterUseCase;
}
