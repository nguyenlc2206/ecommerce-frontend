// * import libs
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
import CheckIcon from '@mui/icons-material/Check';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';

// * import projects
import { GetAllCategoryServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/getAll';
import { useDispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';
import { activeCategory } from '@ecommerce-frontend/src/infras/data/store/reducers/category';
import { DeleteCategoryServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/delete';

// ==============================|| CATEGORY LIST ||============================== //

const CategoryList = () => {
    /** init service */
    const getCategoryService = new GetAllCategoryServiceImpl();
    const deleteCategoryService = new DeleteCategoryServiceImpl();

    /** init theme */
    const theme = useTheme();
    const { categories } = useSelector((state) => state.category);

    /** init hooks */
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /** init fetch list users */
    React.useEffect(() => {
        // * execute getAll accounts
        getCategoryService.execute();
    }, []);

    return (
        <>
            {Object.values(categories).length ? (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }}>#</TableCell>
                                <TableCell>
                                    <FormattedMessage id='category-accountId' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='category-name' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='category-image' />
                                </TableCell>
                                <TableCell align='center' sx={{ pr: 3 }}>
                                    <FormattedMessage id='category-status' />
                                </TableCell>
                                <TableCell align='center' sx={{ pr: 3 }}>
                                    <FormattedMessage id='category-actions' />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(categories).map((item: CategoryModel, index: number) => {
                                return (
                                    <TableRow hover key={item?.id}>
                                        <TableCell sx={{ pl: 3 }}>{item?.id}</TableCell>
                                        <TableCell>{item?.accountId}</TableCell>
                                        <TableCell>{item?.name}</TableCell>
                                        <TableCell>
                                            <Grid container spacing={2} alignItems='center'>
                                                <Grid item>
                                                    <Avatar alt='User 1' src={item?.image as string} />
                                                </Grid>
                                            </Grid>
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
                                                            dispatch(activeCategory(item));
                                                            navigate(item?.id);
                                                        }}
                                                    >
                                                        <VisibilityTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                    </IconButton>
                                                </Tooltip>

                                                {!item?.isDeleted ? (
                                                    <Tooltip placement='top' title='Block'>
                                                        <IconButton
                                                            color='primary'
                                                            sx={{
                                                                color: theme.palette.orange.dark,
                                                                borderColor: theme.palette.orange.main,
                                                                '&:hover ': { background: theme.palette.orange.light }
                                                            }}
                                                            size='large'
                                                            onClick={() => deleteCategoryService.execute(item?.id)}
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

export default CategoryList;
