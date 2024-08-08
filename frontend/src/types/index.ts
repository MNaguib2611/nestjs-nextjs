export interface Movie {
  id: number;
  title: string;
  publishingYear: number;
  poster?: string;
}

export interface MovieFormValues {
  title: string;
  publishingYear: number;
  poster?: string;
}
