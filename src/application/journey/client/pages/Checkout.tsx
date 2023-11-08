// import libs
import React, { ReactNode } from 'react';

// import material ui
import { CardContent, Grid, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { Theme, styled, useTheme } from '@mui/material/styles';

// import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import AppBar from '@ecommerce-frontend/src/application/journey/layouts/client/Header/components/Appbar';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import useConfig from '@ecommerce-frontend/src/common/hooks/useConfig';

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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// tabs option
const tabsOption = [
    {
        label: 'User Profile',
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
// ==============================|| CHECKOUT CLIENT PAGE ||============================== //

const CheckoutClientPage = () => {
    /** init theme */
    const { borderRadius } = useConfig();
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const [value, setValue] = React.useState<number>(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            {/* Header */}
            <HeaderWrapper id='home'>
                <AppBar />
            </HeaderWrapper>
            <SectionWrapper sx={{ bgcolor: 'grey.100', paddingX: matchDownMD ? 3 : 20 }}>
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={3}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                orientation='vertical'
                                variant='scrollable'
                                sx={{
                                    '& .MuiTabs-flexContainer': {
                                        borderBottom: 'none'
                                    },
                                    '& button': {
                                        color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                        minHeight: 'auto',
                                        minWidth: '100%',
                                        py: 1.5,
                                        px: 2,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                        textAlign: 'left',
                                        justifyContent: 'flex-start',
                                        borderRadius: `${borderRadius}px`
                                    },
                                    '& button.Mui-selected': {
                                        color: theme.palette.primary.main,
                                        background:
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.dark.main
                                                : theme.palette.grey[50]
                                    },
                                    '& button > svg': {
                                        marginBottom: '0px !important',
                                        marginRight: 1.25,
                                        marginTop: 1.25,
                                        height: 20,
                                        width: 20
                                    },
                                    '& button > div > span': {
                                        display: 'block'
                                    },
                                    '& > div > span': {
                                        display: 'none'
                                    }
                                }}
                            >
                                {tabsOption.map((tab, index) => (
                                    <Tab
                                        key={index}
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
                                        {...a11yProps(index)}
                                    />
                                ))}
                            </Tabs>
                        </Grid>
                        <Grid item xs={12} lg={9}>
                            <CardContent
                                sx={{
                                    borderLeft: '1px solid',
                                    borderColor:
                                        theme.palette.mode === 'dark'
                                            ? theme.palette.background.default
                                            : theme.palette.grey[200],
                                    height: '100%'
                                }}
                            ></CardContent>
                        </Grid>
                    </Grid>
                </MainCard>
            </SectionWrapper>
        </>
    );
};

export default CheckoutClientPage;
