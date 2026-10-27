import { useState, useEffect } from 'react';
import { useInventory } from '../context/inventoryContext.jsx';
import { useSnackbar } from '../context/snackBarContext';

import { Box, Input, Button, Select, Option, Typography, Table, Sheet } from '@mui/joy';




export default function AddItemPage() {
  const {allSizeTemplates, processNewProductAdd} = useInventory();
  const {showSnackbar} = useSnackbar();

  const [prname, setName] = useState("Nazwa");
  const [desc, setDesc] = useState("Opis");
  const [imageFile, setImageFile] = useState(null); 
  const [productType, setProductType] = useState(null);
  const [sizeTemplate, setSizeTemplate] = useState([]);

  const [barcodesMap, setBarcodesMap] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const status = await processNewProductAdd(prname, desc, "multiple", imageFile, [productType.name], barcodesMap)
    if (status){
      showSnackbar(`Pomyślnie dodano przedmiot ${prname}`)
    } else {
      showSnackbar(`Nie udało się dodać przedmiotu ${prname}`, 'danger')
    }
  };

  const handleTypeChange = (value) => {
    const cat = allSizeTemplates.productTypes.find(c => c.name === value);
    if (cat){
      setProductType(cat);
      const sizesObj = allSizeTemplates.sizeTemplates.find(c => c.id == cat.size_template_id);
      if (sizesObj){
        const sizeArray = JSON.parse(sizesObj.sizes);
        setSizeTemplate(sizeArray);        

        const initBarcodeObject = {}
        for (let i = 0; i<sizeArray.length; i++){
          initBarcodeObject[sizeArray[i]] = '';
        }
        setBarcodesMap(initBarcodeObject);
      }
    } else {
      setSizeTemplate(null);
      setBarcodesMap({});
    } 
  }

  const handleBarcodeChange = (size, value) => {
    setBarcodesMap(prev => ({
      ...prev,
      [size]: value
    }))
  }
  
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
            <Typography level="h4" mb={2}>Dodaj nowy produkt</Typography>

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
            onChange={(e, value) => handleTypeChange(value)}
            sx={{ mb: 2 }}
            >

            <Option value="">-- Wybierz kategorię --</Option>
            {allSizeTemplates.productTypes.map(c => (
                <Option key={c.id} value={c.name}>{c.name}</Option>
            ))}
            </Select>

            <Sheet variant="soft" sx={{ p: 2, mb: 2, borderRadius: 'sm', height: 300, overflow: 'auto' }}>
            <Typography level="title-sm" mb={1}>
              Konfiguracja kodów kreskowych dla rozmiarów:
            </Typography>
            
            <Table aria-label="tabela rozmiarów" stickyHeader>
              <thead>
                <tr>
                  <th>Rozmiar</th>
                  <th>Kod kreskowy (EAN)</th>
                </tr>
              </thead>
              <tbody>
                {sizeTemplate.map(size => (
                  <tr key={size}>
                    <td><strong>{size}</strong></td>
                    <td>
                      <Input
                        size="sm"
                        placeholder={`Wpisz kod dla ${size}`}
                        value={barcodesMap[size] || ''}
                        onChange={(e) => handleBarcodeChange(size, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>

          <Button type="submit" variant="solid">Dodaj</Button>
        </form>
    </Box>
  );
}