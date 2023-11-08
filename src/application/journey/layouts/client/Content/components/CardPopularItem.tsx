// import libs
import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Card, Grid, IconButton, ListItemIcon, Menu, MenuItem, Rating, Stack, Typography } from '@mui/material';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';

import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// ==============================|| CARD PRODUCT POPULAR ITEM ||============================== //

const ProductPopularItem = ({ image, name, rating, offerPrice, salePrice, soldOut }: any) => {
    /** init theme */
    const theme = useTheme();

    const [productRating] = React.useState<number | undefined>(rating);
    const [anchorEl, setAnchorEl] = React.useState<any>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card
            sx={{
                p: 2,
                background: theme.palette.grey[50],
                border: '1px solid',
                borderColor: theme.palette.grey[100],
                '&:hover': {
                    border: `1px solid${theme.palette.primary.main}`
                }
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item>
                            <Avatar sx={{ height: 72, width: 72 }} alt='Image' src={image} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography
                                variant='h5'
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    display: 'block'
                                }}
                            >
                                {name}
                            </Typography>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Grid container spacing={0.5}>
                                    <Grid item>
                                        <Rating
                                            sx={{ mt: 0.75 }}
                                            precision={0.5}
                                            name='size-small'
                                            value={productRating}
                                            size='small'
                                            readOnly
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='h6' component='div' color='secondary'>
                                            {soldOut} Sold
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack sx={{ mt: 0.75 }} direction='row' justifyContent='space-between' alignItems='center'>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Typography variant='h4'>${offerPrice}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant='h6'
                                            sx={{ color: 'grey.500', textDecoration: 'line-through' }}
                                        >
                                            ${salePrice}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <IconButton
                                size='small'
                                sx={{ mt: -0.75, mr: -0.75 }}
                                onClick={handleClick}
                                aria-label='more-options'
                            >
                                <MoreHorizOutlinedIcon
                                    fontSize='small'
                                    color='primary'
                                    aria-controls='menu-friend-card'
                                    aria-haspopup='true'
                                    sx={{ opacity: 0.6 }}
                                />
                            </IconButton>
                            <Menu
                                id='menu-friend-card'
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant='selectedMenu'
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <FavoriteTwoToneIcon fontSize='small' />
                                    </ListItemIcon>
                                    Favorites
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <GroupTwoToneIcon fontSize='small' />
                                    </ListItemIcon>
                                    Buy Product
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProductPopularItem;
