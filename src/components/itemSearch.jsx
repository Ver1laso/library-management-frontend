import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

function ItemSearch(props){

    const { sx, ...other } = props;

    return(
        <Box
            sx={[
                (theme) => ({
                    bgcolor: '#242424',
                    color: 'grey.800',
                    p: 1,
                    m: 1,
                    borderRadius: 2,
                    fontSize: '0.975rem',
                    fontWeight: '700',
                    ...theme.applyStyles('dark', {
                        bgcolor: '#101010',
                        color: 'grey.300',
                        borderColor: 'grey.800',
                    }),
                }),
                ...(Array.isArray(sx) ? sx: [sx]),
            ]}
            {...other}
        
        />
    )
}

ItemSearch.propTypes = {
    
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

export default ItemSearch;