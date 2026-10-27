import React, { createContext,useEffect, useMemo, useState, useContext } from "react";
import { fetchInventory, updateProducts, fetchSizeTemplates, addNewProduct } from "../api/productsApi.js";

const InventoryContext = createContext(null);

export function InventoryProvider({children}) {
    const [models, setModels] = useState([]);
    const [products, setProducts] = useState([]);
    const [sizeTemplates, setSizeTemplates] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        fetchInventory()
            .then(data => {    
                setModels(data.models);
                setProducts(data.products);
                setLoading(false);   
            })
            .catch(err => {
                console.error("Nie udało się załadować danych:", err);
                setLoading(false);
            });
    }, []);

    useEffect(()=> {
        fetchSizeTemplates()
            .then(data => {
                setSizeTemplates(data.size_templates);
                setProductTypes(data.product_types);
            })
            .catch(err => {
                console.error("Nie udało się zaladowac danych", err);
            })
    })

    const groupedProducts = useMemo(() => {
        return models.map(model => ({
        ...model,
        categories: JSON.parse(model.categories || '[]'),
        variants: products.filter(p => p.model_id === model.id)
        }));
    }, [models, products]);

    const allProducts = useMemo(() => {
        const modelsByID = Object.fromEntries(models.map(m => [m.id, m]));
        return products.map(product => ({
            ...product,
            name: modelsByID[product.module_id]?.name || "Unknown product",
            imageUrl: modelsByID[product.module_id]?.imageUrl || '',
            categories: modelsByID[product.module_id]?.categories || [],
        }));
    }, [models, products])

    const allSizeTemplates = useMemo(() => {
        return {sizeTemplates, productTypes}
    }, [sizeTemplates, productTypes])

    const processProductsChange = async (scannedItems) => {
        try {
            const response = await updateProducts(scannedItems);
            setProducts(prevProducts => {
                return prevProducts.map(prod => {
                    const changeQty = scannedItems[prod.id];
                    if (changeQty !== undefined && changeQty !== null) {
                        return { 
                            ...prod, 
                            count: Math.max(0, prod.count + changeQty) 
                        };
                    }
                    return prod;
                    });
            });
            
            return response;

        } catch (error) {
            alert("Błąd sprzedaży: " + error.message);
            return false;
        }
    }

    const processNewProductAdd = async (name, desc, type, imageData, categories, sizesBarcode) => {
        try {
            const cleanedSizesBarcode = Object.fromEntries(
                Object.entries(sizesBarcode).map(([size, barcode]) => [
                    size, 
                    barcode.trim() === "" ? null : barcode
                ])
            );
            console.log(cleanedSizesBarcode);
            
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', desc);
            formData.append('type', type);
            formData.append('image', imageData);
            formData.append('categories', categories)
            formData.append('sizesBarcode', cleanedSizesBarcode)

            const response = await addNewProduct(formData);
            return response;
        } catch (error) {
            console.log("Błąd sprzedaży: " + error.message);
            
            return false;
        }
    }
    

    return (
        <InventoryContext.Provider value={{groupedProducts, allProducts, allSizeTemplates, processProductsChange, processNewProductAdd,loading}}>
            {children}
        </InventoryContext.Provider>
    )

}

export function useInventory() {
  return useContext(InventoryContext);
}