import MatchesScraper from "../scrapers/matchesScraper.js";

class MatchesRepository {
  async getMatches(matchesDates) {
    const scraper = new MatchesScraper();

    const matches = await scraper.scrape("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures?wtw-filter=ALL", ".match-row_matchRowContainer__NoCRI", {
      matchesDates: matchesDates,
    });

    return matches;
  }
}

export default new MatchesRepository();
