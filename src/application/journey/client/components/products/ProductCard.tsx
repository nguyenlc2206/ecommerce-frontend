// import libs
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';

// material-ui
import { Button, CardContent, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { ProductCardProps } from '@ecommerce-frontend/src/common/types/cart';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { AddProductCartServiceImpl } from '@ecommerce-frontend/src/domain/services/cart/addCart';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { UpdateCartServiceImpl } from '@ecommerce-frontend/src/domain/services/cart/updateCart';

// project import

// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({ id, name, image, description, offerPrice, salePrice, rating, item }: ProductCardProps) => {
    /** init variable hooks */
    const [productRating] = useState<number | undefined>(rating);

    const { products } = useSelector((state) => state.cart.checkout);

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    /** handle add product cart */
    const handleAddProduct = async (item: ProductModel) => {
        const productFinded = _.find(products, { id: item?.products[0]?.id });
        if (productFinded) {
            const data = _.cloneDeep(products);
            _.set(_.find(data, { id: item?.products[0]?.id }), 'qty', productFinded?.qty + 1);
            const serivce = new UpdateCartServiceImpl();
            const res = await serivce.execute({ products: data });
        } else {
            // processing data
            const data = {
                productId: item?.id,
                id: item?.products[0]?.id,
                name: item?.name,
                size: item?.products[0]?.size,
                color: item?.products[0]?.color,
                qty: 1,
                totalQty: item?.products[0]?.totalQty,
                discount: item?.products[0]?.discount,
                price: item?.products[0]?.price,
                image: item?.images[0]
            };
            // init service
            const service = new AddProductCartServiceImpl();
            const res = await service.execute({ products: data });
        }
    };

    return (
        <>
            <MainCard
                content={false}
                boxShadow
                sx={{
                    width: '100%',
                    '&:hover': {
                        transform: 'scale3d(1.02, 1.02, 1)',
                        transition: 'all .4s ease-in-out'
                    }
                }}
            >
                <CardMedia
                    sx={{ height: 200 }}
                    image={image}
                    title='Contemplative Reptile'
                    component={Link}
                    to={`/products/${id}`}
                />
                <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                component={Link}
                                to={`/e-commerce/product-details/${id}`}
                                variant='h4'
                                sx={{ textDecoration: 'none' }}
                            >
                                {name}
                            </Typography>
                        </Grid>
                        {description && (
                            <Grid item xs={12}>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        overflow: 'hidden',
                                        height: 30
                                    }}
                                >
                                    {description}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12} sx={{ pt: '8px !important' }}>
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <Rating precision={0.5} name='size-small' value={productRating} size='small' readOnly />
                                <Typography variant='caption'>({offerPrice}+)</Typography>
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

export default ProductCard;
