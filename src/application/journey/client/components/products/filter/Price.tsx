import { useEffect, useState } from 'react';

// material-ui
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Skeleton } from '@mui/material';

// ==============================|| PRODUCT GRID - PRICE FILTER ||============================== //

const Price = ({
    price,
    handelFilter
}: {
    price: string;
    handelFilter: (type: string, params: { id: string; value: string }) => void;
}) => {
    const [isPriceLoading, setPriceLoading] = useState(true);
    useEffect(() => {
        setPriceLoading(false);
    }, []);

    return (
        <>
            {isPriceLoading ? (
                <Skeleton variant='rectangular' width='100%' height={172} />
            ) : (
                <FormControl component='fieldset'>
                    <RadioGroup
                        row
                        aria-label='layout'
                        value={price}
                        onChange={(e) => handelFilter('price', { id: '', value: e.target.value })}
                        name='row-radio-buttons-group'
                    >
                        <Grid container spacing={0.25}>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    value='0-10'
                                    control={<Radio />}
                                    label='Below $10'
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    value='10-50'
                                    control={<Radio />}
                                    label='$10 - $50'
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    value='50-100'
                                    control={<Radio />}
                                    label='$50 - $100'
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    value='100-150'
                                    control={<Radio />}
                                    label='$100 - $150'
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    value='150-200'
                                    control={<Radio />}
                                    label='$150 - $200'
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    value='200-99999'
                                    control={<Radio />}
                                    label='Over $200'
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </RadioGroup>
                </FormControl>
            )}
        </>
    );
};

export default Price;
