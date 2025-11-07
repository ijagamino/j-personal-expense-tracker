export type EntityKeys<Filters> = {
  all: readonly string[];
  lists: () => readonly unknown[];
  list: (filters?: Filters) => readonly unknown[];
  details: () => readonly unknown[];
  detail: (id: number) => readonly unknown[];
};
