export interface BookPage {
  key: number | string;
  label: string;
  quotes: string;
  contents: string[];
  image?: string;
}

export interface YourBook {
  id?: string;
  handle?: string;
  properties: {
    bookColor: string;
    bookPages: BookPage[];
  };
}
