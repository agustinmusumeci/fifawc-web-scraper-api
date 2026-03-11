import MatchesScraper from "../scrapers/matchesScraper.js";

class StadiumsRepository {
  async getStadiums(): Promise<Array<{ stadium: string }>> {
    const scraper = new MatchesScraper();

    const matchesData: any = await scraper.scrape(
      "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures?wtw-filter=ALL",
      ".match-row_matchRowContainer__NoCRI",
      {},
      "api.fifa.com/api/v3/calendar/matches",
    );

    const stadiums = matchesData.map((match: any) => ({
      stadium: match?.stadium,
    }));

    return stadiums;
  }
}

export default new StadiumsRepository();
