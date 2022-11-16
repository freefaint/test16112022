import React, { Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styles from '../components/styles.module.css';
import { CartContext } from '../context/cart';
import { CatalogContext } from '../context/catalog';
import { CurrencyContext } from '../context/currency';
import { Product } from '../types/types';

export const Products = () => {
  const { catalog } = useContext(CatalogContext);

  return (
    <div className={styles.products}>
      <>
        <h1>Каталог</h1>

        {catalog?.map(i => (
          <Fragment key={i.name}>
            <h2>{i.name}</h2>

            {i.products.map(i => (
              <Item key={i.name} {...i} />
            ))}
          </Fragment>
        ))}
      </>
    </div>
  );
}

const Item = ({ name, price, id }: Product) => {
  const { cart, set } = useContext(CartContext);
  const currency = useContext(CurrencyContext);

  const [cost, setCost] = useState<number>();
  const [grow, setGrow] = useState<boolean>();

  useEffect(() => {
    setCost(old => {
      const fresh = currency * price;

      if (old) {
        setGrow(old < fresh);
      }

      return currency * price;
    });
  }, [currency, price]);

  const inCart = useMemo(() => {
    return !!cart.find(i => i.product === id);
  }, [cart, id]);

  const handleToggleCart = useCallback(() => {
    set({ product: id });
  }, [id, set]);

  const priceStr = useMemo(() => {
    const str = cost?.toString();

    return str?.indexOf('.') !== -1 ? str?.slice(0, str?.indexOf('.') + 3) : str;
  }, [cost]);

  return (
    <div className={styles.product}>
      <h3>{name} <span className={grow ? styles.red : styles.green}><>{priceStr} руб</></span></h3>
      <button onClick={handleToggleCart}>{!inCart ? 'Добавить в корзину' : 'Удалить из корзины'}</button>
    </div>
  );
}