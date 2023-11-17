// import libs
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    InputAdornment,
    TextField,
    CardContent,
    TablePagination,
    Stack,
    Tooltip,
    IconButton,
    useTheme
} from '@mui/material';

// import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';
import { GetAllOrderServiceImpl } from '@ecommerce-frontend/src/domain/services/order/getAll';
import Chip from '@ecommerce-frontend/src/application/widgets/Chip';

// assets
import { IconSearch } from '@tabler/icons-react';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { activeOrder, setDisplayType } from '@ecommerce-frontend/src/infras/data/store/reducers/order';
import { KeyedObject } from '@ecommerce-frontend/src/common/types';
import { GetOrderMeServiceImpl } from '@ecommerce-frontend/src/domain/services/order/getOrderMe';

// ==============================|| ORDERS LIST ||============================== //

const OrdersList = () => {
    // init
    const navigate = useNavigate();
    const theme = useTheme();

    // handle rows
    const { pageLoading } = useSelector((state) => state.page);
    const { orders, displayType } = useSelector((state) => state.order);
    const [rows, setRows] = React.useState<OrderModel[]>(Object.values(orders));
    React.useEffect(() => {
        setRows(Object.values(orders));
    }, [pageLoading]);

    // get list orders
    const { pathname } = useLocation();
    React.useEffect(() => {
        // init service
        if (pathname.includes('admin')) {
            const service = new GetAllOrderServiceImpl();
            const res = service.execute();
        } else {
            const service = new GetOrderMeServiceImpl();
            const res = service.execute();
        }
    }, [displayType]);

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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.values(orders).length) : 0;

    // handle search user
    const [search, setSearch] = React.useState<string>('');
    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = Object.values(orders).filter((row: KeyedObject) => {
                let matches = true;

                const properties = ['orderNumber'];
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
            setRows(Object.values(orders));
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
                    </Grid>
                </CardContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }}>
                                    {' '}
                                    <FormattedMessage id='order-number' />
                                </TableCell>
                                <TableCell>
                                    {' '}
                                    <FormattedMessage id='order-customer-name' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='order-payment-type' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='order-payment-status' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='order-address' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='order-price' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='order-status' />
                                </TableCell>
                                <TableCell align='center' sx={{ pr: 3 }}>
                                    <FormattedMessage id='order-actions' />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item: OrderModel, index: number) => {
                                    return (
                                        <TableRow hover key={item?.id}>
                                            <TableCell sx={{ pl: 3 }}>
                                                <Typography
                                                    variant='subtitle1'
                                                    sx={{
                                                        color: 'grey.900'
                                                    }}
                                                >
                                                    {' '}
                                                    {item?.orderNumber}{' '}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant='subtitle1'
                                                    sx={{
                                                        color: 'grey.900'
                                                    }}
                                                >
                                                    {' '}
                                                    {item?.shippingAddress?.name}{' '}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{item?.paymentCharged?.method}</TableCell>
                                            <TableCell>
                                                {' '}
                                                {item?.paymentStatus === 'paid' && (
                                                    <Chip label='Complete' size='small' chipcolor='success' />
                                                )}
                                                {item?.paymentStatus === 'Not paid' && (
                                                    <Chip label='Pending' size='small' chipcolor='primary' />
                                                )}
                                            </TableCell>
                                            <TableCell>{item?.shippingAddress?.address}</TableCell>
                                            <TableCell>${item?.totalPrice}</TableCell>
                                            <TableCell>
                                                {' '}
                                                {item?.status === 'pending' && (
                                                    <Chip label='Pending' size='small' chipcolor='primary' />
                                                )}
                                                {item?.status === 'processing' && (
                                                    <Chip label='Processing' size='small' chipcolor='warning' />
                                                )}
                                                {item?.status === 'shipped' && (
                                                    <Chip label='Shipped' size='small' chipcolor='warning' />
                                                )}
                                                {item?.status === 'delivered' && (
                                                    <Chip label='Complete' size='small' chipcolor='success' />
                                                )}
                                                {item?.status === 'cancel' && (
                                                    <Chip label='Cancel' size='small' chipcolor='error' />
                                                )}
                                            </TableCell>
                                            <TableCell align='center' sx={{ pr: 3 }}>
                                                <Stack direction='row' justifyContent='center' alignItems='center'>
                                                    <Tooltip placement='top' title='View'>
                                                        <IconButton
                                                            color='primary'
                                                            aria-label='delete'
                                                            size='large'
                                                            onClick={() => {
                                                                dispatch(activeOrder(item));
                                                                navigate(item?.id);
                                                            }}
                                                        >
                                                            <VisibilityTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                        </IconButton>
                                                    </Tooltip>

                                                    {item?.isDeleted && displayType === 'orderAdmin' ? (
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
                                                                onClick={async () => {}}
                                                            >
                                                                <BorderColorIcon sx={{ fontSize: '1.1rem' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        displayType === 'orderAdmin' && (
                                                            <Tooltip placement='top' title='Block Order'>
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
                                                                    onClick={async () => {}}
                                                                >
                                                                    <DeleteTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )
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

export default OrdersList;
