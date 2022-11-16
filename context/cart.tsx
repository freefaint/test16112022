import axios from "axios";
import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Cart, CartElementRequest } from "../types/types";

type ICartContext = { cart: Cart, set: (data: CartElementRequest) => void };

export const CartContext = createContext<ICartContext>({ cart: [], set: () => void 0 });

export const CartProvider = (props: PropsWithChildren) => {
  const [cart, setCart] = useState<Cart>([]);

  useEffect(() => {
    axios.get('/api/cart').then(resp => setCart(resp.data));
  }, []);

  const set = useCallback((data: CartElementRequest) => {
    axios.post('/api/cart', data).then(resp => {
      setCart(resp.data);
    });
  }, []);

  return (
    <CartContext.Provider value={{ cart, set }} {...props} />
  )
}