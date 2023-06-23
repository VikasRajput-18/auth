export type AuthInfo = {
  username?: string;
  email: string;
  password?: string;
  [key: string]: string | undefined | null; // Index signature allowing indexing by string
};

export type UserData = {
  _id: string;
  name: string;
  trips: number;
  airline: {
    _id: string;
    id: number;
    name: string;
    country: string;
    logo: string;
    slogan: string;
    head_quaters: string;
    website: string;
    established: string;
    __v: number;
  }[];
  __v: number;
};
