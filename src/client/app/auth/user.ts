export class User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public username: string,
    public confirm_password: string
  ) { }
}
