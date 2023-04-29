interface Resource {
  _id: string;
  createdAt: string;
  updatedAt: string;
  createdById?: string;
  updatedById?: string;
}

export interface Palette extends Resource {
  accountId: string;
  libraryId?: string;
  colors: {
    key: string;
    rgb: string;
    hex: string;
  }[];
}

export interface Variable extends Resource {
  accountId: string;
  key: string;
  value: string;
  libraryId?: string;
}

export interface Style extends Resource {
  libraryId: string;
  accountId: string;
  component: string;
  variants: {
    name: string;
    styles: Record<string, any>;
  }[];
}
