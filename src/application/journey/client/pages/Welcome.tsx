// import libs
import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';

// import project
import AppBar from '@ecommerce-frontend/src/application/journey/layouts/client/Header/components/Appbar';
import HeaderSection from '@ecommerce-frontend/src/application/journey/layouts/client/Header';
import CategoryCardSection from '@ecommerce-frontend/src/application/journey/layouts/client/Content/Category';
import ProductCardSection from '@ecommerce-frontend/src/application/journey/layouts/client/Content/Product';
import ProductPopularSection from '@ecommerce-frontend/src/application/journey/layouts/client/Content/ProductPopular';
import ReviewSection from '@ecommerce-frontend/src/application/journey/layouts/client/Content/Review';
import { GetCartByAccountIdServiceImpl } from '@ecommerce-frontend/src/domain/services/cart/getCartByAccountId';

// custom stlye
const HeaderWrapper = styled('div')(({ theme }) => ({
    overflowX: 'hidden',
    overflowY: 'clip',
    background: `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`,
    [theme.breakpoints.down('md')]: {}
}));

const SectionWrapper = styled('div')({
    paddingTop: 50,
    paddingBottom: 50
});

// ==============================|| WELCOME PAGE ||============================== //

const WelcomePage = () => {
    // useEffect
    React.useEffect(() => {
        const service = new GetCartByAccountIdServiceImpl();
        const res = service.execute();
    });
    return (
        <>
            <HeaderWrapper id='home'>
                <AppBar />
                <HeaderSection />
            </HeaderWrapper>

            <SectionWrapper>
                <CategoryCardSection />
            </SectionWrapper>

            <SectionWrapper sx={{ bgcolor: 'grey.100' }}>
                <ProductCardSection />
            </SectionWrapper>

            <SectionWrapper>
                <ProductPopularSection />
            </SectionWrapper>

            <SectionWrapper sx={{ bgcolor: 'grey.100' }}>
                <ReviewSection />
            </SectionWrapper>
        </>
    );
};

export default WelcomePage;
