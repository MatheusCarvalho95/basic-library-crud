import { UserRoles } from 'src/users/users.enuns';

export interface IAuthPayload {
  name: string;
  sub: string;
  role: UserRoles;
}
