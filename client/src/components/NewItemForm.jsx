import { useState, useEffect } from 'react';



export default function AddForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSizeGroup, setSelectedSizeGroup] = useState(null);
  const [sizes, setSizes] = useState({});
  const [prname, setName] = useState("Nazwa");
  const [desc, setDesc] = useState("Opis");
  const [imageFile, setImageFile] = useState(null); 
  const [itemType, setItemType] = useState(null)


  function handleType(cat){
    
  }
  


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
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <h2>Dodaj koszulkę</h2>

      <input name="name" value={prname} onChange={(e) => setName(e.target.value)} required />
      <input name="description" value={desc} onChange={(e) => setDesc(e.target.value)} />

      <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />

      <select onChange={(e) => {
        const cat = categories.find(c => c.name === e.target.value);
        setSelectedCategory(cat);
        setItemType(cat.kind)
        setSelectedSizeGroup(null);
      }}>
        <option value="">-- Wybierz kategorię --</option>
        {categories.map(c => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>

      {selectedCategory?.type && ( // jest multiple (tylko multiple ma type)
        <select onChange={(e) => {
          const sizesObj = selectedCategory.type.find(el => el.name === e.target.value);
          setSelectedSizeGroup(sizesObj);
          const sizesAr = sizesObj.sizes;
          const newSizes = sizesAr.reduce((acc, size) => {
            acc[size] = 0;
            return acc;
          }, {});
          setSizes(newSizes);
        }}>
          <option value="">-- Wybierz grupę rozmiarową --</option>
          {selectedCategory.type.map(sizeGroup => (
            <option key={sizeGroup.name} value={sizeGroup.name}>{sizeGroup.name}</option>
          ))}
        </select>
      )}

      <br /><br />
      <button type="submit">Dodaj</button>
    </form>
  );
}
