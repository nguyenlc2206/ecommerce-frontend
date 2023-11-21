// import libs
import React, { SyntheticEvent, forwardRef } from 'react';
import * as _ from 'lodash';

// import material ui
import { useTheme } from '@mui/material/styles';
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Slide,
    SlideProps,
    TextField
} from '@mui/material';

// import projects
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';

// import redux
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import CustomDateTime from '@ecommerce-frontend/src/application/widgets/dateTime/CustomDateTime';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { CreateCouponServiceImpl } from '@ecommerce-frontend/src/domain/services/coupon/create';
import { CouponModel } from '@ecommerce-frontend/src/domain/entities/Coupon';

// ==============================|| COUPON ADD DIALOG ||============================== //

// animation
const Transition = forwardRef((props: SlideProps, ref) => <Slide direction='left' ref={ref} {...props} />);

interface ProductAddProps {
    open: boolean;
    handleCloseDialog: (e: SyntheticEvent) => void;
    codeNumber: string;
}

interface FilmOptionType {
    label: string;
    id: string;
}

type Item = {
    title: string;
    id: string;
    value?: Date;
    setValue?: React.Dispatch<React.SetStateAction<Date>>;
};

const CouponAddDialog = ({ open, handleCloseDialog, codeNumber, ...others }: ProductAddProps) => {
    // init theme
    const theme = useTheme();
    const { pageLoading } = useSelector((state) => state.page);
    const { users } = useSelector((state) => state.user);
    const [top100Users, setTop100Users] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        let _users: Array<any> = [];
        Object.values(users).map((item: any) => _users.push({ id: item?.id, label: item?.email }));
        setTop100Users(_users);
    }, []);

    const defaultProps = {
        options: top100Users,
        getOptionLabel: (option: FilmOptionType) => option.label
    };
    const [value, setValue] = React.useState<FilmOptionType | null>(null);

    // handle fields
    const [discount, setDiscount] = React.useState<string>('');

    /** define items input of login */
    const [startDate, setStartDate] = React.useState<Date>(new Date('2023-11-20T00:00:00'));
    const [endDate, setEndDate] = React.useState<Date>(new Date('2023-11-21T00:00:00'));
    const dateTimeInputCoupon: Array<Item> = [
        {
            title: 'Start Date',
            id: 'startDate',
            value: startDate,
            setValue: setStartDate
        },
        {
            title: 'End Date',
            id: 'endDate',
            value: endDate,
            setValue: setEndDate
        }
    ];

    // handle create new coupon
    const handleCreateNewCoupon = async () => {
        let dataCreate = {} as CouponModel;
        if (value && value?.id) {
            dataCreate = {
                code: codeNumber,
                discount: discount,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                accountId: value?.id
            } as CouponModel;
        } else {
            dataCreate = {
                code: codeNumber,
                discount: discount,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            } as CouponModel;
        }
        // init service
        const service = new CreateCouponServiceImpl();
        const res = await service.execute(dataCreate);
    };

    React.useEffect(() => {}, [pageLoading]);

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            TransitionComponent={Transition}
            keepMounted
            sx={{
                '&>div:nth-of-type(3)': {
                    justifyContent: 'flex-end',
                    '&>div': {
                        m: 0,
                        borderRadius: '0px',
                        maxWidth: 450,
                        maxHeight: '100%',
                        height: '100vh'
                    }
                }
            }}
        >
            {open && (
                <>
                    <DialogTitle>Add Coupon</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                            <Grid item xs={12}>
                                <TextField
                                    id='add-coupon-outlined-basic1'
                                    name='add-coupon-outlined-basic1-code'
                                    fullWidth
                                    label='Enter Coupon Name*'
                                    defaultValue={codeNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='number'
                                    id='outlined-basic5-discount'
                                    name='outlined-basic5-discount-name'
                                    fullWidth
                                    label='Discount*'
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                />
                            </Grid>

                            {dateTimeInputCoupon.map((item: Item, index: number) => {
                                return (
                                    <Grid key={index} item xs={12}>
                                        <CustomDateTime
                                            title={item?.title}
                                            id={item?.id}
                                            value={item?.value}
                                            setValue={item?.setValue}
                                        />
                                    </Grid>
                                );
                            })}

                            {top100Users.length && (
                                <Grid item xs={12}>
                                    <Autocomplete
                                        {...defaultProps}
                                        disablePortal
                                        value={value}
                                        onChange={(event: any, newValue: FilmOptionType | null) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} label='Account' />}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <AnimateButton>
                            <Button variant='contained' onClick={handleCreateNewCoupon}>
                                Create
                            </Button>
                        </AnimateButton>
                        <Button variant='text' color='error' onClick={handleCloseDialog}>
                            Close
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default CouponAddDialog;
