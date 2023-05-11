export const ENCRYPTION_ALGORITHM = 'sha256';
export const DIGEST_STRATEGY = 'hex';

export const PASSWORD_MIN_LOWER_CASE = 1;
export const PASSWORD_MIN_UPPER_CASE = 1;
export const PASSWORD_MIN_NUMERALS = 1;
export const PASSWORD_MIN_SPECIAL_CHAR = 1;
export const PASSWORD_MIN_CHAR = 8;
export const PASSWORD_MAX_CHAR = 256;
export const PASSWORD_KEY_MAX_CHAR = 16;

export const PASSWORD_REGEXP = new RegExp(
  `^(?=(.*[a-z]){${PASSWORD_MIN_LOWER_CASE},})(?=(.*[A-Z]){${PASSWORD_MIN_UPPER_CASE},})(?=(.*[0-9]){${PASSWORD_MIN_NUMERALS},})(?=(.*[\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\-\\_\\+\\.\\,\\?\\/\\[\\]\\\`\\~\\<\\>\\:\\;\\"\\'\\\\]){${PASSWORD_MIN_SPECIAL_CHAR},}).{${PASSWORD_MIN_CHAR},}$`,
);

export interface Hmac {
  hash: string;
  key: string;
}
