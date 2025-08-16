// types/library.ts
export type Philosopher = {
  id: string;                 // derived from the JSON key (e.g., "Plato")
  era: string;
  tradition: string[];
  core_ideas: string[];
  key_works: string[];
  use_when: string[];
  caveats: string[];
  tags: string[];
};
