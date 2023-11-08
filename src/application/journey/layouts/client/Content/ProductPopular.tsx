// import libs
import React from 'react';
import { Link } from 'react-router-dom';

// import material ui
import { Box, Chip, Container, Grid, Stack, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// assets
import { TabsProps } from '@ecommerce-frontend/src/common/types';
import ProductPopularItem from '@ecommerce-frontend/src/application/journey/layouts/client/Content/components/CardPopularItem';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// tab content
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// ==============================|| PRODUCTS POPULAR SECTION ||============================== //

const ProductPopularSection = () => {
    /** init hooks */
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Container>
                <Stack spacing={0.25} sx={{ mx: 2.0 }} alignItems='center'>
                    <Typography variant='h2' align='center' sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                        Popular Products
                    </Typography>
                </Stack>
                <Tabs
                    value={value}
                    variant='scrollable'
                    onChange={handleChange}
                    textColor='secondary'
                    indicatorColor='secondary'
                    sx={{
                        mt: 2,
                        '& a': {
                            minHeight: 'auto',
                            minWidth: 10,

                            mr: 2.2,
                            color: 'grey.500',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        '& a.Mui-selected': {
                            color: theme.palette.secondary.main
                        },
                        '& a > svg': {
                            mb: '0px !important',
                            mr: 1.1
                        }
                    }}
                >
                    <Tab component={Link} to='#' label='Featured Products' {...a11yProps(0)} />
                    <Tab component={Link} to='#' label='Top Rated Products' {...a11yProps(1)} />
                    <Tab
                        component={Link}
                        to='#'
                        label={
                            <>
                                Onesale Products
                                <Chip
                                    label='01'
                                    size='small'
                                    sx={{
                                        color: theme.palette.secondary.main,
                                        background: theme.palette.secondary.light,
                                        ml: 1.3
                                    }}
                                />
                            </>
                        }
                        {...a11yProps(2)}
                    />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <MainCard>
                        <Grid container direction='row' spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <ProductPopularItem
                                    image={
                                        'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                    }
                                    name={'Name Product'}
                                    rating={1}
                                    offerPrice={27.75}
                                    salePrice={50.0}
                                    soldOut={10}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <ProductPopularItem
                                    image={
                                        'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                    }
                                    name={'Name Product'}
                                    rating={1}
                                    offerPrice={27.75}
                                    salePrice={50.0}
                                    soldOut={10}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <ProductPopularItem
                                    image={
                                        'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                    }
                                    name={'Name Product'}
                                    rating={5}
                                    offerPrice={27.75}
                                    salePrice={50.0}
                                    soldOut={10}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <ProductPopularItem
                                    image={
                                        'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                    }
                                    name={'Name Product'}
                                    rating={2.5}
                                    offerPrice={27.75}
                                    salePrice={50.0}
                                    soldOut={10}
                                />
                            </Grid>
                        </Grid>
                    </MainCard>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MainCard>
                        <Grid container direction='row' spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <ProductPopularItem
                                    image={
                                        'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                    }
                                    name={'Name Product'}
                                    rating={1}
                                    offerPrice={27.75}
                                    salePrice={50.0}
                                    soldOut={10}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <ProductPopularItem
                                    image={
                                        'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                    }
                                    name={'Name Product'}
                                    rating={1}
                                    offerPrice={27.75}
                                    salePrice={50.0}
                                    soldOut={10}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <ProductPopularItem
                                    image={
                                        'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                    }
                                    name={'Name Product'}
                                    rating={1}
                                    offerPrice={27.75}
                                    salePrice={50.0}
                                    soldOut={10}
                                />
                            </Grid>
                        </Grid>
                    </MainCard>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <MainCard>
                        <Grid container direction='row' spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <ProductPopularItem
                                    image={
                                        'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                    }
                                    name={'Name Product'}
                                    rating={1}
                                    offerPrice={27.75}
                                    salePrice={50.0}
                                    soldOut={10}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <ProductPopularItem
                                    image={
                                        'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                    }
                                    name={'Name Product'}
                                    rating={1}
                                    offerPrice={27.75}
                                    salePrice={50.0}
                                    soldOut={10}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <ProductPopularItem
                                    image={
                                        'https://res.cloudinary.com/dybi8swhy/image/upload/v1698151875/AvatarImages/admin%40gmail.com.png'
                                    }
                                    name={'Name Product'}
                                    rating={1}
                                    offerPrice={27.75}
                                    salePrice={50.0}
                                    soldOut={10}
                                />
                            </Grid>
                        </Grid>
                    </MainCard>
                </TabPanel>
            </Container>
        </>
    );
};

export default ProductPopularSection;
