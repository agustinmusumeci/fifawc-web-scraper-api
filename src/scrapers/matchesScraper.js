import Scraper from "./scraper.js";

export default class MatchesScraper extends Scraper {
  async extract({ matchesDates = [] }, data) {
    // const matchesData = await this.evaluate((matchesDates) => {
    //   const days = document.querySelectorAll(".col-xl-12.col-lg-12.ff-pb-24");

    //   const months = {
    //     January: 1,
    //     February: 2,
    //     March: 3,
    //     April: 4,
    //     May: 5,
    //     June: 6,
    //     July: 7,
    //     August: 8,
    //     September: 9,
    //     October: 10,
    //     November: 11,
    //     December: 12,
    //   };

    //   const matches = [];

    //   days.forEach((day) => {
    //     const utcDate = day.querySelector(".matches-container_title__ATLsl")?.innerText.trim() ?? null;
    //     const splitedUtcDate = utcDate?.split(" ") ?? null;

    //     if (!utcDate || utcDate.length < 4) return;

    //     const date = splitedUtcDate.at(1) + "/" + String(months[splitedUtcDate.at(2)]).padStart(2, "0") + "/" + splitedUtcDate.at(3);

    //     if (!matchesDates.includes(date) && matchesDates.length > 0) return;

    //     const dayMatches = day.querySelectorAll("a[href*='/match-centre/match']");

    //     dayMatches.forEach((match) => {
    //       const rawTeams = match.querySelectorAll(".match-row_team__y5Rva");
    //       const teams = [];

    //       rawTeams.forEach((team) => {
    //         const teamName = team.querySelector("span")?.innerText ?? "TBD";

    //         teams.push({ team: teamName });
    //       });

    //       const time = match.querySelector(".match-row_matchTime__9QJXJ")?.innerText ?? "00:00";
    //       const stage = match.querySelector(".match-row_bottomLabel__ni63b").innerText ?? "";
    //       const stadium = match.querySelector(".match-row_stadiumCityLabels__zjXUq > span")?.innerText ?? "";
    //       const link = "https://fifa.com" + match.getAttribute("href");
    //       const group = match.querySelector(".match-row_statiumCityWrapper__G8ygZ > .match-row_bottomLabel__ni63b")?.innerText?.split(" ")?.at(1) ?? "";

    //       matches.push({
    //         date: utcDate,
    //         teams: teams,
    //         time: time,
    //         stage: stage,
    //         stadium: stadium,
    //         link: link,
    //         group: group,
    //       });
    //     });
    //   });

    //   return matches;
    // }, matchesDates);

    matchesDates = matchesDates.map((date) => {
      const [day, month, year] = date.split("/");

      const newDate = `${parseInt(day, 10)}/${parseInt(month, 10)}/${year}`;

      return newDate;
    });

    const matches = data?.Results?.map((el) => ({
      fifa_match_id: el?.MatchNumber,
      date: el?.Date,
      stage: el?.StageName?.at(0)?.Description,
      group: el?.GroupName?.at(0)?.Description ?? "No group",
      stadium: el?.Stadium?.Name?.at(0)?.Description,
      link: `https://www.fifa.com/en/match-centre/match/${el?.IdCompetition}/${el?.IdSeason}/${el?.IdStage}/${el?.IdMatch}`,
      teams: [
        {
          name: el?.Home?.ShortClubName ?? el?.PlaceHolderA,
          short_name: el?.Home?.Abbreviation ?? el?.PlaceHolderA,
          goals: el?.HomeTeamScore ?? 0,
        },
        {
          name: el?.Away?.ShortClubName ?? el?.PlaceHolderB,
          short_name: el?.Away?.Abbreviation ?? el?.PlaceHolderB,
          goals: el?.AwayTeamScore ?? 0,
        },
      ],
    })).filter((match) => {
      const date = new Date(match?.date).toLocaleDateString();

      if (matchesDates.length > 0) {
        if (matchesDates.includes(date)) return true;

        return false;
      }

      return true;
    });

    return matches;
  }
}
