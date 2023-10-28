import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Card,
    Chip,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';

// assets
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';

// import redux
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { useDispatch } from '@ecommerce-frontend/src/infras/data/store';
import { activeUser } from '@ecommerce-frontend/src/infras/data/store/reducers/user';
import useAuth from '@ecommerce-frontend/src/common/hooks/useAuth';

// init service
import { GetAllAccountServiceImpl } from '@ecommerce-frontend/src/domain/services/account/getAll';

// ==============================|| USER LIST ||============================== //

const UserList = () => {
    /** init service */
    const getAllService = new GetAllAccountServiceImpl();

    /** init theme */
    const theme = useTheme();
    const { users } = useSelector((state) => state.user);

    /** init hooks */
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { deleteAccount } = useAuth();

    /** init fetch list users */
    React.useEffect(() => {
        // * execute getAll accounts
        getAllService.execute();
    }, []);

    return (
        <>
            {Object.values(users).length ? (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }}>#</TableCell>
                                <TableCell>
                                    {' '}
                                    <FormattedMessage id='user-profile' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='user-phone' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='user-role' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='user-status' />
                                </TableCell>
                                <TableCell align='center' sx={{ pr: 3 }}>
                                    <FormattedMessage id='user-actions' />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(users).map((item: AccountModel) => {
                                return (
                                    <TableRow hover key={item?.id}>
                                        <TableCell sx={{ pl: 3 }}>{item?.id}</TableCell>
                                        <TableCell>
                                            <Grid container spacing={2} alignItems='center'>
                                                <Grid item>
                                                    <Avatar alt='User 1' src={item?.avatar as string} />
                                                </Grid>
                                                <Grid item xs zeroMinWidth>
                                                    <Typography align='left' variant='subtitle1' component='div'>
                                                        {item?.fullName}{' '}
                                                        {!item?.isDeleted ? (
                                                            <CheckCircleIcon
                                                                sx={{ color: 'success.dark', width: 14, height: 14 }}
                                                            />
                                                        ) : (
                                                            <HighlightOffIcon
                                                                sx={{ color: 'error.dark', width: 14, height: 14 }}
                                                            />
                                                        )}
                                                    </Typography>
                                                    <Typography align='left' variant='subtitle2' noWrap>
                                                        {item?.email}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell>{item?.phoneNo}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={item?.role}
                                                size='small'
                                                sx={{
                                                    background:
                                                        item?.role === 'admin'
                                                            ? theme.palette.primary.light + 60
                                                            : theme.palette.success.light + 60,
                                                    color:
                                                        item?.role === 'admin'
                                                            ? theme.palette.primary.dark
                                                            : theme.palette.success.dark
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={!item?.isDeleted ? 'Active' : 'Inactive'}
                                                size='small'
                                                sx={{
                                                    background: !item?.isDeleted
                                                        ? theme.palette.success.light + 60
                                                        : theme.palette.error.light,
                                                    color: !item?.isDeleted
                                                        ? theme.palette.success.dark
                                                        : theme.palette.error.dark
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align='center' sx={{ pr: 3 }}>
                                            <Stack direction='row' justifyContent='center' alignItems='center'>
                                                <Tooltip placement='top' title='View'>
                                                    <IconButton
                                                        color='primary'
                                                        aria-label='delete'
                                                        size='large'
                                                        onClick={() => {
                                                            dispatch(activeUser(item));
                                                            navigate(item?.id);
                                                        }}
                                                    >
                                                        <VisibilityTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip placement='top' title='Delete'>
                                                    <IconButton
                                                        color='primary'
                                                        sx={{
                                                            color: theme.palette.orange.dark,
                                                            borderColor: theme.palette.orange.main,
                                                            '&:hover ': { background: theme.palette.orange.light }
                                                        }}
                                                        size='large'
                                                        onClick={() => deleteAccount(item?.id)}
                                                    >
                                                        <BlockTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Card sx={{ p: 2 }}>
                    <List sx={{ py: 0 }}>
                        <ListItem alignItems='center' disableGutters sx={{ py: 0 }}>
                            <ListItemAvatar>
                                <Skeleton variant='rectangular' width={44} height={44} />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{ py: 0 }}
                                primary={<Skeleton variant='rectangular' height={20} />}
                                secondary={<Skeleton variant='text' />}
                            />
                        </ListItem>
                    </List>
                </Card>
            )}
        </>
    );
};

export default UserList;
