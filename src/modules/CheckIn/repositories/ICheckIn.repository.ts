import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInRepository {
  findById(checkInId: number): Promise<CheckIn | null>;
  create(attendeeId: number): Promise<CheckIn>;
  save(checkIn: Prisma.CheckInUpdateInput): Promise<CheckIn>;
  delete(checkInId: number): Promise<void>;
}
