import MatchesScraper from "../scrapers/matchesScraper.js";
import type { Match } from "../types/matches.js";

class MatchesRepository {
  async getMatches(matchesDates: Array<string>): Promise<Array<Match>> {
    const scraper = new MatchesScraper();

    const matches: any = await scraper.scrape(
      "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures?wtw-filter=ALL",
      ".match-row_matchRowContainer__NoCRI",
      {
        matchesDates: matchesDates,
      },
      "api.fifa.com/api/v3/calendar/matches",
    );

    return matches;
  }
}

export default new MatchesRepository();
