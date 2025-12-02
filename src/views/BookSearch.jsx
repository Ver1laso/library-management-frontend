import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import ItemSearch from '../components/itemSearch';
import TextFieldWithNames from '../components/textFieldWithNames';
import LanguageSelector from '../components/languageSelector';
import libraryServices from '../services/libraryServices';
import SaveIcon from '@mui/icons-material/SaveAltOutlined';
import SearchBookIcon from '@mui/icons-material/Search';

function BookSearch() {
    const [books, setBooks] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [searchCriteria, setSearchCriteria] = useState({
    isbn: "",
    title: "",
    author: "",
    language: "",
    searchType: null
    })

    const handleCriteriaChange = (field, value) => {
        setSearchCriteria(prev => ({
        ...prev,
        [field]: value,
        searchType: field !== 'language' ? field : prev.searchType
        }))
   }

    const handleSearch = () => {
        if(searchCriteria.searchType === 'isbn' && searchCriteria.isbn) {
            searchBookByIsbn()
        } else if (searchCriteria.searchType === 'title' && searchCriteria.title) {
            searchBookByTitle()
        } else if (searchCriteria.searchType === 'author' && searchCriteria.author) {
            searchBookByAuthor()
        } else {
            if(searchCriteria.isbn){
            searchBookByIsbn()
            } else if (searchCriteria.title) {
            searchBookByTitle()
            } else if (searchCriteria.author) {
            searchBookByAuthor()
            } else {
            setErrorMessage("Por favor, introduce 1 tipo de busqueda")
            }
        }
    }

    const saveBook = (id) => {
      const book = books.find(b => b.id === id)
      console.log(book);

      if(book){
        libraryServices.saveSelectedBook(book)
        .then(savedBook => {
          console.log("Book saved successfully", savedBook);
          alert("Libro guardado exitosamente");
        })
        .catch(error => {
          console.error("Error saving book: ", error);
          alert("Error al guardar el libro")
        })
      }
    }

    const columns = [
        {
          field: 'image',
          headerName: 'Image',
          width: 100,
          renderCell: (params) => (
            <img 
              src={params.value} 
              alt="book" 
              width="50" 
              style={{ cursor: 'pointer'}}
              onClick={()=> setSelectedImage(params.value)}
              />
          )
        },
        { field: 'title', headerName: 'Titulo', width: 200 },
        { field: 'author', headerName: 'Autor', width: 150 },
        { field: 'isbn10', headerName: 'ISBN_10', width: 130 },
        { field: 'isbn13', headerName: 'ISBN_13', width: 140 },
        { 
          field: 'description', 
          headerName: 'Descripcion', 
          width: 400,
          renderCell: (params) => (
            <Tooltip 
              title={params.value} 
              arrow 
              placement='bottom-start'
              >
              <span style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                placement: 'bottom'
              }}>
                {params.value}
              </span>
            </Tooltip>
          )},
          { field: 'save', 
            headerName: 'Save', 
            width: 100,
            renderCell: (params) => (
              <Button variant='contained' size='small' endIcon={<SaveIcon />} onClick={() => saveBook(params.row.id)}>Save</Button>
            ) 
          }

    ]

    const processBookData = (data) => {
        return data.items.map((item, index) => ({
          id: index,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors?.join(', ') || 'N/A',
          isbn10: item.volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier || 'N/A',
          isbn13: item.volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || 'N/A',
          description: item.volumeInfo.description?.substring(0, 500) || 'Sin descripcion',
          image: item.volumeInfo.imageLinks?.thumbnail || null
        }))
    }

    const searchBookByIsbn = () => {
    libraryServices.getBookByISBN(searchCriteria.isbn)
        .then(data => {
        console.log("Datos del libro by ISBN: ", data)
        setBooks(processBookData(data))
        setSearchCriteria(prev => ({ ...prev, isbn: ""}))
        })
        .catch(error => {
        console.error("Error con el ISBN: ", error)
        })
    }

    const searchBookByTitle = () => {
    libraryServices.getBookByTitle(searchCriteria.title, searchCriteria.language)
        .then(data => {
        console.log("Datos del libro by Titulo: ", data)
        setBooks(processBookData(data))
        setSearchCriteria(prev => ({ ...prev, title: ""}))
        })
        .catch(error => {
        console.error("Error con el titulo: ", error)
        })
    }

    const searchBookByAuthor = () => {
    libraryServices.getBookByAuthor(searchCriteria.author)
        .then(data => {
        console.log("Datos del libro by Autor: ", data)
        setBooks(processBookData(data))
        setSearchCriteria(prev => ({ ...prev, author: ""}))
        })
        .catch(error => {
        console.error("Error con el Autor del libro", error)
        })
    }


    return (
      <>
        <Box sx={{ mt: 8, display: 'flex', flexDirection:'column', gap: 2 }}>
        <h3>Búsqueda de Libros</h3>
        <Box sx={{ 
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap' }}>
        
          <ItemSearch>
            <Box sx={{ display: 'flex', alignItems: 'center', gap:1 }}>
              <TextFieldWithNames
                label="ISBN"
                value={searchCriteria.isbn}
                onChange={(e) => handleCriteriaChange('isbn', e.target.value)}
                onFocus={() => handleCriteriaChange('searchType', 'isbn')}
                />
            </Box>
          </ItemSearch>
          
          <ItemSearch>
            <Box sx={{ display: 'flex', alignItems: 'center', gap:1 }}>
              <TextFieldWithNames
                label="Title"
                value={searchCriteria.title}
                onChange={(e) => handleCriteriaChange('title', e.target.value)}
                onFocus={() => handleCriteriaChange('searchType', 'title')}
              />
            </Box>
          </ItemSearch>
          
          <ItemSearch>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextFieldWithNames
                label="Author"
                value={searchCriteria.author}
                onChange={(e) => handleCriteriaChange('author', e.target.value)}
                onFocus={() => handleCriteriaChange('searchType', 'author')}
              />
            </Box>
          </ItemSearch>
          
          <ItemSearch>
            <LanguageSelector
              value={searchCriteria.language}
              onChange={(e) => handleCriteriaChange('language', e.target.value)}
            />
          </ItemSearch>
          
          <Button 
            size='large' variant='outlined'   endIcon={<SearchBookIcon />} onClick={handleSearch} 
            sx={{ 
                  minWidth: 120, 
                  border: '1px solid',
                  borderColor: 'primary.main',
                  fontSize: '0.975rem',
                  // fontWeight: '700',
                  borderRadius: 1,
                  variant: 'outlined'
                  }}
            >
          Buscar
          </Button>
        </Box>
        
        {books.length > 0 && (
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={books}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5},
                  }
                }}
                pageSizeOptions={[5, 10 ,25]}
                slotProps={{
                  cell: {
                    style: { position: 'relative'}
                  }
                }}
                sx={{
                  '& .MuiDataGrid-row:hover': {
                      backgroundColor: '#f0f0f0', // Color al hacer hover
                    }
                }}
              />
            </Box>
        )}
        </Box>
        {selectedImage && (
          <Box
            onClick={() => setSelectedImage(null)}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
              cursor: 'pointer'
            }}
          >
          <img
            src={selectedImage}
            alt='book enlarged'
            style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
            />
          </Box>
        )}
      </>
    )


}

export default BookSearch;