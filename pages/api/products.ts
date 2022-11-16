import type { NextApiRequest, NextApiResponse } from 'next'

import * as productGroups from '../../data/names.json';
import * as productsJson from '../../data/products.json';

import { Catalog } from '../../types/types';

const productsData = productsJson.Value.Goods;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const data = Object.keys(productGroups).filter(i => i !== 'default').map(key => {
      const group = productGroups[key as keyof typeof productGroups];
      const products = group.B;

      return {
        id: parseInt(key),
        name: group.G,

        products: Object.keys(products).map(pKey => {
          const id = parseInt(pKey);
          const product = products[pKey as keyof typeof products] as Record<string, string>;
          const data = productsData.find(i => i.T === id);
          
          return {
            id,
            name: product?.N,
            price: data?.C ?? 0,
            count: data?.P ?? 0,
          }
        }).filter(i => !!i.count)
      }
    }).filter(i => i.products.length);

    res.status(200).json(data);
  } catch (e) {
    res.status(400).json(e);
  }
}
