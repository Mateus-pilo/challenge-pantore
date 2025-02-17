import { UserFunctionEnum } from '../enum/user-function.enum';

export class UserEntity {
  id?: string;
  name: string;
  password: string;
  function: UserFunctionEnum;
  email: string;
}
