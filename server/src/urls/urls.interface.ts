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
