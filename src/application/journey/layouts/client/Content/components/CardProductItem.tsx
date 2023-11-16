// import libs
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as _ from 'lodash';

// import material ui
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { ProductCardProps } from '@ecommerce-frontend/src/common/types/cart';
import { Button, CardContent, CardMedia, Grid, LinearProgress, Rating, Stack, Typography, styled } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { AddProductCartServiceImpl } from '@ecommerce-frontend/src/domain/services/cart/addCart';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { UpdateCartServiceImpl } from '@ecommerce-frontend/src/domain/services/cart/updateCart';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

// ==============================|| CARD PRODUCT ITEM ||============================== //

// style constant
const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 7,
    borderRadius: 5,
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5
    }
}));

const ProductCardItem = ({
    item,
    totalProduct,
    name,
    image,
    description,
    offerPrice,
    salePrice,
    soldOut
}: ProductCardProps) => {
    // init
    const navigate = useNavigate();

    // handle add to cart product
    const { products } = useSelector((state) => state.cart.checkout);
    const handleAddProduct = async (item: ProductModel) => {
        const productFinded = _.find(products, { id: item?.id });
        if (productFinded) {
            const data = _.cloneDeep(products);
            _.set(_.find(data, { id: item?.id }), 'qty', productFinded?.qty + 1);
            const serivce = new UpdateCartServiceImpl();
            const res = await serivce.execute({ products: data, status: 'initial' });
        } else {
            // processing data
            const data = {
                productId: item?.product?.id,
                id: item?.id,
                name: item?.product?.name,
                size: item?.size,
                color: item?.color,
                qty: 1,
                totalQty: item?.totalQty,
                discount: item?.discount,
                price: item?.price,
                image: item?.product?.images[0]
            };
            // init service
            const service = new AddProductCartServiceImpl();
            const res = await service.execute({ products: data });
        }
        dispatch(setLoading(false));
    };

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
                <CardMedia
                    sx={{ height: 160 }}
                    image={image}
                    title='Contemplative Reptile'
                    component={Link}
                    to={`/products/${item?.product?.id}`}
                />
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
                                        value={(soldOut / totalProduct) * 100}
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
                                    onClick={() => handleAddProduct(item)}
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
