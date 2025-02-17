import { UserFunctionEnum } from '../enum/user-function.enum';

export class UserEntity {
  name: string;
  password: string;
  function: UserFunctionEnum;
  email: string;
}
