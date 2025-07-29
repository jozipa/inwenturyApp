import { useState, useEffect } from 'react';
import Item from './components/Item.jsx'
import AddForm from './components/NewItemForm.jsx';
import FilterItems from './components/FilterItems.jsx';


function App() {
  const [allItems, setAllItems] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/items')
      .then(res => res.json())
      .then(data => {
        setAllItems(data);
        setItems(data)
      });
  }, []);



  
  function filteredItems(itm){
    setItems(itm)
  }

    return (
       <div>
        <FilterItems its={allItems} onDelay={filteredItems}></FilterItems>
        {items.map((item) => (  
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.imageUrl}
            sizes={item.sizes}
          />
          
        ))}
        <AddForm/>
    </div>
  );
}

export default App;