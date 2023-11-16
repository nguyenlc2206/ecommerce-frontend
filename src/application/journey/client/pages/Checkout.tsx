// import libs
import React, { ReactNode } from 'react';
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';

// import material ui
import { Grid, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { Theme, styled, useTheme } from '@mui/material/styles';

// import type, constant
import { TabsProps } from '@ecommerce-frontend/src/common/types';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// import projects
import useConfig from '@ecommerce-frontend/src/common/hooks/useConfig';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import AppBar from '@ecommerce-frontend/src/application/journey/layouts/client/Header/components/Appbar';
import CheckoutCard from '@ecommerce-frontend/src/application/journey/client/components/checkout/Cart';
import ProductEmpty from '@ecommerce-frontend/src/application/journey/client/components/products/ProductEmpty';
import BillingAddress from '@ecommerce-frontend/src/application/journey/client/components/checkout/BillingAddress';
import PaymentCheckout from '@ecommerce-frontend/src/application/journey/client/components/checkout/Payment';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';

// import service
import { UpdateCartServiceImpl } from '@ecommerce-frontend/src/domain/services/cart/updateCart';
import { DeleteCartServiceImpl } from '@ecommerce-frontend/src/domain/services/cart/deleteCart';
import { GetCartByAccountIdServiceImpl } from '@ecommerce-frontend/src/domain/services/cart/getCartByAccountId';

// custom style
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

// tabs option
interface StyledProps {
    theme?: Theme;
    border?: number;
    value?: number;
    cart?: number;
    disabled?: boolean;
    icon?: ReactNode;
    label?: ReactNode;
}

interface TabOptionProps {
    label: string;
    icon: ReactNode;
    caption: string;
}

const StyledTab = styled((props: any) => <Tab {...props} />)(
    ({ theme, border, value, cart, ...others }: StyledProps) => ({
        color: cart >= value ? theme.palette.success.dark : theme.palette.grey[900],
        minHeight: 'auto',
        minWidth: 250,
        padding: 16,
        borderRadius: `${border}px`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        textAlign: 'left',
        justifyContent: 'flex-start',
        '&:after': {
            backgroundColor: 'transparent !important'
        },
        '&.Mui-selected': {
            color: theme.palette.primary.main,
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
        },
        '& > svg': {
            marginBottom: '0px !important',
            marginRight: 10,
            marginTop: 2,
            height: 20,
            width: 20
        },
        [theme.breakpoints.down('md')]: {
            minWidth: '100%'
        }
    })
);

// tabs
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div>{children}</div>}
        </div>
    );
}

const tabsOption: TabOptionProps[] = [
    {
        label: 'Order Products',
        icon: <ShoppingCartTwoToneIcon />,
        caption: 'Product Added'
    },
    {
        label: 'Billing Address',
        icon: <ApartmentIcon />,
        caption: 'Billing Information'
    },
    {
        label: 'Payment',
        icon: <CreditCardTwoToneIcon />,
        caption: 'Add & Update Card'
    }
];

const steps = { initial: 0, billing: 1, payment: 2 };

// ==============================|| CHECKOUT CLIENT PAGE ||============================== //

