import { getCookie, setCookies } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Cart, CartElement, CartElementRequest } from '../../types/types';

const getCartData = (connection: { req: NextApiRequest, res: NextApiResponse }): Cart => {
  const cart = getCookie('cart', connection);

  return cart ? JSON.parse(cart as string) : [];
}

const setCartData = (data: CartElementRequest, connection: { req: NextApiRequest, res: NextApiResponse }): Cart => {
  const cart = getCartData(connection);

  const alreadyInCart = cart.find(i => i.product === data.product);
  const isRemoving = alreadyInCart && !data.count;

  const newCart = isRemoving
    ? cart.filter(i => i.product !== data.product)
    : alreadyInCart
      ? cart.map(i => i.product === data.product ? data as CartElement : i)
      : [...cart, { ...data, count: data.count ?? 1 }];

  setCookies('cart', newCart, connection);

  return newCart;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Cart>
) {
  const cart = req.method === 'POST' ? setCartData(req.body, { req, res }) : getCartData({ req, res });

  return res.status(200).json(cart);
}
