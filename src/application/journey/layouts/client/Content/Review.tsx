// import libs

// import material ui
import { Container, Grid, Stack, Typography } from '@mui/material';

// third-party
import Slider from 'react-slick';

import ReviewCard from '@ecommerce-frontend/src/application/journey/layouts/client/Content/components/CardReview';

// ==============================|| REVIEW SECTION ||============================== //

const ReviewSection = () => {
    /** init setting */
    const settings = {
        dots: false,
        className: 'center',
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 3,
        slidesToScroll: 3,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1534,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: false
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    return (
        <>
            <Container>
                <Grid container spacing={7.5} justifyContent='center'>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Stack spacing={0.75} sx={{ mx: 2.0 }} alignItems='center'>
                            <Typography variant='h2' align='center' sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                                Popular Reviews
                            </Typography>
                            <Typography variant='h4' sx={{ fontWeight: 400 }} align='center'>
                                We are so grateful for your positive review and appreciate your support of our product
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '24px !important' }}>
                        <Slider {...settings}>
                            <ReviewCard
                                id={1}
                                image={
                                    'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                }
                                name={'nguyencaole'}
                                tag={'@reviewproduct'}
                                content={
                                    'We are so grateful for your positive review and appreciate your support of our product'
                                }
                                view={1}
                            />
                            {/* <ReviewCard
                                id={1}
                                image={
                                    'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                }
                                name={'nguyencaole'}
                                tag={'@reviewproduct'}
                                content={
                                    'We are so grateful for your positive review and appreciate your support of our product'
                                }
                                view={1}
                            /> */}
                            <ReviewCard
                                id={1}
                                image={
                                    'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                }
                                name={'nguyencaole'}
                                tag={'@reviewproduct'}
                                content={
                                    'We are so grateful for your positive review and appreciate your support of our product'
                                }
                                view={1}
                            />
                            <ReviewCard
                                id={1}
                                image={
                                    'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                }
                                name={'nguyencaole'}
                                tag={'@reviewproduct'}
                                content={
                                    'We are so grateful for your positive review and appreciate your support of our product'
                                }
                                view={1}
                            />
                        </Slider>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ReviewSection;
