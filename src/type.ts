export type Homeworld = {
    name: string;
  };
  
  export type Species = {
    name: string;
  };
  
  export type Film = {
    title: string;
  };
  
  export type FilmConnection = {
    films: Film[];
  };
  
  export type Node = {
    id: string;
    name: string;
    height: number;
    homeworld: Homeworld;
    species: Species[];
    gender: string;
    eyeColor: string;
    filmConnection: FilmConnection;
  };

export type FilterConditions = {
    gender: string;
    film: string;
    eyeColor: string[];
    species: string[];
  };