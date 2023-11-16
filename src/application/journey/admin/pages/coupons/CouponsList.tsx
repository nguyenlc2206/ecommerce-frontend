// import lib
import React from 'react';
import { FormattedMessage } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    CardContent,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';

// assets
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import { IconSearch } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/AddTwoTone';

// import projects
import { GetAllCouponServiceImpl } from '@ecommerce-frontend/src/domain/services/coupon/getAll';
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { CouponModel } from '@ecommerce-frontend/src/domain/entities/Coupon';
import { KeyedObject } from '@ecommerce-frontend/src/common/types';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import Chip from '@ecommerce-frontend/src/application/widgets/Chip';
import { DeleteCouponServiceImpl } from '@ecommerce-frontend/src/domain/services/coupon/delete';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import { ActiveCouponServiceImpl } from '@ecommerce-frontend/src/domain/services/coupon/active';

// ==============================|| COUPONS LIST ||============================== //

const CouponsList = () => {
    // get all coupon
    React.useEffect(() => {
        const service = new GetAllCouponServiceImpl();
        const res = service.execute();
    }, []);

    /** init theme */
    const theme = useTheme();
    const { pageLoading } = useSelector((state) => state.page);

    const { coupons } = useSelector((state) => state.coupon);
    const [rows, setRows] = React.useState<CouponModel[]>(Object.values(coupons));
    React.useEffect(() => {
        setRows(Object.values(coupons));
    }, [pageLoading]);

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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.values(coupons).length) : 0;

    // handle search user
    const [search, setSearch] = React.useState<string>('');
    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = Object.values(coupons).filter((row: KeyedObject) => {
                let matches = true;

                const properties = ['code', 'id', 'discount'];
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
            setRows(Object.values(coupons));
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
                                placeholder='Search Coupon'
                                value={search}
                                size='small'
                            />
                        </Grid>
                        <Grid item>
                            <Tooltip title='Add new coupon'>
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
                                <TableCell sx={{ pl: 2 }}>#</TableCell>
                                <TableCell>
                                    {' '}
                                    <FormattedMessage id='coupon-code' />
                                </TableCell>
                                <TableCell align='center'>
                                    <FormattedMessage id='coupon-discount' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='coupon-type' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='coupon-start-date' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='coupon-end-date' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='coupon-status' />
                                </TableCell>
                                <TableCell align='center' sx={{ pr: 3 }}>
                                    <FormattedMessage id='coupon-actions' />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item: CouponModel, index: number) => {
                                    return (
                                        <TableRow hover key={item?.id}>
                                            <TableCell sx={{ pl: 3 }}>{item?.id}</TableCell>
                                            <TableCell>
                                                {' '}
                                                <Typography
                                                    variant='subtitle1'
                                                    sx={{
                                                        color: 'grey.900'
                                                    }}
                                                >
                                                    {' '}
                                                    {item?.code}{' '}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='center'>
                                                {' '}
                                                <Typography
                                                    variant='subtitle1'
                                                    sx={{
                                                        color: 'grey.900'
                                                    }}
                                                >
                                                    {' '}
                                                    {item?.discount}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {' '}
                                                {item?.type === 'all' && (
                                                    <Chip label='All Account' size='small' chipcolor='primary' />
                                                )}
                                                {item?.type === 'personal' && (
                                                    <Chip label='Personal' size='small' chipcolor='success' />
                                                )}
                                            </TableCell>
                                            <TableCell>{item?.startDate}</TableCell>
                                            <TableCell>{item?.endDate}</TableCell>
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
                                                    {!item?.isDeleted ? (
                                                        <Tooltip placement='top' title='Block Coupon'>
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
                                                                    const service = new DeleteCouponServiceImpl();
                                                                    await service.execute(item?.id);
                                                                    dispatch(setLoading(false));
                                                                }}
                                                            >
                                                                <BlockTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip placement='top' title='Active Category'>
                                                            <IconButton
                                                                color='primary'
                                                                sx={{
                                                                    color: theme.palette.secondary.dark,
                                                                    borderColor: theme.palette.secondary.main,
                                                                    '&:hover ': {
                                                                        background: theme.palette.secondary.light
                                                                    }
                                                                }}
                                                                size='large'
                                                                onClick={async () => {
                                                                    // handle active coupon
                                                                    const service = new ActiveCouponServiceImpl();
                                                                    const res = await service.execute(item?.id);
                                                                    dispatch(setLoading(false));
                                                                }}
                                                            >
                                                                <CheckIcon sx={{ fontSize: '1.1rem' }} />
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
            </MainCard>
        </>
    );
};

export default CouponsList;
