export interface Item {
  id: string;
  title: string;
  price: ItemPrice;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity?: number;
  description?: string;
}

export interface ItemPrice {
  currency: string;
  amount: number;
  decimals: number;
}

export interface GetItemResponse {
  status: number;
  payload: {
    author: {
      name: string
      lastname: string
    };
    categories: Array<string>;
    items: Array<Item>;
  }
}

export interface GetItemDescriptionResponse {
  status: number;
  payload: {
    author: {
      name: string;
      lastname: string;
    };
    item: Item
  };
}
