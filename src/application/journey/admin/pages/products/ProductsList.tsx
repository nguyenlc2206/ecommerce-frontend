// import libs
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import * as _ from 'lodash';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AvatarGroup,
    Card,
    CardContent,
    Chip,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
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
    TextField,
    Tooltip,
    Typography
} from '@mui/material';

// import projects
import { GetAllProductServiceImpl } from '@ecommerce-frontend/src/domain/services/product/getAll';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { DeleteProductServiceImpl } from '@ecommerce-frontend/src/domain/services/product/delete';

// assets
import CheckIcon from '@mui/icons-material/Check';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import { IconSearch } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/AddTwoTone';

// import redux
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { ActiveProductServiceImpl } from '@ecommerce-frontend/src/domain/services/product/active';
import { KeyedObject } from '@ecommerce-frontend/src/common/types';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import { activeProduct } from '@ecommerce-frontend/src/infras/data/store/reducers/product';
import ProductAddDialog from '../../components/products/ProductAddDialog';

// ==============================|| PRODUCT LIST ||============================== //

const ProductList = () => {
    /** init theme */
    const theme = useTheme();
    /** init hooks */
    const navigate = useNavigate();
    const { pageLoading } = useSelector((state) => state.page);
    const { products } = useSelector((state) => state.product);
    const [rows, setRows] = React.useState<ProductModel[]>(Object.values(products));
    React.useEffect(() => {
        setRows(Object.values(products));
    }, [products]);

    /** useState get all products */
    React.useEffect(() => {
        /** init services */
        const getAllProducts = new GetAllProductServiceImpl();
        getAllProducts.execute();
    }, []);

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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.values(products).length) : 0;

    // handle search user
    const [search, setSearch] = React.useState<string>('');
    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = Object.values(products).filter((row: KeyedObject) => {
                let matches = true;

                const properties = ['name', 'sizes', 'category.name'];
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
            setRows(Object.values(products));
        }
    };

    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        setOpen(false);
    }, [pageLoading]);

    return (
        <>
            <MainCard
                content={false}
                title={
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
                            <Tooltip title='Add new product'>
                                <Fab
                                    color='primary'
                                    size='small'
                                    onClick={handleClickOpenDialog}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddIcon fontSize='small' />
                                </Fab>
                            </Tooltip>
                            <ProductAddDialog open={open} handleCloseDialog={handleCloseDialog} />
                        </Grid>
                    </Grid>
                }
            >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }}>#</TableCell>
                                <TableCell>
                                    <FormattedMessage id='product-name' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='product-images' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='product-size' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='product-category' />
                                </TableCell>
                                <TableCell sx={{ pr: 3 }}>
                                    <FormattedMessage id='product-status' />
                                </TableCell>
                                <TableCell align='center'>
                                    <FormattedMessage id='product-quantity' />
                                </TableCell>
                                <TableCell align='center' sx={{ pr: 3 }}>
                                    <FormattedMessage id='product-actions' />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((product: ProductModel, index: number) => {
                                    return (
                                        <TableRow hover key={product?.id}>
                                            <TableCell sx={{ pl: 3 }}>{product?.id}</TableCell>
                                            <TableCell>{product?.name}</TableCell>
                                            <TableCell>
                                                <Grid container>
                                                    <AvatarGroup max={3}>
                                                        {product?.images.map((image: string) => {
                                                            return <Avatar key={image} alt={image} src={image} />;
                                                        })}
                                                    </AvatarGroup>
                                                </Grid>
                                            </TableCell>
                                            <TableCell>{product?.sizes.join(', ')}</TableCell>
                                            <TableCell>{product?.category?.name}</TableCell>

                                            <TableCell>
                                                <Chip
                                                    label={!product?.isDeleted ? 'Active' : 'Inactive'}
                                                    size='small'
                                                    sx={{
                                                        background: !product?.isDeleted
                                                            ? theme.palette.success.light + 60
                                                            : theme.palette.error.light,
                                                        color: !product?.isDeleted
                                                            ? theme.palette.success.dark
                                                            : theme.palette.error.dark
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align='center'>
                                                {_.sum(product?.products.map((item: ProductModel) => item?.totalQty))}
                                            </TableCell>

                                            <TableCell align='center' sx={{ pr: 3 }}>
                                                <Stack direction='row' justifyContent='center' alignItems='center'>
                                                    <Tooltip placement='top' title='View'>
                                                        <IconButton
                                                            color='primary'
                                                            aria-label='delete'
                                                            size='large'
                                                            onClick={() => {
                                                                dispatch(activeProduct(product));
                                                                navigate(product?.id);
                                                            }}
                                                        >
                                                            <VisibilityTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                        </IconButton>
                                                    </Tooltip>

                                                    {!product?.isDeleted ? (
                                                        <Tooltip placement='top' title='Block'>
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
                                                                    const service = new DeleteProductServiceImpl();
                                                                    await service.execute(product?.id);
                                                                    dispatch(setLoading(false));
                                                                }}
                                                            >
                                                                <BlockTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip placement='top' title='Active'>
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
                                                                    // handle active product
                                                                    const service = new ActiveProductServiceImpl();
                                                                    await service.execute(product?.id);
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

export default ProductList;
