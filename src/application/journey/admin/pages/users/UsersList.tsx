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
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    InputAdornment,
    OutlinedInput,
    Fab,
    TextField,
    CardContent
} from '@mui/material';

// assets
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// import redux
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { useDispatch } from '@ecommerce-frontend/src/infras/data/store';
import { activeUser } from '@ecommerce-frontend/src/infras/data/store/reducers/user';
import useAuth from '@ecommerce-frontend/src/common/hooks/useAuth';

import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// assets
import { IconSearch } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/AddTwoTone';

// init service
import { GetAllAccountServiceImpl } from '@ecommerce-frontend/src/domain/services/account/getAll';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import { ActiveAccountServiceImpl } from '@ecommerce-frontend/src/domain/services/account/active';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { KeyedObject } from '@ecommerce-frontend/src/common/types';

// ==============================|| USER LIST ||============================== //

function stableSort(array: AccountModel[], comparator: (a: AccountModel, b: AccountModel) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0] as AccountModel, b[0] as AccountModel);
        if (order !== 0) return order;
        return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis.map((el) => el[0]);
}

const UserList = () => {
    /** init fetch list users */
    React.useEffect(() => {
        /** init service */
        const getAllService = new GetAllAccountServiceImpl();
        getAllService.execute();
    }, []);
    /** init theme */
    const theme = useTheme();
    const { users } = useSelector((state) => state.user);
    const { pageLoading } = useSelector((state) => state.page);
    const [rows, setRows] = React.useState<AccountModel[]>(Object.values(users));
    React.useEffect(() => {
        setRows(Object.values(users));
    }, [pageLoading]);

    /** init hooks */
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // init delete
    const { deleteAccount } = useAuth();

    // hande change row per page
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };
    // handle change page
    const [page, setPage] = React.useState<number>(0);
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.values(users).length) : 0;

    // handle search user
    const [search, setSearch] = React.useState<string>('');

    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = Object.values(users).filter((row: KeyedObject) => {
                let matches = true;

                const properties = ['fullName', 'email', 'phoneNo', 'role', 'id'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setRows(newRows);
        } else {
            setRows(Object.values(users));
        }
    };

    return (
        <>
            <MainCard content={false}>
                <CardContent>
                    <Grid container alignItems='center' justifyContent='space-between' spacing={gridSpacing}>
                        <Grid item>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <IconSearch fontSize='small' />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleSearch}
                                placeholder='Search User'
                                value={search}
                                size='small'
                            />
                        </Grid>
                        <Grid item>
                            <Tooltip title='Add new user'>
                                <Fab
                                    color='primary'
                                    size='small'
                                    onClick={() => {}}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddIcon fontSize='small' />
                                </Fab>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardContent>
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
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item: AccountModel) => {
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
                                                                    sx={{
                                                                        color: 'success.dark',
                                                                        width: 14,
                                                                        height: 14
                                                                    }}
                                                                />
                                                            ) : (
                                                                <HighlightOffIcon
                                                                    sx={{
                                                                        color: 'error.dark',
                                                                        width: 14,
                                                                        height: 14
                                                                    }}
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
                                                                navigate(`/profile/${item?.id}`);
                                                            }}
                                                        >
                                                            <VisibilityTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                        </IconButton>
                                                    </Tooltip>

                                                    {item?.isDeleted ? (
                                                        <Tooltip placement='top' title='Active Account'>
                                                            <IconButton
                                                                color='primary'
                                                                sx={{
                                                                    color: theme.palette.success.dark,
                                                                    borderColor: theme.palette.success.main,
                                                                    '&:hover ': {
                                                                        background: theme.palette.success.light
                                                                    }
                                                                }}
                                                                size='large'
                                                                onClick={async () => {
                                                                    // handle active account
                                                                    const service = new ActiveAccountServiceImpl();
                                                                    const res = await service.execute(item?.id);
                                                                    dispatch(setLoading(false));
                                                                }}
                                                            >
                                                                <BorderColorIcon sx={{ fontSize: '1.1rem' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip placement='top' title='Block Account'>
                                                            <IconButton
                                                                color='primary'
                                                                sx={{
                                                                    color: theme.palette.orange.dark,
                                                                    borderColor: theme.palette.orange.main,
                                                                    '&:hover ': {
                                                                        background: theme.palette.orange.light
                                                                    }
                                                                }}
                                                                size='large'
                                                                onClick={async () => {
                                                                    await deleteAccount(item?.id);
                                                                    dispatch(setLoading(false));
                                                                }}
                                                            >
                                                                <DeleteTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
        </>
    );
};

export default UserList;
