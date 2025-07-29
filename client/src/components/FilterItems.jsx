import { useEffect, useState } from 'react';


export default function FilterItems({ its, onDelay }) {
  const [filteredItems, setItems] = useState();
  

  
  useEffect(() => {
    setItems(its)
  }, [its])
  
  
  const handleChange = (val) => {
    const words = val.toLowerCase().split(" ").filter(w => w.trim() !== "");

    const filtered = its.filter(item => {
      const text = `${item.name} ${item.description} ${item.categories.join(" ")}`.toLowerCase();
      return words.every(word => text.includes(word));
    });
      
    onDelay(filtered)
  };

  return (
    <div>
        <input type='text' placeholder='Search' onChange={(e) => {handleChange(e.target.value)}}></input>
    </div>
  );
}
