// import libs
import React from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import {
    AvatarGroup,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Fab,
    Grid,
    IconButton,
    LinearProgress,
    LinearProgressProps,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';

// import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import AddIcon from '@mui/icons-material/AddTwoTone';

// assets
import { IconEdit } from '@tabler/icons-react';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import { GetAllProductSizeServiceImpl } from '@ecommerce-frontend/src/domain/services/product/getAllSize';
import { GetProductByIdServiceImpl } from '@ecommerce-frontend/src/domain/services/product/getById';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import ProductAddSize from '@ecommerce-frontend/src/application/journey/admin/components/products/ProductSize';

// ==============================|| ADMIN PRODUCT DETAIL PAGE ||============================== //

const ProductDetail = () => {
    /** init services */
    const getAllProductSizeService = new GetAllProductSizeServiceImpl();
    const getProductByIdService = new GetProductByIdServiceImpl();

    /** init hooks */
    const { productSelect, productSizes } = useSelector((state) => state.product);
    const { id } = useParams();

    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    /** useEffect */
    React.useEffect(() => {
        getAllProductSizeService.execute(id);
        getProductByIdService.execute(id);
    }, []);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={4} xs={12}>
                    <MainCard
                        title={
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item>
                                    <AvatarGroup max={3}>
                                        {productSelect?.images && productSelect?.images.length ? (
                                            productSelect?.images.map((image: string) => {
                                                return <Avatar key={image} alt={image} src={image} />;
                                            })
                                        ) : (
                                            <></>
                                        )}
                                    </AvatarGroup>
                                </Grid>
                                <Grid item xs zeroMinWidth></Grid>
                                <Grid item>
                                    <Chip size='small' label='Sales' color='primary' />
                                </Grid>
                            </Grid>
                        }
                    >
                        <List component='nav' aria-label='main mailbox folders'>
                            <ListItemButton>
                                <ListItemText primary={<Typography variant='subtitle1'>Product Name</Typography>} />
                                <ListItemSecondaryAction>
                                    <Typography variant='subtitle2' align='right'>
                                        {productSelect?.name}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItemButton>
                            <Divider />
                            <ListItemButton>
                                <ListItemText primary={<Typography variant='subtitle1'>Description</Typography>} />
                                <ListItemSecondaryAction>
                                    <Typography variant='subtitle2' align='right'>
                                        {productSelect?.description}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItemButton>
                            <Divider />
                            <ListItemButton>
                                <ListItemText primary={<Typography variant='subtitle1'>Category Name</Typography>} />
                                <ListItemSecondaryAction>
                                    <Typography variant='subtitle2' align='right'>
                                        {productSelect?.category?.name}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItemButton>
                            <Divider />
                        </List>
                        <CardContent>
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <Typography align='center' variant='h3'>
                                        37
                                    </Typography>
                                    <Typography align='center' variant='subtitle2'>
                                        Total Quantity
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography align='center' variant='h3'>
                                        20
                                    </Typography>
                                    <Typography align='center' variant='subtitle2'>
                                        Total Sold
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </MainCard>
                </Grid>
                <Grid item lg={8} xs={12}>
                    <MainCard
                        title='List Products Sizes'
                        contentSX={{ padding: 1 }}
                        secondary={
                            <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                                <Tooltip title='Add Size'>
                                    <Fab
                                        color='primary'
                                        size='small'
                                        onClick={handleClickOpenDialog}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <AddIcon fontSize='small' />
                                    </Fab>
                                </Tooltip>
                                <ProductAddSize open={open} handleCloseDialog={handleCloseDialog} />
                            </Grid>
                        }
                    >
                        {Object.values(productSizes).length ? (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>Size</TableCell>
                                            <TableCell align='center'>TotalQty</TableCell>
                                            <TableCell align='center'>TotalSold</TableCell>
                                            <TableCell align='center'>Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.values(productSizes).map((product: ProductModel, index: number) => {
                                            return (
                                                <TableRow key={`${product?.id}-${index}`}>
                                                    <TableCell align='center'>{product?.size}</TableCell>
                                                    <TableCell align='center'>{product?.totalQty}</TableCell>
                                                    <TableCell align='center'>{product?.totalSold}</TableCell>
                                                    <TableCell align='center'>{product?.price}</TableCell>
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
                    </MainCard>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductDetail;
