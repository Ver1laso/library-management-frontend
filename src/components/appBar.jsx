import { AppBar, Typography, Container, Toolbar, Box } from '@mui/material';
import Mybooks from '@mui/icons-material/MenuBookOutlined';
import LibraryBook from '@mui/icons-material/LibraryBooksOutlined';
import SearchBook from '@mui/icons-material/TravelExploreOutlined';
import BorrowedBooks from '@mui/icons-material/GroupsOutlined';
import UserSettings from '@mui/icons-material/PermIdentityOutlined';
import { Link as RouterLink } from 'react-router-dom'


const NavItem = ({ icon, text, href }) => {
    return(
      <Box
          component={RouterLink}
          to={href}
          sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 3,
              color: 'white',
              textDecoration: 'none',
              '&:hover': {
                  opacity: 0.8,
              },
          }}
          >
              <Box sx={{ mr: 1, display: 'flex' }}>
                  {icon}
              </Box>
              <Typography
                  variant="h6"
                  noWrap
                  sx={{
                      fontWeight: 700,
                      fontSize: '16px',
                  }}
              >
                  {text}
              </Typography>
          </Box>
    )
};

const MobileNavItem = ({ icon, href }) => {
    return (
      <Box
          component={RouterLink}
          to={href}
          sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textDecoration: 'none',
              padding: 1,
              '&:hover': {
                  opacity: 0.8,
              }
          }}
      >
          {icon}
      </Box>
    )
}

const CustomAppBar = () => {
    return (
    <AppBar position='fixed' color='primary'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Parte izquierda - Navegación principal */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center',
            flexGrow: 1 
          }}>
            <NavItem icon={<Mybooks />} text="Mis Libros" href="/MyBooks" />
            <NavItem icon={<SearchBook />} text="Búsqueda de libros" href="/BookSearch" />
            <NavItem icon={<LibraryBook />} text="Mi librería" href="/MyLibrary" />
            <NavItem icon={<BorrowedBooks />} text="Préstamos" href="/Loans" />
          </Box>

          {/* Parte móvil - Navegación principal */}
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            alignItems: 'center', 
            flexGrow: 1,
            justifyContent: 'space-around'
          }}>
            <MobileNavItem icon={<Mybooks />} href="/MyBooks" />
            <MobileNavItem icon={<SearchBook />} href="/BookSearch" />
            <MobileNavItem icon={<LibraryBook />} href="/MyLibrary" />
            <MobileNavItem icon={<BorrowedBooks />} href="/Loans" />
            <MobileNavItem icon={<UserSettings />} href="/user" />
          </Box>

          {/* Parte derecha - Usuario (solo desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavItem icon={<UserSettings />} text="Usuario" href="/user" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomAppBar;