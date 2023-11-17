// import libs
import React from 'react';

// import material ui
import { Box, Container, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

// third-party
import Slider from 'react-slick';

// import projects
import ProductCardItem from '@ecommerce-frontend/src/application/journey/layouts/client/Content/components/CardProductItem';
import TimerCountDown from '@ecommerce-frontend/src/application/widgets/timer';
import { SortProductServiceImpl } from '@ecommerce-frontend/src/domain/services/product/sort';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';

// ==============================|| PRODUCTS CARD SECTION ||============================== //

const ProductCardSection = () => {
    /** init hooks */
    const theme = useTheme();
    const [itemsToShow, setItemsToShow] = React.useState(5);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));
    const matchUpXL = useMediaQuery(theme.breakpoints.up('xl'));

    /** init setting */
    const settings = {
        dots: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '0px',
        slidesToShow: itemsToShow,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true
    };

    /** useEffect */
    React.useEffect(() => {
        if (matchDownSM) {
            setItemsToShow(1);
            return;
        }
        if (matchDownMD) {
            setItemsToShow(3);
            return;
        }
        if (matchDownLG) {
            setItemsToShow(3);
            return;
        }
        if (matchDownXL) {
            setItemsToShow(5);
            return;
        }
        if (matchUpXL) {
            setItemsToShow(5);
        }
    }, [matchDownSM, matchDownMD, matchDownLG, matchDownXL, matchUpXL, itemsToShow]);

    // get product sort discount
    const { productSort } = useSelector((state) => state.product);
    React.useEffect(() => {
        const service = new SortProductServiceImpl();
        const res = service.execute();
    }, []);

    return (
        <>
            <Container sx={{ mb: 4 }}>
                <Stack spacing={0.25} sx={{ mx: 2.0 }} alignItems='center'>
                    <Typography variant='h2' align='center' sx={{ fontSize: { xs: '1.25rem', sm: '1.75rem' } }}>
                        🔥 Hot Deal Today
                    </Typography>
                </Stack>
                <TimerCountDown />
            </Container>

            <Container>
                <Box
                    sx={{
                        '.slick-track': {
                            display: { xs: 'flex', xl: 'inherit' }
                        },
                        '& .slick-dots': {
                            position: 'initial',
                            mt: 2,
                            '& li button:before': {
                                fontSize: '0.75rem'
                            },
                            '& li.slick-active button:before': {
                                opacity: 1,
                                color: 'primary.main'
                            }
                        }
                    }}
                >
                    <Slider {...settings}>
                        {Object.values(productSort).length &&
                            Object.values(productSort).map((item: ProductModel, index: number) => {
                                return (
                                    <Box key={index} sx={{ p: 1.5 }}>
                                        <ProductCardItem
                                            item={item}
                                            image={
                                                item?.product?.images[
                                                    Math.floor(Math.random() * item?.product?.images.length)
                                                ]
                                            }
                                            name={item?.product?.name}
                                            offerPrice={(item?.price * (1 - item?.discount / 100)).toFixed(2)}
                                            salePrice={item?.price}
                                            soldOut={item?.totalSold}
                                            totalProduct={item?.totalQty + item?.totalSold}
                                        />
                                    </Box>
                                );
                            })}
                    </Slider>
                </Box>
            </Container>
        </>
    );
};

export default ProductCardSection;
