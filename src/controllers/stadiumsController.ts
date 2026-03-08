import stadiumsRepository from "../repositories/stadiumsRepository.js";

class StadiumsControllers {
  async getStadiums(): Promise<Array<{ name: string }>> {
    const stadiums: Array<{ stadium: string }> = await stadiumsRepository.getStadiums();

    const hashStadiums: Set<string> = new Set();

    const nonRepeatingStadiums: Array<{ name: string }> = [];

    stadiums.forEach((stadium: { stadium: string }) => {
      if (!hashStadiums.has(stadium.stadium)) {
        nonRepeatingStadiums.push({ name: stadium?.stadium });
        hashStadiums.add(stadium.stadium);
      }
    });

    console.log(nonRepeatingStadiums);
    return nonRepeatingStadiums;
  }
}

export default new StadiumsControllers();
