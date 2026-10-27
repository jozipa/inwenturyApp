import { useEffect, useRef } from 'react';
import Input from '@mui/joy/Input';

export default function FilterItems({ onSearch }) {
  const debounceRef = useRef(null);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  const handleChange = (val) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(val), 300);
    console.log(val);
  };

  return (
    <Input
      color="neutral"
      placeholder="Search"
      size="lg"
      variant="outlined"
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}