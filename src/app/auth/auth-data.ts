export interface AuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expireIn: string;
  localId: string;
  registered?: boolean;
}
