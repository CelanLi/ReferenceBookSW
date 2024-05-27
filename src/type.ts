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
    species: Species;
    gender: string;
    eyeColor: string;
  };

export type FilterConditions = {
    gender: string | null;
    eyeColor: string[];
    species: string[];
  };

export type Person = {
    __typename?: "Person" | undefined;
    id: string;
    name?: string | null | undefined;
    height?: number | null | undefined;
    gender?: string |null| undefined;
    eyeColor?: string |null| undefined;
    species?: { name: string } | null|undefined;
    homeworld?: { name: string } | null|undefined;
  } | null | undefined;

  export type PeopleEdge = {
    __typename?: "PeopleEdge" | undefined;
    cursor: string;
    node?: Person | null| undefined;
  };