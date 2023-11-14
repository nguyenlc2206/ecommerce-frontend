// import libs
import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia, Container, Link, Stack, Typography } from '@mui/material';

// third-party
import Slider from 'react-slick';

// assets
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import { GetAllCategoryServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/getAll';
import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { activeCategory } from '@ecommerce-frontend/src/infras/data/store/reducers/category';

// ==============================|| CATEGORIES CART ||============================== //

const CategoryCardSection = () => {
    /** init theme */
    const theme = useTheme();
    /** init hooks */
    const navigate = useNavigate();
    const { categories } = useSelector((state) => state.category);
    const [rows, setRows] = React.useState<CategoryModel[]>(
        Object.values(categories).filter((item) => item.isDeleted !== true)
    );

    /** init setting */
    const settings = {
        dots: true,
        className: 'center',
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 9,
        slidesToScroll: 9,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1534,
                settings: {
                    slidesToShow: 9,
                    slidesToScroll: 9,
                    dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true
                }
            }
        ]
    };

    /** get all category */
    const getAllCategories = async () => {
        // init service
        const service = new GetAllCategoryServiceImpl();
        // execute service
        const res = await service.execute();
        if (res.isFailure()) return;
        // console.log(res.data);
    };

    /** useEffect */
    React.useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            <Container sx={{ mb: 4 }}>
                <Stack spacing={0.25} sx={{ mx: 2.0 }} alignItems='center'>
                    <Typography variant='h2' align='center' sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                        Categories
                    </Typography>
                </Stack>
            </Container>
            <Container>
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
                        {rows.map((item, index) => (
                            <SubCard
                                key={index}
                                content={false}
                                sx={{
                                    width: '100px !important',
                                    height: 90,
                                    border: 'none',
                                    display: 'inline-flex !important',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    my: 0.5,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    bgcolor: 'grey.100',
                                    '&:hover': {
                                        bgcolor: 'primary.light'
                                    }
                                }}
                            >
                                <Box
                                    component={Link}
                                    underline='none'
                                    sx={{
                                        display: 'flex',
                                        flex: 1,
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => {
                                        navigate(`/products/category/${item?.id}`);
                                        dispatch(activeCategory(item));
                                    }}
                                >
                                    <Stack spacing={1} alignItems='center'>
                                        <Stack
                                            sx={{ width: 'auto', height: 40 }}
                                            alignItems='center'
                                            justifyContent='center'
                                        >
                                            <CardMedia alt={item?.name} src={item?.image as string} component='img' />
                                        </Stack>
                                        <Typography variant='h6' sx={{ width: 'max-content' }}>
                                            {item?.name.toLowerCase().charAt(0).toUpperCase() +
                                                item?.name.toLowerCase().slice(1)}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </SubCard>
                        ))}
                    </Slider>
                </Box>
            </Container>
        </>
    );
};

export default CategoryCardSection;
