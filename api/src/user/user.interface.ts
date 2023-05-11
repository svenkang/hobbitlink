export const USERNAME_MAX_CHAR = 512;

export enum UserLog {
  DUPLICATE = 'The requested username already exists.',
  NOT_FOUND = 'The requested user could not be found.',
  CREATE_FAILED = 'The requested user could not be created.',
  UPDATE_FAILED = 'The requested user could not be updated.',
  DELETE_FAILED = 'The requested user could not be deleted.',
}

export enum UserTier {
  BASIC = 'basic',
  PRO = 'pro',
  SUPER = 'super',
}
