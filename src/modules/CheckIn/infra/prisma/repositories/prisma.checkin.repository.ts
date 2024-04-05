import { ICheckInRepository } from "@modules/CheckIn/repositories/ICheckIn.repository";
import { CheckIn, Prisma } from "@prisma/client";
import { prisma } from "lib/prisma";

export class PrismaCheckInRepository implements ICheckInRepository {
  async findById(checkInId: number) {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id: checkInId }
    });
    return checkIn;
  }
  async create(attendeeId: number) {
    const checkIn = await prisma.checkIn.create({
      data: { attendeeId }
    });
    return checkIn;
  }
  async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: { id: data.id },
      data
    });
    return checkIn;
  }
  async delete(checkInId: number): Promise<void> {
    await prisma.checkIn.delete({
      where: { id: checkInId }
    });
  }
}
