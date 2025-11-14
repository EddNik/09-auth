export interface User {
  email: string;
  username: string;
  avatar: string;
}

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export interface CheckSessionRequest {
  success: boolean;
}

export interface UpdateMeRequest {
  email: string;
  username: string;
}
