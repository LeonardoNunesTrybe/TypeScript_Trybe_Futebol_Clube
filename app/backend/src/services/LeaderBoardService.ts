import LeaderBoardModel from '../models/LeaderBoardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderBoard } from '../Interfaces/ILeaderBoard';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel:
    LeaderBoardModel = new LeaderBoardModel(),
  ) { }

  async getHomeTable(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const leaderBoard = await this.leaderBoardModel.getHomeTable();
    const completeLeaderBoard = leaderBoard.map((team) => (
      {
        ...team,
        goalsBalance: team.goalsFavor - team.goalsOwn,
        efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
      }));
    const sortedLeaderBoard = completeLeaderBoard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) { return b.totalPoints - a.totalPoints; }
      if (a.totalVictories !== b.totalVictories) { return b.totalVictories - a.totalVictories; }
      if (a.goalsBalance !== b.goalsBalance) { return b.goalsBalance - a.goalsBalance; }
      return b.goalsFavor - a.goalsFavor;
    });
    return {
      status: 'SUCCESSFULL',
      data: sortedLeaderBoard,
    };
  }

  async getAwayTable(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const leaderBoard = await this.leaderBoardModel.getAwayTable();
    const completeLeaderBoard = leaderBoard.map((team) => (
      {
        ...team,
        goalsBalance: team.goalsOwn - team.goalsFavor,
        efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
      }));
    const sortedLeaderBoard = completeLeaderBoard.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) { return a.totalPoints - b.totalPoints; }
      if (b.totalVictories !== a.totalVictories) { return a.totalVictories - b.totalVictories; }
      if (b.goalsBalance !== a.goalsBalance) { return a.goalsBalance - b.goalsBalance; }
      return b.goalsFavor - a.goalsFavor;
    });
    return {
      status: 'SUCCESSFULL',
      data: sortedLeaderBoard,
    };
  }
}
