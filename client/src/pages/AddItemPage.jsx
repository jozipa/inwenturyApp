import { useState, useEffect } from 'react';

import { Box, Input, Button, Select, Option, Typography } from '@mui/joy';




export default function AddItemPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSizeGroup, setSelectedSizeGroup] = useState(null);
  const [sizes, setSizes] = useState({});
  const [prname, setName] = useState("Nazwa");
  const [desc, setDesc] = useState("Opis");
  const [imageFile, setImageFile] = useState(null); 
  const [itemType, setItemType] = useState(null)


  useEffect(() => {
    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let categories = []
    categories.push(selectedCategory.name)
    if (selectedSizeGroup) {
      categories.push(selectedSizeGroup.name)
    }


    const formData = new FormData(); // 👈 to ważne
    formData.append('name', prname);
    formData.append('description', desc);
    formData.append('type', itemType);
    formData.append('categories', categories);

    if(itemType=="multiple"){
      formData.append('count', JSON.stringify(sizes)); // rozmiary jako JSON
    } else {
      formData.append('count', JSON.stringify({ilość: 0}))
    }
    
    if (imageFile) {
      formData.append('image', imageFile); // 👈 dodajesz obrazek
    }

    fetch('http://localhost:3001/api/items', {
      method: 'POST',
      body: formData, // 👈 nie dodajesz Content-Type, browser sam to zrobi
    })
      .then(res => res.json())
      .then(data => console.log('Dodano:', data));
  };

  return (
    <Box
        sx={{
            display: 'flex',
            p: 2,
            bgcolor: '#f5f7fa',
            height: 'calc(100vh - 70px)',
            border: '1px solid',
            borderColor: 'divider',
        }}
        >
        <form onSubmit={handleSubmit}>
            <Typography level="h4" mb={2}>Dodaj koszulkę</Typography>

            <Input
            name="name"
            placeholder="Nazwa"
            value={prname}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ mb: 2 }}
            />

            <Input
            name="description"
            placeholder="Opis"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            sx={{ mb: 2 }}
            />

            <Input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files[0])}
            sx={{ mb: 2 }}
            />

            <Select
            placeholder="Wybierz kategorię"
            onChange={(e, value) => {
                const cat = categories.find(c => c.name === value);
                setSelectedCategory(cat);
                setItemType(cat?.kind);
                setSelectedSizeGroup(null);
            }}
            sx={{ mb: 2 }}
            >
            <Option value="">-- Wybierz kategorię --</Option>
            {categories.map(c => (
                <Option key={c.id} value={c.name}>{c.name}</Option>
            ))}
            </Select>

            {selectedCategory?.type && (
            <Select
                placeholder="Wybierz grupę rozmiarową"
                onChange={(e, value) => {
                const sizesObj = selectedCategory.type.find(el => el.name === value);
                setSelectedSizeGroup(sizesObj);
                const sizesAr = sizesObj.sizes;
                const newSizes = sizesAr.reduce((acc, size) => {
                    acc[size] = 0;
                    return acc;
                }, {});
                setSizes(newSizes);
                }}
                sx={{ mb: 2 }}
            >
                <Option value="">-- Wybierz grupę rozmiarową --</Option>
                {selectedCategory.type.map(sizeGroup => (
                <Option key={sizeGroup.name} value={sizeGroup.name}>{sizeGroup.name}</Option>
                ))}
            </Select>
            )}

            <Button type="submit" variant="solid">Dodaj</Button>
        </form>
    </Box>
  );
}