import { useEffect, useState } from 'react';

// material-ui
import { Button, CardContent, Grid, Stack, Theme, useMediaQuery } from '@mui/material';

// project imports
import Colors from '@ecommerce-frontend/src/application/journey/client/components/products/filter/Colors';

import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import Accordion from '@ecommerce-frontend/src/application/widgets/Accordion';
import { ProductsFilter } from '@ecommerce-frontend/src/common/types/e-commerce';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import Categories from '@ecommerce-frontend/src/application/journey/client/components/products/filter/Categories';
import Price from '@ecommerce-frontend/src/application/journey/client/components/products/filter/Price';

// ==============================|| PRODUCT GRID - FILTER ||============================== //

const ProductFilter = ({
    filter,
    handelFilter
}: {
    filter: ProductsFilter;
    handelFilter: (type: string, params: { id: string; value: string }, rating?: number) => void;
}) => {
    const matchDownLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));

    const filterData = [
        {
            id: 'categories',
            defaultExpand: true,
            title: 'Categories',
            content: <Categories categoriess={filter.categories} handelFilter={handelFilter} />
        },
        {
            id: 'colors',
            defaultExpand: true,
            title: 'Colors',
            content: <Colors colors={filter.colors} handelFilter={handelFilter} />
        },
        {
            id: 'price',
            defaultExpand: true,
            title: 'Price',
            content: <Price price={filter.price} handelFilter={handelFilter} />
        }
        // {
        //     id: 'rating',
        //     defaultExpand: true,
        //     title: 'Rating',
        //     content: <RatingSection rating={filter.rating} handelFilter={handelFilter} />
        // }
    ];

    return (
        <MainCard border={!matchDownLG} content={false} sx={{ overflow: 'visible' }}>
            <CardContent sx={{ p: 1, height: matchDownLG ? '100vh' : 'auto' }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Accordion data={filterData} />
                    </Grid>
                    <Grid item xs={12} sx={{ m: 1 }}>
                        <Stack direction='row' justifyContent='center' alignItems='center'>
                            <Button
                                variant='contained'
                                fullWidth
                                color='error'
                                onClick={() => handelFilter('reset', { id: '', value: '' })}
                            >
                                Clear All
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

export default ProductFilter;
