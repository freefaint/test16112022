import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styles from '../components/styles.module.css';
import globalStyles from '../styles/Home.module.css';
import { CartContext } from '../context/cart';
import { CurrencyContext } from '../context/currency';
import { Product } from '../types/types';
import { CatalogContext } from '../context/catalog';



const getPrice = (price:  number) => {
  const str = price.toString();

  return str?.indexOf('.') !== -1 ? str?.slice(0, str?.indexOf('.') + 3) : str;
};

export const Cart = () => {
  const { cart, set } = useContext(CartContext);
  const { all } = useContext(CatalogContext);

  const currency = useContext(CurrencyContext);

  const total = useMemo(() => {
    return cart.reduce((coll, item) => {
      const product = all.find(j => j.id === item.product)!;

      return coll + (product.price * item.count);
    }, 0);
  }, [all, cart]);

  const totalStr = useMemo(() => {
    return getPrice(total) + ' руб';
  }, [total]);

  return cart.length ? (
    <div className={styles.cart}>
      <h1> Корзина</h1>

      {cart.map(i => {
        const item = all.find(j => j.id === i.product)!;

        return (
          <Item key={i.product} item={item} count={i.count} />
        );
      })}

      <h3>
        {`Итого: ${totalStr}`}
      </h3>
    </div>
  ) : null;
}

const Item = ({ item: { name, price, count: countAll, id }, count }: { item: Product, count: number }) => {
  const { set } = useContext(CartContext);
  const currency = useContext(CurrencyContext);

  const priceStr = useMemo(() => {
    return getPrice(currency * count * price) + ' руб';
  }, [count, currency, price]);


  const handlePlus = useCallback(() => {
    set({ product: id, count: count + 1 });
  }, [count, id, set]);

  const handleMinus = useCallback(() => {
    set({ product: id, count: count - 1 });
  }, [count, id, set]);

  const handleRemove = useCallback(() => {
    set({ product: id, count: 0 });
  }, [id, set]);

  return (
    <div className={styles.product}>
      <h3>{name} <span><>{priceStr} </></span></h3>

      <div className={globalStyles.columns}>
        <button onClick={handleMinus}>-</button>{count} шт<button onClick={handlePlus} disabled={count >= countAll}>+</button>
      </div>

      <button onClick={handleRemove}>Удалить</button>
    </div>
  );
}