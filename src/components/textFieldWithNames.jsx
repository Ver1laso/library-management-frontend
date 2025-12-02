import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';

export default function TextFieldWithNames({value, onChange, label}) {

    return (
        <TextField
        label={label}
        value={value}
        onChange={onChange}
        size="small"
        variant="outlined"
        sx={{
            '& .MuiInputBase-input': {
                color: 'white'
            },
            '& .MuiInputLabel-root': {
            color: 'primary.main', 
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: 'primary.main',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'primary.main', // Borde cuando NO está seleccionado
                },
                '&:hover fieldset': {
                    borderColor: 'primary.light', // Borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'primary.main', // Borde cuando está seleccionado
                },
            }
        }}
        />
    );


}