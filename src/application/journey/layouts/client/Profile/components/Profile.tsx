// material-ui
import {
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
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
    Tooltip,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// import projects
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// assets
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import BlockIcon from '@mui/icons-material/Block';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { ActiveAccountServiceImpl } from '@ecommerce-frontend/src/domain/services/account/active';
import { DeleteAccountServiceImpl } from '@ecommerce-frontend/src/domain/services/account/delete';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

/** names Don&apos;t look right */
function createData(name: string, calories?: string, fat?: any, carbs?: string, protein?: string) {
    return { name, calories, fat, carbs, protein };
}

// ==============================|| PROFILE ACCOUNT USER - PROFILE ||============================== //

const Profile = () => {
    // init theme
    const theme = useTheme();
    // init variables
    const { account } = useSelector((state) => state.account);
    const { userSelect } = useSelector((state) => state.user);

    const rows = [
        createData('Full Name', ':', userSelect?.fullName ? userSelect?.fullName : account?.fullName),
        createData('Phone', ':', userSelect?.phoneNo ? userSelect?.phoneNo : account?.phoneNo),
        createData('Email', ':', userSelect?.email ? userSelect?.email : account?.email),
        createData(
            'Address',
            ':',
            userSelect?.shippingAddress?.address
                ? userSelect?.shippingAddress?.address
                : account?.shippingAddress?.address
        ),
        createData(
            'Status Account',
            ':',
            <Chip
                size='medium'
                label={userSelect?.isDeleted ? 'Block' : 'Active'}
                color={userSelect?.isDeleted ? 'error' : 'success'}
            />
        )
    ];

    // handle active account
    const handleActiveAccount = async (id: string) => {
        const service = new ActiveAccountServiceImpl();
        const res = await service.execute(id);
        dispatch(setLoading(false));
    };

    // hanlde block/delete account
    const handleBlockAccount = async (id: string) => {
        const service = new DeleteAccountServiceImpl();
        const res = await service.execute(id);
        dispatch(setLoading(false));
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={4} xs={12}>
                    <SubCard
                        title={
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item>
                                    <Avatar
                                        alt='User 1'
                                        src={userSelect?.avatar ? userSelect?.avatar : account?.avatar}
                                    />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align='left' variant='subtitle1'>
                                        {userSelect?.fullName ? userSelect?.fullName : account?.fullName}
                                    </Typography>
                                    <Typography align='left' variant='subtitle2'>
                                        Account Customer
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Chip
                                        size='small'
                                        label={userSelect?.role ? userSelect?.role : account?.role}
                                        color='primary'
                                    />
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
                                        {userSelect?.email ? userSelect?.email : account?.email}
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
                                        {userSelect?.phoneNo ? userSelect?.phoneNo : account?.phoneNo}
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
                                    !userSelect?.isDeleted ? (
                                        <Tooltip placement='top' title='Block Account'>
                                            <IconButton
                                                color='primary'
                                                sx={{
                                                    color: theme.palette.orange.dark,
                                                    borderColor: theme.palette.orange.main,
                                                    '&:hover ': { background: theme.palette.orange.light }
                                                }}
                                                size='large'
                                                onClick={() => handleBlockAccount(userSelect?.id)}
                                            >
                                                <BlockIcon sx={{ fontSize: '1.1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip placement='top' title='Active Account'>
                                            <IconButton
                                                color='primary'
                                                sx={{
                                                    color: theme.palette.success.dark,
                                                    borderColor: theme.palette.success.main,
                                                    '&:hover ': { background: theme.palette.success.light }
                                                }}
                                                size='large'
                                                onClick={() => handleActiveAccount(userSelect?.id)}
                                            >
                                                <BorderColorIcon sx={{ fontSize: '1.1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    )
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
