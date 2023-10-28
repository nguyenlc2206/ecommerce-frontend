// import lib
import React from 'react';
import { FormattedMessage } from 'react-intl';

// import material ui
import { CardContent, Fab, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';

// * import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import ProductAdd from '@ecommerce-frontend/src/application/journey/admin/components/products/ProductAdd';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import ProductList from '@ecommerce-frontend/src/application/journey/admin/components/products/ProductList';

// ==============================|| ADMIN PRODUCTS PAGE ||============================== //

const AdminProducts = () => {
    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    /** useEffect */
    React.useEffect(() => {}, []);

    return (
        <MainCard title={<FormattedMessage id='products' />} contentSX={{ padding: 0 }}>
            <CardContent>
                <Grid container justifyContent='space-between' alignItems='center' spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchIcon fontSize='small' />
                                    </InputAdornment>
                                )
                            }}
                            onChange={() => {}}
                            placeholder='Search Product'
                            value={''}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        <Tooltip title='Filter'>
                            <IconButton size='large'>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Add Product'>
                            <Fab
                                color='primary'
                                size='small'
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize='small' />
                            </Fab>
                        </Tooltip>
                        <ProductAdd open={open} handleCloseDialog={handleCloseDialog} />
                    </Grid>
                </Grid>
            </CardContent>

            <ProductList />
        </MainCard>
    );
};

export default AdminProducts;
