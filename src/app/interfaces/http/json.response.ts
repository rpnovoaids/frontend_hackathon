export interface JsonResponse {
  access_token?: string | null;
  errors?: Error[];
  expires_in?: Number;
  message?: string;
  object?: any;
}
