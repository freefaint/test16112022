import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Catalog, Product } from "../types/types";

export const CatalogContext = createContext<Catalog>({ catalog: [], all: [] });

export const CatalogProvider = (props: PropsWithChildren) => {
  const [catalog, setCatalog] = useState<Catalog['catalog']>([]);
  const [all, setAll] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('/api/products').then(resp => {
      setCatalog(resp.data);
    });
  }, []);

  useEffect(() => {
    setAll(catalog.reduce((coll, item) => {
      return [...coll, ...item.products];
    }, [] as Product[]));
  }, [catalog]);

  console.log(1, catalog, all);

  return (
    <CatalogContext.Provider value={{ catalog, all }} {...props} />
  )
}