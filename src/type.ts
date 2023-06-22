export type AuthInfo = {
  username?: string;
  email: string;
  password: string;
  [key: string]: string | undefined | null; // Index signature allowing indexing by string
};
