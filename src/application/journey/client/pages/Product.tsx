// import libs
import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';

// import material ui
import {
    Box,
    Button,
    Divider,
    Drawer,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    styled,
    useMediaQuery,
    useTheme
} from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// assets
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// import projects
import AppBar from '@ecommerce-frontend/src/application/journey/layouts/client/Header/components/Appbar';
import { appDrawerWidth, gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import useConfig from '@ecommerce-frontend/src/common/hooks/useConfig';

import ProductFilter from '@ecommerce-frontend/src/application/journey/client/components/products/ProductFilter';
import { ProductsFilter } from '@ecommerce-frontend/src/common/types/e-commerce';
import ProductsClientList from '@ecommerce-frontend/src/application/journey/client/components/products/ProductList';
import { GetAllCategoryServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/getAll';
import SkeletonProductPlaceholder from '@ecommerce-frontend/src/application/journey/client/components/products/ProductPlaceholder';
import { FilterProductsServiceImpl } from '@ecommerce-frontend/src/domain/services/product/filter';
import FloatingCart from '@ecommerce-frontend/src/application/journey/client/components/products/FloatingCart';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { activeCategory } from '@ecommerce-frontend/src/infras/data/store/reducers/category';

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

// product list container
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(
    ({ theme, open }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
        }),
        marginRight: -appDrawerWidth,
        [theme.breakpoints.down('xl')]: {
            paddingRight: 0,
            marginRight: 0
        },
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.shorter
            }),
            marginRight: 0
        })
    })
);

// ==============================|| PRODUCT CLIENT PAGE ||============================== //

