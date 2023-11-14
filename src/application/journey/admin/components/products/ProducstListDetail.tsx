import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AvatarGroup,
    Button,
    Grid,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';

// import redux
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';

// import projects
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// assets
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';

// ==============================|| PRODUCTS LIST DETAIL ||============================== //

interface ProductProps {
    product: ProductModel;
    rows: ProductModel[];
    page: number;
    rowsPerPage: number;
    handleChangePage: any;
    handleChangeRowsPerPage: any;
    emptyRows: any;
}

const ProductsListDetail = ({
    product,
    rows,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    emptyRows
}: ProductProps) => {
    // init theme
    const theme = useTheme();

    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        '& td': {
                            whiteSpace: 'nowrap'
                        },
                        '& td:first-of-type': {
                            pl: 0
                        },
                        '& td:last-of-type': {
                            pr: 0,
                            minWidth: 260
                        },
                        '& tbody tr:last-of-type  td': {
                            borderBottom: 'none'
                        },
                        [theme.breakpoints.down('xl')]: {
                            '& tr:not(:last-of-type)': {
                                borderBottom: '1px solid',
                                borderBottomColor:
                                    theme.palette.mode === 'dark' ? 'rgb(132, 146, 196, .2)' : 'rgba(224, 224, 224, 1)'
                            },
                            '& td': {
                                display: 'inline-block',
                                borderBottom: 'none',
                                pl: 0
                            },
                            '& td:first-of-type': {
                                display: 'block'
                            }
                        }
                    }}
                >
                    <TableBody>
                        {rows &&
                            rows.length &&
                            rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: ProductModel, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <Avatar
                                                        alt='Product Image'
                                                        src={
                                                            product?.images[
                                                                Math.floor(Math.random() * product?.images.length)
                                                            ]
                                                        }
                                                        sx={{ width: 60, height: 60 }}
                                                    />
                                                </Grid>
                                                <Grid item sm zeroMinWidth>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12}>
                                                            <Typography align='left' variant='subtitle1'>
                                                                {product?.name}{' '}
                                                                {!product?.isDeleted && (
                                                                    <CheckCircleIcon
                                                                        sx={{
                                                                            color: 'success.dark',
                                                                            width: 14,
                                                                            height: 14
                                                                        }}
                                                                    />
                                                                )}
                                                            </Typography>
                                                            <Typography
                                                                align='left'
                                                                variant='subtitle2'
                                                                sx={{ whiteSpace: 'break-spaces' }}
                                                            >
                                                                {product?.description}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography
                                                                align='left'
                                                                variant='body2'
                                                                sx={{ whiteSpace: 'break-spaces' }}
                                                            >
                                                                {`Size: ${row?.size}`}, {`Color: ${row?.color}`}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>

                                        <TableCell>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant='caption'>Price</Typography>
                                                    <Typography variant='h5'>{row?.price}$</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant='caption'>Discount</Typography>
                                                    <Typography variant='h5'>{row?.discount}%</Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>

                                        <TableCell>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <Grid container>
                                                        <AvatarGroup
                                                            max={4}
                                                            sx={{
                                                                '& .MuiAvatar-root': {
                                                                    width: 32,
                                                                    height: 32,
                                                                    fontSize: '1rem'
                                                                }
                                                            }}
                                                        >
                                                            {product?.images.map((url: string) => (
                                                                <Avatar key={url} alt='User 1' src={url} />
                                                            ))}
                                                        </AvatarGroup>
                                                    </Grid>
                                                </Grid>
                                                <Grid item sm zeroMinWidth>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12}>
                                                            <Typography align='left' variant='subtitle1'>
                                                                {row?.id}{' '}
                                                                {!row?.isDeleted && (
                                                                    <CheckCircleIcon
                                                                        sx={{
                                                                            color: 'success.dark',
                                                                            width: 14,
                                                                            height: 14
                                                                        }}
                                                                    />
                                                                )}
                                                            </Typography>
                                                            <Typography
                                                                align='left'
                                                                variant='subtitle2'
                                                                sx={{ whiteSpace: 'break-spaces' }}
                                                            >
                                                                {}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography
                                                                align='left'
                                                                variant='body2'
                                                                sx={{ whiteSpace: 'break-spaces' }}
                                                            >
                                                                {`Sold out: ${row?.totalSold}`},{' '}
                                                                {`In stock: ${row?.totalQty}`}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>

                                        <TableCell>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <Grid container alignItems='center' spacing={gridSpacing}>
                                                        <Grid item>
                                                            <Typography variant='caption'>Progress</Typography>
                                                        </Grid>
                                                        <Grid item sm zeroMinWidth>
                                                            <LinearProgress
                                                                variant='determinate'
                                                                value={row?.totalSold}
                                                                color='primary'
                                                                sx={{ minWidth: 90 }}
                                                                aria-label='user-progress'
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant='h6' component='div'>
                                                                {`${row?.totalSold}/ ${row?.totalQty + row?.totalSold}`}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <Button
                                                            variant='outlined'
                                                            fullWidth
                                                            size='small'
                                                            sx={{ minWidth: 120 }}
                                                            startIcon={<ChatBubbleTwoToneIcon />}
                                                        >
                                                            View
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Button
                                                            variant='outlined'
                                                            color='error'
                                                            fullWidth
                                                            size='small'
                                                            sx={{ minWidth: 120 }}
                                                            startIcon={<BlockTwoToneIcon />}
                                                        >
                                                            Block
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                ))}
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
                count={(rows && rows.length) || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default ProductsListDetail;
