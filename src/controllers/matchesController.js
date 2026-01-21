import matchesRepository from "../repositories/matchesRepository.js";

class MatchesControllers {
  async getMatches(matchesDates) {
    const matches = await matchesRepository.getMatches(matchesDates);

    return matches;
  }
}

export default new MatchesControllers();
