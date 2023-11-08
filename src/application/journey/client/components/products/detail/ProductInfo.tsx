// import projects
import { Link } from 'react-router-dom';
import React from 'react';
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
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { ColorsOptionsProps } from '@ecommerce-frontend/src/common/types/e-commerce';
import { AddProductCartServiceImpl } from '@ecommerce-frontend/src/domain/services/product/addProductCart';

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
    const { productSelect, options } = useSelector((state) => state.product);
    const [color, setColor] = React.useState<string>('');

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
        onSubmit: (values) => {}
    });

    const { values, errors, handleSubmit, handleChange } = formik;

    /** handle add to cart products */
    const handleAddProduct = async () => {
        const products = productSelect.products;
        const productFinded = _.find(products, { id: values?.color });
        const data = {
            id: values?.id,
            name: values?.name,
            size: productFinded?.size,
            color: productFinded?.color,
            qty: 1,
            discount: productFinded?.discount,
            price: productFinded?.price,
            iimage: values?.image
        };
        // init service
        const service = new AddProductCartServiceImpl();
        const res = await service.execute({ products: data });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Chip
                                size='small'
                                label={'Out of Stock'}
                                chipcolor={'error'}
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
                        ${productSelect?.products[0].price * (productSelect?.products[0].discount / 100)}
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
                                                    onChange={handleChange}
                                                    aria-label='colors'
                                                    name='color'
                                                    id='color'
                                                    sx={{ ml: 1 }}
                                                >
                                                    {options.colors &&
                                                        options.colors.map((item, index) => {
                                                            const colorsData = getColor(item.value);
                                                            return (
                                                                <FormControlLabel
                                                                    key={index}
                                                                    value={item.id}
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
                                                        onChange={handleChange}
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
