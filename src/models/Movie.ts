export default interface Movie {
  id: string;
  title: string;
  poster: string;
  overview: string;
  release_date: Date;
  genres: string[];
};