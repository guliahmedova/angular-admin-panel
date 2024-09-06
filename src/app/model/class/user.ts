export class User {
  email: string;
  name: string;
  password: string;
  role: string;
  avatar: string;
  id?: number;

  constructor() {
    this.id = 0;
    this.email = '';
    this.name = '';
    this.password = '';
    this.role = '';
    this.avatar = '';
  }
}
