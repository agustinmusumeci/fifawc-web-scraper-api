import teamsRepository from "../repositories/teamsRepository.js";

class TeamsController {
  async getTeams(teamsNames) {
    const teams = await teamsRepository.getTeams(teamsNames);

    return teams;
  }
}

export default new TeamsController();
