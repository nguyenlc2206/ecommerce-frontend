// import libs
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Fab, Badge, IconButton } from '@mui/material';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: 3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px'
    }
}));

// ==============================|| CART ITEMS - FLOATING BUTTON ||============================== //

const FloatingCart = () => {
    /** init hooks */
    const theme = useTheme();
    const { products, totalQuantity } = useSelector((state) => state.cart.checkout);

    return (
        <Fab
            component={Link}
            to='/checkout'
            size='large'
            sx={{
                boxShadow: theme.customShadows.warning,
                bgcolor: 'warning.main',
                color: 'warning.light',
                borderRadius: '8px',
                '&:hover': {
                    bgcolor: 'warning.dark',
                    color: 'warning.light'
                }
            }}
        >
            <IconButton disableRipple aria-label='cart' sx={{ '&:hover': { bgcolor: 'transparent' } }} size='large'>
                <StyledBadge showZero badgeContent={totalQuantity} color='error'>
                    <ShoppingCartTwoToneIcon sx={{ color: 'grey.900' }} />
                </StyledBadge>
            </IconButton>
        </Fab>
    );
};

export default FloatingCart;
