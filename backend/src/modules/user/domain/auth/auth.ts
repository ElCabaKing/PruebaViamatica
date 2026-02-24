export class AuthDto {
  public readonly criteria: string|number;
  public readonly password: string;


  private constructor(
    criteria: string|number,
    password: string,

  ) {
    this.criteria = criteria;
    this.password = password;
  }

  static create(
    criteria: string|number,
    password: string,

  ) {

    return new AuthDto(
      criteria,
      password,
    );
  }
}