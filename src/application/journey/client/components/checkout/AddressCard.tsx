// material-ui
import { Button, IconButton, Grid, Stack, Typography } from '@mui/material';

// project imports
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

// import redux
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';

// ==============================|| CHECKOUT BILLING ADDRESS - ADDRESS CARD ||============================== //

interface AddressCardProps {
    single?: boolean;
    change?: boolean;
    onBack?: () => void;
}

const AddressCard = ({ single, change, onBack }: AddressCardProps) => {
    /** init billing address */
    const { billingAddress } = useSelector((state) => state.cart.checkout);
    const { account } = useSelector((state) => state.account);
    return (
        <>
            <SubCard sx={{ height: single ? 'auto' : '100%' }}>
                <Grid container spacing={2}>
                    {single && (
                        <Grid item xs={12}>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant={change ? 'h3' : 'h3'}>Shipping Address</Typography>
                                {change && (
                                    <Button
                                        variant='contained'
                                        size='small'
                                        color='primary'
                                        startIcon={<EditTwoToneIcon />}
                                        onClick={onBack}
                                    >
                                        Change
                                    </Button>
                                )}
                            </Stack>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Stack direction='row' alignItems='center' spacing={0.5}>
                                <Typography variant='subtitle1'>{billingAddress?.name}</Typography>
                                <Typography variant='caption' sx={{ textTransform: 'capitalize' }}>
                                    ({billingAddress?.address})
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={0.5}>
                            <Typography variant='body2'>{billingAddress?.address}</Typography>
                            <Typography variant='caption' color='secondary'>
                                {account?.phoneNo}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </SubCard>
        </>
    );
};

export default AddressCard;
