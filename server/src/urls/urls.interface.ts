export const HOBBIT_LINK_MIN_CHAR = 1;
export const HOBBIT_LINK_DEFAULT_CHAR = 7;
export const HOBBIT_LINK_MAX_CHAR = 256;

export interface CreateHobbitResponse {
  url: string;
  hobbitLink: string;
}

export interface SaveUrlRequest {
  url: string;
  hobbitLink: string;
  expiresAt?: Date;
  clicks?: number;
  active?: boolean;
}
