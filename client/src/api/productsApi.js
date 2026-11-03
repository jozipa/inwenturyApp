const API_URL = 'http://localhost:3001/api';


// ------------------------------------ getters -----------------------------------------------
export async function fetchInventory(){
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) throw new Error('Błąd pobierania bazy produktów');
    return await response.json();
}

export async function fetchSizeTemplates(){
    const response = await fetch(`${API_URL}/products/size_templates`);

    if (!response.ok) throw new Error('Błąd pobierania bazy rozmiarów');
    return await response.json();
};


export async function fetchReceipts(){
    const response = await fetch(`${API_URL}/receipts`);

    if (!response.ok) throw new Error('Błąd pobierania bazy rozmiarów');
    const response_parsed =  await response.json();
    
    return response_parsed.map(element => ({
        ...element,
        items: JSON.parse(element.items || '[]'),
    }));
}

// ------------------------------------ updaters -----------------------------------------------
export async function updateProducts(scannedItems){
    console.log(JSON.stringify({scannedItems}));
    
    const response = await fetch(`${API_URL}/products/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({scannedItems}),
    });

    if (!response.ok) throw new Error('Błąd zatwierdzania paragonu');
    return await response.json();
}

export async function updateProductsFromCart(scannedItems){
    const response = await fetch(`${API_URL}/products/cart`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({scannedItems}),
    });
    if (!response.ok) throw new Error('Błąd zatwierdzania paragonu');
    return await response.json();
}

// ------------------------------------ adders -----------------------------------------------

export async function addNewProduct(product){

    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        body: product,
    });
    if (!response.ok) throw new Error('Błąd zatwierdzania paragonu');
    return await response.json();
}

export async function handleReceipt(scannedItems){
    console.log(scannedItems);
    
    const response = await fetch(`${API_URL}/receipts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scannedItems),
    });
    if (!response.ok) throw new Error('Błąd zatwierdzania paragonu');
    return await response.json();
}