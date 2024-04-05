import { CheckIn } from "@prisma/client";
import { ICheckInRepository } from "../repositories/ICheckIn.repository";

interface ICheckInGetUseCase {
  checkIn: number;
}

interface ICheckInGetUseCaseResponse {
  checkin: CheckIn;
}
export class CheckInGetUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({
    checkIn
  }: ICheckInGetUseCase): Promise<ICheckInGetUseCaseResponse> {
    const checkin = await this.checkInRepository.findById(checkIn);

    if (!checkin) {
      throw new Error("Nenhum checkIn encontrado");
    }

    return { checkin };
  }
}
