// import material ui
import { useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// import projects
import AppBar from '@ecommerce-frontend/src/application/journey/layouts/client/Header/components/Appbar';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import OrdersList from '@ecommerce-frontend/src/application/journey/admin/pages/orders/OrdersList';

// custom style
const HeaderWrapper = styled('div')(({ theme }) => ({
    overflowX: 'hidden',
    overflowY: 'clip',
    background: `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`,
    [theme.breakpoints.down('md')]: {}
}));

const SectionWrapper = styled('div')({
    paddingTop: 120,
    paddingBottom: 100,
    minHeight: '93.75vh'
});

// ==============================|| ORDERS CLIENT PAGE ||============================== //

const OrdersClientPage = () => {
    // init theme
    const theme = useTheme();
    // init variables
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <>
            {/* Header */}
            <HeaderWrapper id='home'>
                <AppBar />
            </HeaderWrapper>
            <SectionWrapper sx={{ bgcolor: 'grey.100', paddingX: matchDownMD ? 3 : 20 }}>
                <MainCard>
                    <OrdersList />
                </MainCard>
            </SectionWrapper>
        </>
    );
};

export default OrdersClientPage;
