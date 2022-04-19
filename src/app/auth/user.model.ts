export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token(): string | null {
    //some logic here
    // if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
    //   return null;
    // }

    return this._token;
  }
}
