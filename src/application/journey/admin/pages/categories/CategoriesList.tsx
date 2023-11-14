// * import libs
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
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
    Tooltip
} from '@mui/material';

// assets
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import { IconSearch } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/AddTwoTone';

// * import projects
import { GetAllCategoryServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/getAll';
import { useDispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';
import { activeCategory } from '@ecommerce-frontend/src/infras/data/store/reducers/category';
import { DeleteCategoryServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/delete';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// import form category
import FormUpdateCategoryDialog from '@ecommerce-frontend/src/application/journey/admin/components/categories/FormUpdateDialog';
import { KeyedObject } from '@ecommerce-frontend/src/common/types';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import { ActiveCategoryServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/active';

// ==============================|| CATEGORY LIST ||============================== //

const CategoriesList = () => {
    /** init service */
    const getCategoryService = new GetAllCategoryServiceImpl();
    const deleteCategoryService = new DeleteCategoryServiceImpl();

    /** init theme */
    const theme = useTheme();
    const { pageLoading } = useSelector((state) => state.page);

    const { categories } = useSelector((state) => state.category);
    const [rows, setRows] = React.useState<CategoryModel[]>(Object.values(categories));
    React.useEffect(() => {
        setRows(Object.values(categories));
    }, [pageLoading]);

    /** init hooks */
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // init variables
    const [open, setOpen] = React.useState<boolean>(false);

    /** init fetch list users */
    React.useEffect(() => {
        // * execute getAll accounts
        getCategoryService.execute();
    }, []);

    // handle update category
    const handleUpdateCategory = async (item: CategoryModel) => {
        dispatch(activeCategory(item));
        setOpen(true);
    };

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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.values(categories).length) : 0;

    // handle search user
    const [search, setSearch] = React.useState<string>('');
    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = Object.values(categories).filter((row: KeyedObject) => {
                let matches = true;

                const properties = ['name', 'id'];
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
            setRows(Object.values(categories));
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
                                placeholder='Search Category'
                                value={search}
                                size='small'
                            />
                        </Grid>
                        <Grid item>
                            <Tooltip title='Add new category'>
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
                                    <FormattedMessage id='category-name' />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id='category-image' />
                                </TableCell>
                                <TableCell sx={{ pr: 3 }}>
                                    <FormattedMessage id='category-status' />
                                </TableCell>
                                <TableCell align='center' sx={{ pr: 3 }}>
                                    <FormattedMessage id='category-actions' />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item: CategoryModel, index: number) => {
                                    return (
                                        <TableRow hover key={item?.id}>
                                            <TableCell sx={{ pl: 3 }}>{item?.id}</TableCell>
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
                                                            onClick={() => handleUpdateCategory(item)}
                                                        >
                                                            <EditIcon sx={{ fontSize: '1.1rem' }} />
                                                        </IconButton>
                                                    </Tooltip>

                                                    {!item?.isDeleted ? (
                                                        <Tooltip placement='top' title='Block Category'>
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
                                                                    await deleteCategoryService.execute(item?.id);
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
                                                                    // handle active account
                                                                    const service = new ActiveCategoryServiceImpl();
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

            <Grid container justifyContent='center'>
                <FormUpdateCategoryDialog open={open} setOpen={setOpen} />
            </Grid>
        </>
    );
};

export default CategoriesList;
