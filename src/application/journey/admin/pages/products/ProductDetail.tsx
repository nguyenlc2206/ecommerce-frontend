// import libs
import React from 'react';
import { useParams } from 'react-router-dom';

// import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import ProductsListDetail from '@ecommerce-frontend/src/application/journey/admin/components/products/ProducstListDetail';

// material-ui
import { Fab, Grid, InputAdornment, OutlinedInput, Tooltip, Typography } from '@mui/material';

// import redux
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { GetProductByIdServiceImpl } from '@ecommerce-frontend/src/domain/services/product/getById';

// assets
import { IconSearch } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { KeyedObject } from '@ecommerce-frontend/src/common/types';

// import projects
import ProductAddDetailDialog from '@ecommerce-frontend/src/application/journey/admin/components/products/ProductAddDetailDialog';

// ==============================|| PRODUCT DETAIL ||============================== //

const ProductAdminDetail = () => {
    // params
    const { id } = useParams();
    // init redux
    const { pageLoading } = useSelector((state) => state.page);
    const { productSelect } = useSelector((state) => state.product);
    const [rows, setRows] = React.useState<ProductModel[]>(productSelect?.products);
    React.useEffect(() => {
        setRows(productSelect?.products);
    }, [productSelect]);

    React.useEffect(() => {
        const service = new GetProductByIdServiceImpl();
        const res = service.execute(id);
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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productSelect?.products.length) : 0;

    // handle search user
    const [search, setSearch] = React.useState<string>('');
    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = productSelect?.products.filter((row: KeyedObject) => {
                let matches = true;

                const properties = ['size', 'price', 'discount', 'color', 'id'];
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
            setRows(productSelect?.products);
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
        <MainCard
            title={
                <Grid container justifyContent='space-between' alignItems='center' spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant='h3'>Product Detail</Typography>
                    </Grid>
                    <Grid item>
                        <OutlinedInput
                            id='input-search-list-style2'
                            placeholder='Search'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <IconSearch stroke={1.5} size='16px' />
                                </InputAdornment>
                            }
                            size='small'
                            onChange={handleSearch}
                            value={search}
                        />
                        <Tooltip title='Add new type'>
                            <Fab
                                color='primary'
                                size='small'
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize='small' />
                            </Fab>
                        </Tooltip>
                        <ProductAddDetailDialog open={open} handleCloseDialog={handleCloseDialog} />
                    </Grid>
                </Grid>
            }
        >
            <ProductsListDetail
                product={productSelect}
                rows={rows || productSelect?.products}
                page={page}
                rowsPerPage={rowsPerPage}
                emptyRows={emptyRows}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ProductAdminDetail;
