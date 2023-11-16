import SequelizeUserModel from '../database/models/SequelizeUserModel';
import IUser from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUserModel;

  async findByEmail(emailP: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email: emailP } });
    if (!user) return null;

    const { id, email, username, password, role } = user;
    return { id, email, username, password, role };
  }
}
