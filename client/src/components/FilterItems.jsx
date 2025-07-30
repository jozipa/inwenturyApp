import { useEffect, useRef, useState } from 'react';
import Input from '@mui/joy/Input';

export default function FilterItems({ its, onDelay }) {
  const [filteredItems, setItems] = useState();
  const debounceRef = useRef(null); 

  useEffect(() => {
    setItems(its);
  }, [its]);

  const handleChange = (val) => {

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const words = val.toLowerCase().split(' ').filter((w) => w.trim() !== '');

      const filtered = its.filter((item) => {
        const text = `${item.name} ${item.description} ${item.categories.join(' ')}`.toLowerCase();
        return words.every((word) => text.includes(word));
      });

      onDelay(filtered);
    }, 300);
  };

  return (
    <div>
      <Input
        color="neutral"
        placeholder="Search"
        size="lg"
        variant="outlined"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}