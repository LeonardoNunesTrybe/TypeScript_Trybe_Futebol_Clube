import { ILeaderBoard } from '../Interfaces/ILeaderBoard';
import { IMatch } from '../Interfaces/IMatch';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

export default class LeaderBoardModel {
  constructor(
    private teamModel = SequelizeTeamModel,
    private matchModel = SequelizeMatchModel,
  ) {}

  async findByFinished() {
    const matches = await this.matchModel.findAll();
    const finished = matches.filter((match: IMatch) => !match.inProgress);
    return finished;
  }

  async getTeams() {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  async getHomeTable(): Promise<ILeaderBoard[]> {
    const allTeams = await this.getTeams();
    const finishedMatches = await this.findByFinished();
    const leaderBoard = await Promise.all(allTeams.map(async (team) => {
      const teamMatches = finishedMatches.filter((match) => match.homeTeamId === team.id);
      const wins = teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
      const draws = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
      const losses = teamMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);

      return { name: team.teamName,
        totalPoints: wins.length * 3 + draws.length,
        totalGames: teamMatches.length,
        totalVictories: wins.length,
        totalDraws: draws.length,
        totalLosses: losses.length,
        goalsFavor: teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0),
        goalsOwn: teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0),
      } as ILeaderBoard;
    }));
    return leaderBoard;
  }
}
