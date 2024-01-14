export type User = {
  email: string;
  password?: string;
  username?: string;
  jobTitle?: string;
};

export type Character = {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string;
}
