import { SyntheticEvent, useState } from 'react';

// import material ui
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Tabs, Box, Tab } from '@mui/material';

// import projects
import AppBar from '@ecommerce-frontend/src/application/journey/layouts/client/Header/components/Appbar';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// assets
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';

// types
import { TabsProps } from '@ecommerce-frontend/src/common/types';
import { Link } from 'react-router-dom';
import Profile from '@ecommerce-frontend/src/application/journey/layouts/client/Profile/components/Profile';
import ChangePasswordProfile from '@ecommerce-frontend/src/application/journey/layouts/client/Profile/components/ChangePassword';
import MyAccountProfile from '@ecommerce-frontend/src/application/journey/layouts/client/Profile/components/MyAccount';

// tabs panel
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

// tabs option
const tabsOption = [
    {
        label: 'Personal Details',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'My Account',
        icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Change Password',
        icon: <LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];

// custom stlye
const HeaderWrapper = styled('div')(({ theme }) => ({
    overflowX: 'hidden',
    overflowY: 'clip',
    background: `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`,
    [theme.breakpoints.down('md')]: {}
}));

const SectionWrapper = styled('div')({
    minHeight: '93.5vh',
    paddingTop: 120
});

// ==============================|| ACCOUNT PROFILE CLIENT PAGE ||============================== //

const AccountProfilePage = () => {
    const theme = useTheme();

    const [value, setValue] = useState<number>(0);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            {/* Header */}
            <HeaderWrapper id='home'>
                <AppBar />
            </HeaderWrapper>

            <SectionWrapper sx={{ bgcolor: 'grey.100', paddingX: 10 }}>
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Tabs
                                value={value}
                                indicatorColor='primary'
                                textColor='primary'
                                onChange={handleChange}
                                aria-label='simple tabs example'
                                variant='scrollable'
                                sx={{
                                    mb: 3,
                                    '& a': {
                                        minHeight: 'auto',
                                        minWidth: 10,
                                        py: 1.5,
                                        px: 1,
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
                                    '& .MuiTabs-indicator': {
                                        bottom: 2
                                    },
                                    '& a > svg': {
                                        marginBottom: '0px !important',
                                        mr: 1.25
                                    }
                                }}
                            >
                                {tabsOption.map((tab, index) => (
                                    <Tab
                                        key={index}
                                        component={Link}
                                        to='#'
                                        icon={tab.icon}
                                        label={tab.label}
                                        {...a11yProps(index)}
                                    />
                                ))}
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <Profile />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <MyAccountProfile />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <ChangePasswordProfile />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </MainCard>
            </SectionWrapper>
        </>
    );
};

export default AccountProfilePage;
