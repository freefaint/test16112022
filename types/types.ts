
export type Data = {
  name: string
}

export type CartElement = {
  product: number;
  count: number;
}

export type CartElementRequest = Pick<CartElement, 'product'> & Partial<CartElement>;

export type Cart = CartElement[];

export type Product = {
  id: number;
  name: string;
  price: number;
  count: number;
}

export type Group = {
  id: number;
  name: string;
  products: Product[];
}

export type Catalog = { catalog: Group[], all: Product[] };
