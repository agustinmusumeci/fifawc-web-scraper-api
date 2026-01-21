import groupsRepository from "../repositories/groupsRepository.js";

class GroupsController {
  async getGroups(groupsNames) {
    const groups = await groupsRepository.getGroups(groupsNames);

    return groups;
  }
}

export default new GroupsController();
