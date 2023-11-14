// import libs
import React from 'react';

// import material ui
import { Grid, InputAdornment, MenuItem, TextField, useTheme } from '@mui/material';

// import projects
import ColorsOptions from '@ecommerce-frontend/src/application/journey/client/components/products/filter/ColorOptions';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// ==============================|| CARD SIZE ADD PRODUCT ||============================== //

// product size options
const sizes = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' }
];

interface CardSizeProps {
    item: any;
    handleOnChangeTextFields: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        id: string,
        field: string
    ) => void;
}

const ProductCardAddSize = ({ item, handleOnChangeTextFields, ...others }: CardSizeProps) => {
    // init theme
    const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
            <Grid item md={6} xs={12}>
                <TextField
                    type='number'
                    label='Price*'
                    id={`filled-start-adornment1-${item?.id}`}
                    name={`${item?.price}-${item?.id}`}
                    InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
                    value={item?.price}
                    onChange={(e) => handleOnChangeTextFields(e, item?.id, 'price')}
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField
                    type='number'
                    id={`outlined-basic5-${item?.id}`}
                    name={`${item?.totalQty}-${item?.id}`}
                    fullWidth
                    label='Quantity*'
                    value={item?.totalQty}
                    onChange={(e) => handleOnChangeTextFields(e, item?.id, 'totalQty')}
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField
                    type='number'
                    label='Discount'
                    id={`filled-start-adornment2-${item?.id}`}
                    name={`${item?.discount}-${item?.id}`}
                    InputProps={{ startAdornment: <InputAdornment position='start'>%</InputAdornment> }}
                    value={item?.discount}
                    onChange={(e) => handleOnChangeTextFields(e, item?.id, 'discount')}
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField
                    id={`standard-select-currency-${item?.id}`}
                    name={`${item?.size}-${item?.id}`}
                    select
                    label='Size*'
                    value={item?.size}
                    fullWidth
                    onChange={(e) => handleOnChangeTextFields(e, item?.id, 'size')}
                >
                    {sizes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id={`standard-select-currency-${item?.id}`}
                    name={`${item?.color}-${item?.id}`}
                    select
                    label='Color*'
                    value={item?.color}
                    fullWidth
                    onChange={(e) => handleOnChangeTextFields(e, item?.id, 'color')}
                >
                    {ColorsOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    );
};

export default ProductCardAddSize;
