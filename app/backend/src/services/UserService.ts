import * as bcrypt from 'bcryptjs';
import JWT from '../utils/JWT';
import IUser from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
import { IToken } from '../Interfaces/IToken';
import { IRole } from '../Interfaces/IRole';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) {}

  static invalidMessage = 'Invalid email or password';

  public async findByEmail(data: IUser): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: UserService.invalidMessage },
      };
    }
    if (!bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: UserService.invalidMessage },
      };
    }
    const { email } = user as IUser;
    const token = this.jwtService.sign({ email });
    return { status: 'SUCCESSFULL', data: { token } };
  }

  public async roleLogin(data: IUser): Promise<ServiceResponse<ServiceMessage | IRole>> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: UserService.invalidMessage },
      };
    }
    const { role } = user as IUser;

    return { status: 'SUCCESSFULL', data: { role } };
  }
}
