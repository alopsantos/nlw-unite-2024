import { CheckIn } from "@prisma/client";
import { ICheckInRepository } from "../repositories/ICheckIn.repository";

interface ICheckInRegisterUseCase {
  attendeeId: number;
}
interface ICheckInRegisterUseCaseResponse {
  checkin: CheckIn;
}
export class CheckInRegisterUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({
    attendeeId
  }: ICheckInRegisterUseCase): Promise<ICheckInRegisterUseCaseResponse> {
    const checkin = await this.checkInRepository.create({
      attendeeId
    });

    return { checkin };
  }
}
