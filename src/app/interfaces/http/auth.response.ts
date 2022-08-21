export interface AuthResponse {
  access_token: string | null;
  errors?: Error[];
  expires_in?: Number;
  message?: string;
  object?: any;
}
