// import libs
import React, { SyntheticEvent } from 'react';
import { Link, useParams } from 'react-router-dom';

// import material ui
import { Box, Grid, Stack, Tab, Tabs, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// import projects
import AppBar from '@ecommerce-frontend/src/application/journey/layouts/client/Header/components/Appbar';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import ProductImages from '@ecommerce-frontend/src/application/journey/client/components/products/detail/ProductImages';
import { GetProductByIdServiceImpl } from '@ecommerce-frontend/src/domain/services/product/getById';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import ProductInfo from '@ecommerce-frontend/src/application/journey/client/components/products/detail/ProductInfo';
import { TabsProps } from '@ecommerce-frontend/src/common/types';
import Chip from '@ecommerce-frontend/src/application/widgets/Chip';
import ProductDescription from '@ecommerce-frontend/src/application/journey/client/components/products/detail/ProductDescription';
import ProductReview from '@ecommerce-frontend/src/application/journey/client/components/products/detail/ProductReview';

// custom stlye
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

function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`product-details-tabpanel-${index}`}
            aria-labelledby={`product-details-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `product-details-tab-${index}`,
        'aria-controls': `product-details-tabpanel-${index}`
    };
}

// ==============================|| Detail Product ||============================== //

const ProductDetail = () => {
    /** init theme */
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
    const { id } = useParams();

    // init redux
    const { productSelect } = useSelector((state) => state.product);

    // product description tabs
    const [value, setValue] = React.useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // initial
    const handleInitial = async () => {
        const service = new GetProductByIdServiceImpl();
        const res = await service.execute(id);
    };

    React.useEffect(() => {
        handleInitial();
    }, []);

    return (
        <>
            {/* Header */}
            <HeaderWrapper id='home'>
                <AppBar />
            </HeaderWrapper>

            <SectionWrapper sx={{ bgcolor: 'grey.100', paddingX: matchDownMD ? 3 : 20 }}>
                <Grid container alignItems='center' justifyContent='center' spacing={gridSpacing}>
                    <Grid item xs={12} lg={10}>
                        {productSelect && productSelect?.id === id && (
                            <MainCard>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} md={6}>
                                        <ProductImages />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <ProductInfo />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Tabs
                                            value={value}
                                            indicatorColor='primary'
                                            onChange={handleChange}
                                            sx={{}}
                                            aria-label='product description tabs example'
                                            variant='scrollable'
                                        >
                                            <Tab component={Link} to='#' label='Description' {...a11yProps(0)} />
                                            <Tab
                                                component={Link}
                                                to='#'
                                                label={
                                                    <Stack direction='row' alignItems='center'>
                                                        Reviews{' '}
                                                        <Chip
                                                            label={String(
                                                                productSelect?.products[0].price *
                                                                    (productSelect?.products[0].discount / 100)
                                                            )}
                                                            size='small'
                                                            chipcolor='secondary'
                                                            sx={{ ml: 1.5 }}
                                                        />
                                                    </Stack>
                                                }
                                                {...a11yProps(1)}
                                            />
                                        </Tabs>
                                        <TabPanel value={value} index={0}>
                                            <ProductDescription />
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <ProductReview />
                                        </TabPanel>
                                    </Grid>
                                </Grid>
                            </MainCard>
                        )}
                    </Grid>
                </Grid>
            </SectionWrapper>
        </>
    );
};

export default ProductDetail;
