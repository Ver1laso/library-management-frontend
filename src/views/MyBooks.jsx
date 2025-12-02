import { Box, Typography } from '@mui/material'

function MyBooks() {
    return (
    <Box sx={{ mt: 8, p: 2 }}>
      <Typography variant="h4">Mis Libros</Typography>
      <Typography>Aquí irán tus libros personales</Typography>
    </Box>
    );
}

export default MyBooks;