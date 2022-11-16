import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const CurrencyContext = createContext<number>(0);

export const CurrencyProvider = (props: PropsWithChildren) => {
  const [currency, setCurrency] = useState<number>(0);

  useEffect(() => {
    setCurrency(Math.round((Math.random() * 30 + 50) * 100) / 100);

    const timer = setInterval(() => {
      setCurrency(Math.round((Math.random() * 30 + 50) * 100) / 100);
    }, 20000);

    return () => {
      clearInterval(timer);
    }
  }, []);

  return (
    <CurrencyContext.Provider value={currency} {...props} />
  )
}