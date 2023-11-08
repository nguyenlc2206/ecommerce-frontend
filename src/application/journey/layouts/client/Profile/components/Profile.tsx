// material-ui
import {
    Button,
    Chip,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';

// import projects
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// assets
import { IconEdit } from '@tabler/icons-react';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';

// import redux
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';

/** names Don&apos;t look right */
function createData(name: string, calories?: string, fat?: string, carbs?: string, protein?: string) {
    return { name, calories, fat, carbs, protein };
}

// ==============================|| PROFILE ACCOUNT USER - PROFILE ||============================== //

const Profile = () => {
    // init variables
    const { account } = useSelector((state) => state.account);

    const rows = [
        createData('Full Name', ':', account?.fullName),
        createData('Phone', ':', account?.phoneNo),
        createData('Email', ':', account?.email),
        createData('Address', ':', account?.shippingAddress?.address),
        createData('Zip Code', ':', '12345')
    ];

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={4} xs={12}>
                    <SubCard
                        title={
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item>
                                    <Avatar alt='User 1' src={account?.avatar as string} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align='left' variant='subtitle1'>
                                        {'nguyencaole'}
                                    </Typography>
                                    <Typography align='left' variant='subtitle2'>
                                        Account Customer
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Chip size='small' label={account?.role} color='primary' />
                                </Grid>
                            </Grid>
                        }
                    >
                        <List component='nav' aria-label='main mailbox folders'>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant='subtitle1'>Email</Typography>} />
                                <ListItemSecondaryAction>
                                    <Typography variant='subtitle2' align='right'>
                                        {account?.email}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItemButton>
                            <Divider />
                            <ListItemButton>
                                <ListItemIcon>
                                    <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant='subtitle1'>Phone</Typography>} />
                                <ListItemSecondaryAction>
                                    <Typography variant='subtitle2' align='right'>
                                        {account?.phoneNo}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItemButton>
                            <Divider />
                            <ListItemButton>
                                <ListItemIcon>
                                    <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant='subtitle1'>Location</Typography>} />
                                <ListItemSecondaryAction>
                                    <Typography variant='subtitle2' align='right'>
                                        VietNam
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItemButton>
                        </List>
                    </SubCard>
                </Grid>
                <Grid item lg={8} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <SubCard
                                title='About me'
                                secondary={
                                    <Button>
                                        <IconEdit stroke={1.5} size='20px' aria-label='Edit Details' />
                                    </Button>
                                }
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant='subtitle1'>Personal Details</Typography>
                                    </Grid>
                                    <Divider sx={{ pt: 1 }} />
                                    <Grid item xs={12}>
                                        <TableContainer>
                                            <Table
                                                sx={{
                                                    '& td': {
                                                        borderBottom: 'none'
                                                    }
                                                }}
                                                size='small'
                                            >
                                                <TableBody>
                                                    {rows.map((row) => (
                                                        <TableRow key={row.name}>
                                                            <TableCell variant='head'>{row.name}</TableCell>
                                                            <TableCell>{row.calories}</TableCell>
                                                            <TableCell>{row.fat}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
