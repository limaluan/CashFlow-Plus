export interface IUserDTO {
  id: number;
  email: string;
  name: string;
  password: string;
}

export interface IUser extends Omit<IUserDTO, 'password'> {}
