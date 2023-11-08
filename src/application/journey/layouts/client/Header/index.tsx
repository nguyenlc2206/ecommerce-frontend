// import lib
import { Link as RouterLink } from 'react-router-dom';

// import material ui
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';
import { Box, Button, CardMedia, Container, Grid, Stack, Typography, useTheme } from '@mui/material';

// third party
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

// assets
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';

// ==============================|| HEADER CLIENT PAGE ||============================== //

export const frameworks = [];

const HeaderSection = () => {
    /** style header */
    const headerSX = { fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem', lg: '3.5rem' } };

    /** init theme */
    const theme = useTheme();
    const navigate = useNavigate();

    /** init setting */
    const settings = {
        dots: false,
        className: 'center',
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        swipeToSlide: true,
        pauseOnHover: true
    };

    return (
        <>
            <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid
                    container
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{ mt: { xs: 10, sm: 0, md: 10.75 }, mb: { xs: 2.5, md: 8 } }}
                >
                    <Grid item xs={12} md={5}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <motion.div
                                    initial={{ opacity: 0, translateY: 550 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                                >
                                    <Stack spacing={1}>
                                        <Typography textAlign={{ xs: 'center', md: 'left' }} variant='h1' sx={headerSX}>
                                            Buy every things
                                        </Typography>
                                        <Typography
                                            textAlign={{ xs: 'center', md: 'left' }}
                                            variant='h1'
                                            color='primary'
                                            sx={headerSX}
                                        >
                                            Pet Shop
                                        </Typography>
                                    </Stack>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: -2.5, textAlign: { xs: 'center', md: 'left' } }}>
                                <motion.div
                                    initial={{ opacity: 0, translateY: 550 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.2 }}
                                >
                                    <Typography
                                        textAlign={{ xs: 'center', md: 'left' }}
                                        color='text.primary'
                                        variant='body1'
                                        sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}
                                    >
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur quod sunt
                                        nulla. Ex corrupti repudiandae fuga nemo, consequuntur harum odit quibusdam
                                        doloremque earum laudantium fugit inventore, architecto aperiam enim
                                        reprehenderit.
                                    </Typography>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12}>
                                <motion.div
                                    initial={{ opacity: 0, translateY: 550 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.4 }}
                                >
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
                                    >
                                        <Grid item>
                                            <AnimateButton>
                                                <Button
                                                    size='large'
                                                    variant='contained'
                                                    color='secondary'
                                                    startIcon={<PlayArrowIcon />}
                                                    onClick={() => navigate('/products')}
                                                >
                                                    Shop now
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Stack sx={{ width: '75%', mb: 5, mx: 'auto' }}>
                            <Box
                                sx={{
                                    overflow: 'hidden',
                                    div: {
                                        textAlign: 'center'
                                    },
                                    '.slick-track': {
                                        display: { xs: 'flex', xl: 'inherit' }
                                    },
                                    '& .slick-dots': {
                                        position: 'initial',
                                        mt: 4,
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
                                    <MainCard
                                        content={false}
                                        boxShadow
                                        sx={{
                                            '&:hover': {
                                                transform: 'scale3d(1.02, 1.02, 1)',
                                                transition: 'all .4s ease-in-out'
                                            }
                                        }}
                                    >
                                        <CardMedia
                                            sx={{ height: 524 }}
                                            image={
                                                'https://res.cloudinary.com/dybi8swhy/image/upload/v1698934567/ImagesCommon/prod-4_jejst4.jpg'
                                            }
                                            title=''
                                        />
                                    </MainCard>
                                    <MainCard
                                        content={false}
                                        boxShadow
                                        sx={{
                                            '&:hover': {
                                                transform: 'scale3d(1.02, 1.02, 1)',
                                                transition: 'all .4s ease-in-out'
                                            }
                                        }}
                                    >
                                        <CardMedia
                                            sx={{ height: 524 }}
                                            image={
                                                'https://res.cloudinary.com/dybi8swhy/image/upload/v1698934565/ImagesCommon/prod-3_nbkq5p.jpg'
                                            }
                                            title=''
                                        />
                                    </MainCard>
                                    <MainCard
                                        content={false}
                                        boxShadow
                                        sx={{
                                            '&:hover': {
                                                transform: 'scale3d(1.02, 1.02, 1)',
                                                transition: 'all .4s ease-in-out'
                                            }
                                        }}
                                    >
                                        <CardMedia
                                            sx={{ height: 524 }}
                                            image={
                                                'https://res.cloudinary.com/dybi8swhy/image/upload/v1698934560/ImagesCommon/prod-6_bqg0e1.jpg'
                                            }
                                            title=''
                                        />
                                    </MainCard>
                                </Slider>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default HeaderSection;
