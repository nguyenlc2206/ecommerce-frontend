// import libs
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';

// import projects
import { TabsProps } from '@ecommerce-frontend/src/common/types';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import OrderInformationDetail from '@ecommerce-frontend/src/application/journey/admin/components/orders/Information';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import { GetOrderByIdServiceImpl } from '@ecommerce-frontend/src/domain/services/order/getById';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import OrderInvoiceDetail from '@ecommerce-frontend/src/application/journey/admin/components/orders/Invoice';
import OrderStatus from '@ecommerce-frontend/src/application/journey/admin/components/orders/Status';
import AppBar from '@ecommerce-frontend/src/application/journey/layouts/client/Header/components/Appbar';

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

// tab content
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}
// ==============================|| ORDER DETAIL ||============================== //

const OrderClientDetail = () => {
    // init variables
    // init theme
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
    const { orderSelect } = useSelector((state) => state.order);
    // init params id
    const { id } = useParams();
    React.useEffect(() => {
        // init service
        const service = new GetOrderByIdServiceImpl();
        const res = service.execute(id);
    }, []);

    // set selected tab
    const [value, setValue] = useState<number>(0);
    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <HeaderWrapper id='home'>
                <AppBar />
            </HeaderWrapper>
            <SectionWrapper sx={{ bgcolor: 'grey.100', paddingX: matchDownMD ? 3 : 20 }}>
                <MainCard>
                    <Tabs
                        value={value}
                        indicatorColor='primary'
                        textColor='primary'
                        onChange={handleChange}
                        variant='scrollable'
                        aria-label='simple tabs example'
                        sx={{
                            '& a': {
                                minHeight: 'auto',
                                minWidth: 10,
                                px: 1,
                                py: 1.5,
                                mr: 2.25,
                                color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            '& a.Mui-selected': {
                                color: theme.palette.primary.main
                            },
                            '& a > svg': {
                                marginBottom: '0px !important',
                                marginRight: 1.25
                            },
                            mb: 3
                        }}
                    >
                        <Tab
                            icon={<DescriptionTwoToneIcon />}
                            component={Link}
                            to='#'
                            label='Details'
                            {...a11yProps(0)}
                        />
                        <Tab icon={<ReceiptTwoToneIcon />} component={Link} to='#' label='Invoice' {...a11yProps(1)} />
                        <Tab
                            icon={<LocalShippingTwoToneIcon />}
                            component={Link}
                            to='#'
                            label='Status'
                            {...a11yProps(2)}
                        />
                    </Tabs>
                    {/* tab - details */}
                    <TabPanel value={value} index={0}>
                        <OrderInformationDetail order={orderSelect} />
                    </TabPanel>
                    {/* tab - invoice */}
                    <TabPanel value={value} index={1}>
                        <OrderInvoiceDetail order={orderSelect} />
                    </TabPanel>
                    {/* tab - status */}
                    <TabPanel value={value} index={2}>
                        <OrderStatus order={orderSelect} />
                    </TabPanel>
                </MainCard>
            </SectionWrapper>
        </>
    );
};

export default OrderClientDetail;
