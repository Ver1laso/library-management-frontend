import { useState } from 'react'
import { Box, Button, Menu } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


export default function LanguageSelector({ value, onChange }) {
    // return(
    //     <FormControl sx={{ 
    //             minWidth: 120, 
    //             border: '1px solid',
    //             borderColor: 'primary.main',
    //             fontSize: '0.975rem',
    //             fontWeight: '700',
    //             borderRadius: 2,
    //             variant: 'outlined'
    //             }}>
    //         <InputLabel sx={{
    //             color: 'primary.main',
    //             alignItems: 'center',
    //             flexWrap: 'wrap' ,
    //             display: 'flex',
    //             // fontWeight: '700',
    //             // transform: 'translate(14px, 12px) scale(1)'
    //             '&.Mui-focused': {
    //                 color: 'primary.main'
    //             }
    //             }}
    //             >
    //             Idioma
    //         </InputLabel>
    //         <Select
    //             value={value}
    //             label="Idioma"
    //             onChange={onChange}
    //             size='small'
    //             sx={{
    //                 color: '#ffffff', // Texto en blanco
    //                 '& .MuiSelect-icon': {
    //                     color: '#ffffff', // Flecha en blanco
    //                 }
    //             }}
    //         >
    //             <MenuItem value="">Todos</MenuItem>
    //             <MenuItem value="es">Español</MenuItem>
    //             <MenuItem value="en">English</MenuItem>
    //             {/* <MenuItem value="fr">Français</MenuItem>
    //             <MenuItem value="de">Deutsch</MenuItem>
    //             <MenuItem value="it">Italiano</MenuItem>
    //             <MenuItem value="pt">Português</MenuItem>
    //             <MenuItem value="ja">日本語</MenuItem>
    //             <MenuItem value="zh-CN">中文</MenuItem>
    //             <MenuItem value="ru">Русский</MenuItem> */}
    //         </Select>
    //     </FormControl>
    // )
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectLanguage = (selectedValue) => {
        onChange({ target: {value: selectedValue }});
        handleClose();
    }

    return (
        <div>
            <Button
                sx={{ 
                minWidth: 120, 
                border: '1px solid',
                borderColor: 'primary.main',
                fontSize: '0.975rem',
                // fontWeight: '700',
                borderRadius: 1,
                variant: 'outlined'
                }}
                id="idioma-button"
                aria-controls={open ? 'idioma-button' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
            Idioma {value && `(${value})`}
            </Button>
            <Menu
                id='idioma-menu'
                aria-labelledby='idioma-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <MenuItem value="" onClick={()=> handleSelectLanguage('')}>All</MenuItem>
                <MenuItem value="Español" onClick={()=> handleSelectLanguage('es')}>Español</MenuItem>
                <MenuItem value="Ingles" onClick={()=> handleSelectLanguage('en')}>Ingles</MenuItem>
            </Menu>
        </div>
    )
}