const CheckoutClientPage = () => {
    const navigate = useNavigate();
    /** init theme */
    const theme = useTheme();
    /** init variables */
    const { borderRadius } = useConfig();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    // init redux
    const { products, step, discounts, billingAddress } = useSelector((state) => state.cart.checkout);
    const { urlCardPayment } = useSelector((state) => state.order);

    const [value, setValue] = React.useState(steps[step] || 0);
    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    // refresh cart
    const serivceCheckout = new GetCartByAccountIdServiceImpl();
    const handleGetCart = async () => {
        const res = await serivceCheckout.execute();
    };
    React.useEffect(() => {
        handleGetCart();
    }, []);

    // handle update quantity products
    const updateQuantity = async (id: string | number | undefined, quantity: number) => {
        // processing products update
        const productsClone = _.cloneDeep(products);
        _.set(_.find(productsClone, { id: id }), 'qty', quantity);
        // init service
        const service = new UpdateCartServiceImpl();
        const res = await service.execute({ products: productsClone, discounts: discounts });
    };

    // handle remove product cart
    const removeCartProduct = async (id: string) => {
        const service = new DeleteCartServiceImpl();
        const res = await service.execute(id);
    };

    // handle next step
    const onNext = async () => {
        const status = { initial: 'billing', billing: 'payment', payment: 'complete' };
        const servive = new UpdateCartServiceImpl();
        if (step === 'payment') {
            const res = await servive.execute({ status: status[step] });
            if (res.isFailure()) return;
        } else {
            setValue(steps[status[step]]);
            const res = await servive.execute({ status: status[step], discounts: discounts });
        }
    };

    // handle back step
    const onBack = async () => {
        const status = { billing: 'initial', payment: 'billing' };
        setValue(steps[status[step]]);
        const servive = new UpdateCartServiceImpl();
        if (step !== 'payment') {
            const res = await servive.execute({ status: status[step], discounts: discounts });
        } else {
            const res = await servive.execute({ status: status[step], discounts: [] });
        }
    };

    // handle billingAddressHandler
    const billingAddressHandler = async () => {
        const status = { initial: 'billing', billing: 'payment' };
        setValue(steps[status[step]]);
        const servive = new UpdateCartServiceImpl();
        const res = await servive.execute({ status: status[step], billingAddress: billingAddress });
    };

    // React.useEffect(() => {}, [step, billingAddress]);

    return (
        <>
            {/* Header */}
            <HeaderWrapper id='home'>
                <AppBar />
            </HeaderWrapper>
            <SectionWrapper sx={{ bgcolor: 'grey.100', paddingX: matchDownMD ? 3 : 20 }}>
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Tabs
                                value={value}
                                onChange={(e, newValue) => handleChange(newValue)}
                                aria-label='icon label tabs example'
                                variant='scrollable'
                                sx={{
                                    '& .MuiTabs-flexContainer': {
                                        borderBottom: 'none'
                                    },
                                    '& .MuiTabs-indicator': {
                                        display: 'none'
                                    },
                                    '& .MuiButtonBase-root + .MuiButtonBase-root': {
                                        position: 'relative',
                                        overflow: 'visible',
                                        ml: 2,
                                        '&:after': {
                                            content: '""',
                                            bgcolor: '#ccc',
                                            width: 1,
                                            height: 'calc(100% - 16px)',
                                            position: 'absolute',
                                            top: 8,
                                            left: -8
                                        }
                                    }
                                }}
                            >
                                {tabsOption.map((tab, index) => {
                                    return (
                                        <StyledTab
                                            key={index}
                                            theme={theme}
                                            border={borderRadius}
                                            value={index}
                                            cart={steps[step]}
                                            disabled={index !== steps[step]}
                                            icon={tab.icon}
                                            label={
                                                <Grid container direction='column'>
                                                    <Typography variant='subtitle1' color='inherit'>
                                                        {tab.label}
                                                    </Typography>
                                                    <Typography
                                                        component='div'
                                                        variant='caption'
                                                        sx={{ textTransform: 'capitalize' }}
                                                    >
                                                        {tab.caption}
                                                    </Typography>
                                                </Grid>
                                            }
                                        />
                                    );
                                })}
                            </Tabs>
                        </Grid>
                        <Grid item xs={12}>
                            <TabPanel value={value} index={0}>
                                {products && products.length ? (
                                    <CheckoutCard
                                        onNext={onNext}
                                        removeProduct={removeCartProduct}
                                        updateQuantity={updateQuantity}
                                    />
                                ) : (
                                    <ProductEmpty />
                                )}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <BillingAddress onBack={onBack} billingAddressHandler={billingAddressHandler} />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <PaymentCheckout onNext={onNext} onBack={onBack} />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </MainCard>
            </SectionWrapper>
        </>
    );
};

export default CheckoutClientPage;
