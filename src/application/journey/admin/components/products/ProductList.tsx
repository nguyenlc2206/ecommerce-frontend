// import libs
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AvatarGroup,
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

// import projects
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { GetAllProductServiceImpl } from '@ecommerce-frontend/src/domain/services/product/getAll';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';

// assets
import CheckIcon from '@mui/icons-material/Check';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import { activeProduct } from '@ecommerce-frontend/src/infras/data/store/reducers/product';

// ==============================|| PRODUCT LIST ||============================== //

const ProductList = () => {
    /** init services */
    const getAllProducts = new GetAllProductServiceImpl();
    /** init theme */
    const theme = useTheme();
    /** init hooks */
    const navigate = useNavigate();
    const { products } = useSelector((state) => state.product);

    React.useEffect(() => {
        getAllProducts.execute();
    }, []);

    return (
        <>
            {Object.values(products)?.length ? (
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
                                {/* <TableCell>
                                    <FormattedMessage id='product-description' />
                                </TableCell> */}
                                <TableCell>
                                    <FormattedMessage id='product-size' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='product-category' />
                                </TableCell>

                                <TableCell align='center' sx={{ pr: 3 }}>
                                    <FormattedMessage id='product-status' />
                                </TableCell>
                                <TableCell align='center' sx={{ pr: 3 }}>
                                    <FormattedMessage id='product-actions' />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(products).map((product: ProductModel, index: number) => {
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
                                        {/* <TableCell>{product?.description}</TableCell> */}
                                        <TableCell>{product?.sizes.join(',')}</TableCell>
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
                                                                '&:hover ': { background: theme.palette.orange.light }
                                                            }}
                                                            size='large'
                                                            onClick={() => {}}
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
                                                            onClick={() => {}}
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

export default ProductList;