const ProductClientPage = () => {
    /** init hooks */
    const theme = useTheme();
    const navigate = useNavigate();

    const { categorySelect } = useSelector((state) => state.category);

    useEffect(() => {});

    /** init config */
    const { borderRadius } = useConfig();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));

    const [productLoading, setProductLoading] = useState(true);

    // drawer
    const [open, setOpen] = useState(productLoading);
    useEffect(() => {
        setOpen(!matchDownMD);
    }, [matchDownMD]);

    // filter
    const initialState: ProductsFilter = {
        search: '',
        sort: 'low',
        gender: [],
        categories: [
            {
                id: categorySelect?.id ? categorySelect?.id : '',
                value: categorySelect?.name ? categorySelect?.name.toLowerCase() : 'all'
            }
        ],
        colors: [],
        price: '',
        rating: 0
    };
    const [filter, setFilter] = useState(initialState);

    /** @todo: handle Filter */
    const handelFilter = (type: string, params: { id: string; value: string }, rating?: number) => {
        setProductLoading(true);
        switch (type) {
            case 'categories':
                if (filter.categories.some((item) => item.value === params?.value)) {
                    setFilter({
                        ...filter,
                        categories: filter.categories.filter((item) => item.value !== params?.value)
                    });
                } else if (filter.categories.some((item) => item.value === 'all') || params?.value === 'all') {
                    dispatch(activeCategory(null));
                    navigate('/products');
                    setFilter({ ...filter, categories: [{ value: params?.value, id: params?.id }] });
                } else {
                    setFilter({
                        ...filter,
                        categories: [...filter.categories, { value: params?.value, id: params?.id }]
                    });
                }
                break;
            case 'colors':
                if (filter.colors.some((item) => item === params.value)) {
                    setFilter({ ...filter, colors: filter.colors.filter((item) => item !== params.value) });
                } else {
                    setFilter({ ...filter, colors: [...filter.colors, params.value] });
                }
                break;
            case 'price':
                setFilter({ ...filter, price: params.value });
                break;
            case 'reset':
                dispatch(activeCategory(null));
                setFilter(initialState);
                break;
            default:
            // no options
        }
    };

    /** @todo: filter date */
    const handleFilterData = async () => {
        // init service
        const service = new FilterProductsServiceImpl();
        // processing category filter
        const filterClone = _.cloneDeep(filter);
        const _categories: Array<string> = [];
        filterClone.categories.map((item: { id: string; value: string }, index: number) => {
            if (item?.id) _categories.push(item?.id);
        });
        filterClone.categories = _categories;

        // excute service
        const res = await service.execute(filterClone);
        // const res = await service.execute()
        setProductLoading(false);
    };

    useEffect(() => {
        handleFilterData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    return (
        <>
            {/* Header */}
            <HeaderWrapper id='home'>
                <AppBar />
            </HeaderWrapper>

            <SectionWrapper sx={{ bgcolor: 'grey.100', paddingX: matchDownMD ? 3 : 8 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            alignItems='center'
                            justifyContent='space-between'
                            spacing={matchDownMD ? 0.5 : 2}
                        >
                            <Grid item>
                                {matchDownMD ? (
                                    <Stack direction='row' alignItems='center' spacing={1}>
                                        <Button
                                            disableRipple
                                            onClick={() => setOpen((prevState) => !prevState)}
                                            color='secondary'
                                            startIcon={
                                                <FilterAltIcon sx={{ fontWeight: 500, color: 'secondary.200' }} />
                                            }
                                        >
                                            Filter
                                        </Button>
                                    </Stack>
                                ) : (
                                    <Stack direction='row' alignItems='center' spacing={1}>
                                        <Typography variant='h4'>Shop</Typography>
                                        <IconButton size='large' aria-label='go to shopping'>
                                            <ArrowForwardIosIcon
                                                sx={{
                                                    width: '0.875rem',
                                                    height: '0.875rem',
                                                    fontWeight: 500,
                                                    color: 'grey.500'
                                                }}
                                            />
                                        </IconButton>
                                    </Stack>
                                )}
                            </Grid>

                            <Grid item>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='center'
                                    spacing={matchDownSM ? 0.5 : matchDownMD ? 1 : 1.5}
                                >
                                    <TextField
                                        sx={{ width: { xs: 140, md: 'auto' } }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <SearchIcon fontSize='small' />
                                                </InputAdornment>
                                            )
                                        }}
                                        value={filter.search}
                                        placeholder='Search Product'
                                        size='small'
                                        onChange={() => {}}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={{ borderColor: 'grey.400' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Drawer
                                sx={{
                                    ml: open ? 3 : 0,
                                    height: matchDownMD ? '100vh' : 'auto',
                                    flexShrink: 0,
                                    zIndex: { xs: 1200, lg: open ? 1000 : -1 },
                                    overflowX: 'hidden',
                                    width: appDrawerWidth,
                                    '& .MuiDrawer-paper': {
                                        height: 'auto',
                                        width: appDrawerWidth,
                                        position: matchDownMD ? 'fixed' : 'relative',
                                        border: 'none',
                                        borderRadius: matchDownMD ? 0 : `${borderRadius}px`
                                    }
                                }}
                                variant={matchDownMD ? 'temporary' : 'persistent'}
                                anchor='right'
                                open={open}
                                ModalProps={{ keepMounted: true }}
                                onClose={() => setOpen((prevState) => !prevState)}
                            >
                                {open && (
                                    <PerfectScrollbar component='div'>
                                        <ProductFilter filter={filter} handelFilter={handelFilter} />
                                    </PerfectScrollbar>
                                )}
                            </Drawer>
                            <Grid item xs={12}>
                                <Main open={open}>
                                    <Grid container spacing={gridSpacing}>
                                        {productLoading ? (
                                            [1, 2, 3, 4].map((item) => (
                                                <Grid key={item} item xs={12} sm={6} md={4} lg={2.5}>
                                                    <SkeletonProductPlaceholder />
                                                </Grid>
                                            ))
                                        ) : (
                                            <ProductsClientList />
                                        )}
                                    </Grid>
                                </Main>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </SectionWrapper>
        </>
    );
};

export default ProductClientPage;
