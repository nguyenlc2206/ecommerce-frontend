// import libs
import React from 'react';

// import material ui
import { Box, Container, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

// third-party
import Slider from 'react-slick';

// import projects
import ProductCardItem from '@ecommerce-frontend/src/application/journey/layouts/client/Content/components/CardProductItem';
import TimerCountDown from '@ecommerce-frontend/src/application/widgets/timer';

// ==============================|| PRODUCTS CARD SECTION ||============================== //

const ProductCardSection = () => {
    /** init hooks */
    const theme = useTheme();
    const [itemsToShow, setItemsToShow] = React.useState(2);
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
        arrows: false
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
            setItemsToShow(4);
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
                        <Box sx={{ p: 1.5 }}>
                            <ProductCardItem
                                key={1}
                                id={1}
                                image={
                                    'https://res.cloudinary.com/dybi8swhy/image/upload/v1698934565/ImagesCommon/prod-3_nbkq5p.jpg'
                                }
                                name={'Name Product'}
                                offerPrice={1}
                                salePrice={1}
                                soldOut={1}
                            />
                        </Box>
                        <Box sx={{ p: 1.5 }}>
                            <ProductCardItem
                                key={1}
                                id={1}
                                image={
                                    'https://res.cloudinary.com/dybi8swhy/image/upload/v1698934560/ImagesCommon/prod-6_bqg0e1.jpg'
                                }
                                name={'Name Product'}
                                offerPrice={1}
                                salePrice={1}
                                soldOut={1}
                            />
                        </Box>
                        <Box sx={{ p: 1.5 }}>
                            <ProductCardItem
                                key={1}
                                id={1}
                                image={
                                    'https://res.cloudinary.com/dybi8swhy/image/upload/v1698934560/ImagesCommon/prod-6_bqg0e1.jpg'
                                }
                                name={'Name Product'}
                                offerPrice={1}
                                salePrice={1}
                                soldOut={1}
                            />
                        </Box>
                        <Box sx={{ p: 1.5 }}>
                            <ProductCardItem
                                key={1}
                                id={1}
                                image={
                                    'https://res.cloudinary.com/dybi8swhy/image/upload/v1698934560/ImagesCommon/prod-6_bqg0e1.jpg'
                                }
                                name={'Name Product'}
                                offerPrice={1}
                                salePrice={1}
                                soldOut={1}
                            />
                        </Box>
                        <Box sx={{ p: 1.5 }}>
                            <ProductCardItem
                                key={1}
                                id={1}
                                image={
                                    'https://res.cloudinary.com/dybi8swhy/image/upload/v1698934560/ImagesCommon/prod-6_bqg0e1.jpg'
                                }
                                name={'Name Product'}
                                offerPrice={1}
                                salePrice={1}
                                soldOut={1}
                            />
                        </Box>
                        <Box sx={{ p: 1.5 }}>
                            <ProductCardItem
                                key={1}
                                id={1}
                                image={
                                    'https://res.cloudinary.com/dybi8swhy/image/upload/v1698934560/ImagesCommon/prod-6_bqg0e1.jpg'
                                }
                                name={'Name Product'}
                                offerPrice={1}
                                salePrice={1}
                                soldOut={1}
                            />
                        </Box>
                    </Slider>
                </Box>
            </Container>
        </>
    );
};

export default ProductCardSection;
