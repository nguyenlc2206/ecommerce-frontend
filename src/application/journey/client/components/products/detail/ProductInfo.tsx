// import projects
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import * as _ from 'lodash';

// import material ui
import {
    Button,
    ButtonBase,
    ButtonGroup,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    Rating,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';

// import projects
import Chip from '@ecommerce-frontend/src/application/widgets/Chip';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import ColorOptions from '@ecommerce-frontend/src/application/journey/client/components/products/filter/ColorOptions';

// assets
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

// third-party
import { useFormik, Form, FormikProvider, useField, FieldHookConfig } from 'formik';
import * as yup from 'yup';

// import products
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { ColorsOptionsProps } from '@ecommerce-frontend/src/common/types/e-commerce';
import { AddProductCartServiceImpl } from '@ecommerce-frontend/src/domain/services/cart/addCart';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { SearchProductsServiceImpl } from '@ecommerce-frontend/src/domain/services/product/search';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { UpdateCartServiceImpl } from '@ecommerce-frontend/src/domain/services/cart/updateCart';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

// product color select
function getColor(color: string) {
    return ColorOptions.filter((item) => item.value === color);
}
const validationSchema = yup.object({
    color: yup.string().required('Color selection is required'),
    size: yup.string().required('Size selection is required.')
});

// ==============================|| COLORS OPTION ||============================== //

const Colors = ({ checked, colorsData }: { checked?: boolean; colorsData: ColorsOptionsProps[] }) => {
    const theme = useTheme();

    return (
        <Grid item>
            <Tooltip title={colorsData[0].label}>
                <ButtonBase sx={{ borderRadius: '50%' }}>
                    <Avatar
                        color='inherit'
                        size='badge'
                        sx={{
                            bgcolor: colorsData[0].bg,
                            color: theme.palette.mode === 'light' ? 'grey.50' : 'grey.800'
                        }}
                    >
                        {checked && (
                            <CircleIcon
                                sx={{
                                    color: theme.palette.mode === 'light' ? 'grey.50' : 'grey.800',
                                    fontSize: '0.75rem'
                                }}
                            />
                        )}
                        {!checked && <CircleIcon sx={{ color: colorsData[0].bg, fontSize: '0.75rem' }} />}
                    </Avatar>
                </ButtonBase>
            </Tooltip>
        </Grid>
    );
};

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const Increment = (props: string | FieldHookConfig<any>) => {
    const [field, , helpers] = useField(props);

    const { value } = field;
    const { setValue } = helpers;
    return (
        <ButtonGroup size='large' variant='text' color='inherit' sx={{ border: '1px solid', borderColor: 'grey.400' }}>
            <Button
                key='three'
                disabled={value <= 1}
                onClick={() => setValue(value - 1)}
                sx={{ pr: 0.75, pl: 0.75, minWidth: '0px !important' }}
                aria-label="'decrease'"
            >
                <RemoveIcon fontSize='inherit' />
            </Button>
            <Button key='two' sx={{ pl: 0.5, pr: 0.5 }}>
                {value}
            </Button>
            <Button
                key='one'
                onClick={() => setValue(value + 1)}
                sx={{ pl: 0.75, pr: 0.75, minWidth: '0px !important' }}
                aria-label="'increase'"
            >
                <AddIcon fontSize='inherit' />
            </Button>
        </ButtonGroup>
    );
};

const ProductInfo = () => {
    // init redux
    const { productSelect } = useSelector((state) => state.product);
    const { products: productsCart } = useSelector((state) => state.cart.checkout);

    const [color, setColor] = React.useState<string>('');
    const [size, setSize] = React.useState<string>('');
    const [stock, setStock] = React.useState<boolean>(true);
    // useEffect processing product in stock
    React.useEffect(() => {
        let _stock = false;
        if (productSelect?.products.length && productSelect?.products.length === 1) {
            if (productSelect?.products[0]?.totalQty === 0) _stock = false;
            else _stock = true;
        } else {
            productSelect?.products.length &&
                productSelect?.products.map((item: ProductModel) => {
                    _stock = _stock || item?.totalQty !== 0;
                });
        }
        setStock(_stock);
    }, [productSelect]);

    // init formik form
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: productSelect.id,
            name: productSelect.name,
            image: productSelect.images[0],
            salePrice: productSelect.products[0].price * (productSelect.products[0].discount / 100),
            offerPrice: productSelect.products[0].price,
            color: '',
            size: '',
            quantity: 1
        },
        validationSchema,
        onSubmit: (values) => {
            // console.log(values?.quantity);
        }
    });

    const { values, errors, handleSubmit, handleChange } = formik;

    /** handle add to cart products */
    const handleAddProduct = async () => {
        if (stock && values?.color && values?.size) {
            const productFinded = _.find(productSelect?.products, { color: values?.color, size: values?.size });
            const productCheck = _.find(productsCart, { color: values?.color, size: values?.size });
            // check products color is exsits in cart

            if (productCheck) {
                // product color and size is exists in cart
                const productClone = _.cloneDeep(productsCart);
                _.set(_.find(productClone, { id: productCheck?.id }), 'qty', productCheck?.qty + 1);
                const serivce = new UpdateCartServiceImpl();
                const res = await serivce.execute({ products: productClone });
            } else {
                const data = {
                    productId: productSelect?.id,
                    id: productFinded?.id,
                    name: values?.name,
                    size: productFinded?.size,
                    color: productFinded?.color,
                    qty: values?.quantity,
                    totalQty: productFinded?.totalQty,
                    discount: productFinded?.discount,
                    price: productFinded?.price,
                    image: values?.image
                };
                // init service
                const service = new AddProductCartServiceImpl();
                const res = await service.execute({ products: data });
                dispatch(setLoading(false));
            }
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Product is out of stock!',
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: false
                })
            );
        }
    };

    /** handle query products */
    const handleQueryProduct = async (data: ProductModel) => {
        // init service
        const service = new SearchProductsServiceImpl();
        const res = await service.execute(data);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Chip
                                size='medium'
                                label={stock ? 'In Stock' : 'Out of Stock'}
                                chipcolor={stock ? 'success' : 'error'}
                                sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                            />
                        </Grid>
                    </Grid>
                    <Avatar variant='rounded' sx={{ bgcolor: 'grey.200', color: 'grey.800' }}>
                        <FavoriteBorderIcon />
                    </Avatar>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2'>{productSelect.description}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Stack direction='row' alignItems='center' spacing={1}>
                    <Rating
                        name='simple-controlled'
                        value={4.5}
                        icon={<StarTwoToneIcon fontSize='inherit' />}
                        emptyIcon={<StarBorderTwoToneIcon fontSize='inherit' />}
                        precision={0.1}
                        readOnly
                    />
                    <Typography variant='caption'>({productSelect?.products[0].price}+)</Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction='row' alignItems='center' spacing={1}>
                    <Typography variant='h2' color='primary'>
                        $
                        {productSelect?.products[0].price -
                            productSelect?.products[0].price * (productSelect?.products[0].discount / 100)}
                    </Typography>
                    <Typography variant='body1' sx={{ textDecoration: 'line-through' }}>
                        ${productSelect?.products[0].price}
                    </Typography>
                    <Typography variant='caption'>(Inclusive of all taxes)</Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={10}>
                                <Table>
                                    <TableBody sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant='body2'>
                                                    Colors{' '}
                                                    <Typography color='error' component='span'>
                                                        *
                                                    </Typography>
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <RadioGroup
                                                    row
                                                    value={values.color}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setColor(e.target.value);
                                                        handleQueryProduct({
                                                            id: productSelect?.id,
                                                            color: e.target.value,
                                                            size: size
                                                        } as ProductModel);
                                                    }}
                                                    aria-label='colors'
                                                    name='color'
                                                    id='color'
                                                    sx={{ ml: 1 }}
                                                >
                                                    {productSelect.colors &&
                                                        productSelect.colors.map((item, index) => {
                                                            const colorsData = getColor(item);
                                                            return (
                                                                <FormControlLabel
                                                                    key={index}
                                                                    value={item}
                                                                    control={
                                                                        <Radio
                                                                            sx={{ p: 0.25 }}
                                                                            disableRipple
                                                                            checkedIcon={
                                                                                <Colors
                                                                                    checked
                                                                                    colorsData={colorsData}
                                                                                />
                                                                            }
                                                                            icon={<Colors colorsData={colorsData} />}
                                                                        />
                                                                    }
                                                                    label=''
                                                                />
                                                            );
                                                        })}
                                                </RadioGroup>
                                                {errors.color && (
                                                    <FormHelperText error id='standard-label-color'>
                                                        {errors.color}
                                                    </FormHelperText>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Stack>
                                                    <Typography variant='body2'>
                                                        Size{' '}
                                                        <Typography color='error' component='span'>
                                                            *
                                                        </Typography>
                                                    </Typography>
                                                    <Typography
                                                        variant='caption'
                                                        color='primary'
                                                        component={Link}
                                                        to='#'
                                                    >
                                                        Size Chart?
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <FormControl sx={{ minWidth: 120 }}>
                                                    <Select
                                                        id='size'
                                                        name='size'
                                                        value={values.size}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setSize(e.target.value);
                                                            handleQueryProduct({
                                                                id: productSelect?.id,
                                                                size: e.target.value,
                                                                color: color
                                                            } as ProductModel);
                                                        }}
                                                        displayEmpty
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >
                                                        <MenuItem value=''>
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {productSelect.sizes.map((option, index) => (
                                                            <MenuItem sx={{ p: 1.25 }} key={index} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                {errors.size && (
                                                    <FormHelperText error id='standard-label-size'>
                                                        {errors.size}
                                                    </FormHelperText>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant='body2'>Quantity</Typography>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Increment name='quantity' />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Button
                                            type='submit'
                                            fullWidth
                                            color='primary'
                                            variant='contained'
                                            size='large'
                                            startIcon={<ShoppingCartTwoToneIcon />}
                                            onClick={handleAddProduct}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            type='submit'
                                            fullWidth
                                            color='secondary'
                                            variant='contained'
                                            size='large'
                                        >
                                            Buy Now
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                </FormikProvider>
            </Grid>
        </Grid>
    );
};

export default ProductInfo;
