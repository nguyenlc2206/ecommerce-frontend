// import libs
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    ButtonGroup,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery
} from '@mui/material';

// import projects
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import ColorOptions from '@ecommerce-frontend/src/application/journey/client/components/products/filter/ColorOptions';

// assets
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import CartDiscount from '@ecommerce-frontend/src/application/journey/client/components/checkout/CartDiscount';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import OrderSumary from '@ecommerce-frontend/src/application/journey/client/components/checkout/OrderSummary';

// product color select
function getColor(color: string) {
    return ColorOptions.filter((item) => item.value === color);
}

// ==============================|| CART - INCREMENT QUANTITY ||============================== //

interface IncrementProps {
    itemId: string | number | undefined;
    maxValue: number;
    quantity: number;
    updateQuantity: (id: string | number | undefined, quantity: number) => void;
}

const Increment = ({ itemId, maxValue, quantity, updateQuantity }: IncrementProps) => {
    // init variables
    const [value, setValue] = useState(quantity);

    const incrementHandler = () => {
        setValue(value - 1);
        updateQuantity(itemId, value - 1);
    };

    const decrementHandler = () => {
        setValue(value + 1);
        updateQuantity(itemId, value + 1);
    };

    useEffect(() => {}, []);

    return (
        <ButtonGroup size='large' variant='text' color='inherit' sx={{ border: '1px solid', borderColor: 'grey.400' }}>
            <Button
                key='three'
                disabled={value <= 1}
                onClick={incrementHandler}
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
                disabled={value >= maxValue}
                onClick={decrementHandler}
                sx={{ pl: 0.75, pr: 0.75, minWidth: '0px !important' }}
                aria-label="'increase'"
            >
                <AddIcon fontSize='inherit' />
            </Button>
        </ButtonGroup>
    );
};

interface CartProps {
    onNext: () => void;
    removeProduct: (id: string | number | undefined) => void;
    updateQuantity: (id: string | number | undefined, quantity: number) => void;
}

const CheckoutCard = ({ onNext, removeProduct, updateQuantity }: CartProps) => {
    /** init theme */
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    /** init hooks variables */
    const { products, totalQuantity } = useSelector((state) => state.cart.checkout);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Typography variant='subtitle1'>Cart Item</Typography>
                        <Typography variant='caption' sx={{ fontSize: '0.875rem' }}>
                            ({totalQuantity})
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead
                                sx={{
                                    borderTop: '1px solid',
                                    color: theme.palette.mode === 'dark' ? theme.palette.dark.light + 15 : 'grey.200'
                                }}
                            >
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align='right'>Price</TableCell>
                                    <TableCell align='right'>Quantity</TableCell>
                                    <TableCell align='right'>Total</TableCell>
                                    <TableCell align='right' />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((item: ProductModel, index: number) => {
                                    const colorsData = item.color ? getColor(item.color) : false;
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                                        >
                                            <TableCell component='th' scope='row'>
                                                <Grid container alignItems='center' spacing={2}>
                                                    <Grid item>
                                                        <Avatar
                                                            size='md'
                                                            variant='rounded'
                                                            src={item.image}
                                                            alt='product images'
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Stack spacing={0}>
                                                            <Typography variant='subtitle1'>{item.name}</Typography>
                                                            <Stack direction='row' alignItems='center' spacing={1}>
                                                                <Typography
                                                                    variant='subtitle2'
                                                                    sx={{ fontWeight: 500 }}
                                                                >
                                                                    Size:{' '}
                                                                    <Typography variant='caption' component='span'>
                                                                        {item.size}
                                                                    </Typography>
                                                                </Typography>
                                                                <Typography variant='caption' sx={{ fontSize: '1rem' }}>
                                                                    |
                                                                </Typography>

                                                                <Typography
                                                                    variant='subtitle2'
                                                                    sx={{ fontWeight: 500 }}
                                                                >
                                                                    Color:{' '}
                                                                    <Typography variant='caption' component='span'>
                                                                        {colorsData
                                                                            ? colorsData[0].label
                                                                            : 'Multicolor'}
                                                                    </Typography>
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Stack>
                                                    {item.price * (item.discount / 100) && (
                                                        <Typography variant='subtitle1'>
                                                            {(item.price - item.price * (item.discount / 100)) *
                                                                item?.qty}
                                                            $
                                                        </Typography>
                                                    )}
                                                    {item.price && (
                                                        <Typography
                                                            variant='caption'
                                                            sx={{ textDecoration: 'line-through' }}
                                                        >
                                                            {item.price}$
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Increment
                                                    quantity={item?.qty}
                                                    maxValue={item?.totalQty}
                                                    itemId={item?.id}
                                                    updateQuantity={updateQuantity}
                                                />
                                            </TableCell>
                                            <TableCell align='right'>
                                                {item.price && item.qty && (
                                                    <Typography variant='subtitle1'>
                                                        {(item.price - item.price * (item.discount / 100)) * item?.qty}$
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell align='right'>
                                                <IconButton
                                                    onClick={() => removeProduct(item.id)}
                                                    size='large'
                                                    aria-label='product delete'
                                                >
                                                    <DeleteTwoToneIcon sx={{ color: 'grey.500' }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <OrderSumary />
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        direction={matchDownMD ? 'column-reverse' : 'row'}
                        container
                        spacing={3}
                        alignItems={matchDownMD ? '' : 'center'}
                    >
                        <Grid item xs={12} md={7} lg={8}>
                            <Button
                                component={Link}
                                to='/products'
                                variant='text'
                                startIcon={<KeyboardBackspaceIcon />}
                            >
                                Continue Shopping
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={5} lg={4}>
                            <Stack spacing={gridSpacing}>
                                <CartDiscount />
                                <Button variant='contained' fullWidth onClick={onNext}>
                                    Check Out
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default CheckoutCard;
