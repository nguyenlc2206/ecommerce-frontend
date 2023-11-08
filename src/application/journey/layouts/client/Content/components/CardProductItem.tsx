// import libs
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import material ui
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { ProductCardProps } from '@ecommerce-frontend/src/common/types/cart';
import { Button, CardContent, CardMedia, Grid, LinearProgress, Rating, Stack, Typography, styled } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

// ==============================|| CARD PRODUCT ITEM ||============================== //

// style constant
const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 7,
    borderRadius: 5,
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5
    }
}));

const ProductCardItem = ({ id, color, name, image, description, offerPrice, salePrice, soldOut }: ProductCardProps) => {
    return (
        <>
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
                <CardMedia sx={{ height: 160 }} image={image} title='Contemplative Reptile' component={Link} to={``} />
                <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component={Link} to={``} variant='subtitle1' sx={{ textDecoration: 'none' }}>
                                {name}
                            </Typography>
                        </Grid>
                        {description && (
                            <Grid item xs={12}>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        overflow: 'hidden',
                                        height: 45
                                    }}
                                >
                                    {description}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12} sx={{ pt: '8px !important' }}>
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <Grid item xs>
                                    <BorderLinearProgress
                                        variant='determinate'
                                        color='secondary'
                                        value={50}
                                        aria-label='secondary color progress'
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant='h6' component='div'>
                                        🔥 {soldOut} Sold
                                    </Typography>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Typography variant='h4'>${offerPrice}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant='h6'
                                            sx={{ color: 'grey.500', textDecoration: 'line-through' }}
                                        >
                                            ${salePrice}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Button
                                    variant='contained'
                                    sx={{ minWidth: 0 }}
                                    onClick={() => {}}
                                    aria-label='product add to cart'
                                >
                                    <ShoppingCartTwoToneIcon fontSize='small' />
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </>
    );
};

export default ProductCardItem;
