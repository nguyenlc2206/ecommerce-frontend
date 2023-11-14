// import libs
import React, { ReactElement, SyntheticEvent, forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

// import material ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Fab,
    Grid,
    MenuItem,
    Slide,
    SlideProps,
    TextField,
    Tooltip,
    Typography,
    useScrollTrigger
} from '@mui/material';

// import projects
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';
import ProductCardAddSize from '@ecommerce-frontend/src/application/journey/admin/components/products/CardSize';

// assets
import AddIcon from '@mui/icons-material/AddTwoTone';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { CreateProductSizeServiceImpl } from '@ecommerce-frontend/src/domain/services/product/createSize';

// ==============================|| PRODUCT ADD DETAIL DIALOG ||============================== //

// sticky edit card
interface ElevationScrollProps {
    children: ReactElement;
    window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 230,
        target: window || undefined
    });

    return React.cloneElement(children, {
        style: {
            position: trigger ? 'fixed' : 'relative',
            top: trigger ? 83 : 0,
            width: trigger ? 318 : '100%'
        }
    });
}

// animation
const Transition = forwardRef((props: SlideProps, ref) => <Slide direction='left' ref={ref} {...props} />);

interface ProductAddProps {
    open: boolean;
    handleCloseDialog: (e: SyntheticEvent) => void;
}

const ProductAddDetailDialog = ({ open, handleCloseDialog, ...others }: ProductAddProps) => {
    // init theme
    const theme = useTheme();
    const { categories } = useSelector((state) => state.category);
    const { pageLoading } = useSelector((state) => state.page);
    const { productSelect } = useSelector((state) => state.product);

    // hanle list sizes
    const [listSizes, setListSizes] = React.useState([
        { id: uuidv4(), price: 0, totalQty: 0, discount: 0, size: 'S', color: 'yellow' }
    ]);

    // handle change textFields
    const handleOnChangeTextFields = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        id: string,
        field: string
    ) => {
        const sizesClone: any = _.cloneDeep(listSizes);
        _.set(_.find(sizesClone, { id: id }), field, event.target.value);
        setListSizes(sizesClone);
    };

    // handle create new product
    const handleCreateNewProductType = async () => {
        // prepare data
        const data = {
            productId: productSelect?.id,
            size: listSizes[0]?.size,
            price: Number(listSizes[0]?.price),
            totalQty: Number(listSizes[0]?.totalQty),
            discount: Number(listSizes[0]?.discount),
            color: listSizes[0]?.color
        } as ProductModel;
        const service = new CreateProductSizeServiceImpl();
        const res = await service.execute(data);
        handleCloseDialog;
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
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                            <Grid item xs={12}>
                                <TextField
                                    id='add-product-outlined-basic1'
                                    name='add-product-outlined-basic1-name'
                                    fullWidth
                                    label='Enter Product Name*'
                                    disabled
                                    defaultValue={productSelect?.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id='add-product-outlined-basic2'
                                    name='add-product-outlined-basic2-description'
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label='Enter Product Description'
                                    disabled
                                    defaultValue={productSelect?.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id='standard-select-currency'
                                    name='standard-select-currency-category'
                                    select
                                    label='Select Category*'
                                    value={productSelect?.category?.id}
                                    fullWidth
                                    disabled
                                >
                                    {Object.values(categories).map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <ElevationScroll {...others}>
                                    <SubCard
                                        sx={{
                                            background: theme.palette.grey[50],
                                            width: '100%'
                                        }}
                                        title={
                                            <Grid
                                                container
                                                alignItems='center'
                                                justifyContent='space-between'
                                                spacing={gridSpacing}
                                            >
                                                <Grid item>
                                                    <Typography variant='h4'>Sizes</Typography>
                                                </Grid>
                                            </Grid>
                                        }
                                        content={false}
                                    >
                                        <PerfectScrollbar>
                                            {listSizes.map((item: any, index: number) => {
                                                return (
                                                    <div key={index}>
                                                        {' '}
                                                        <ProductCardAddSize
                                                            item={item}
                                                            handleOnChangeTextFields={handleOnChangeTextFields}
                                                        />
                                                        <Divider />
                                                    </div>
                                                );
                                            })}
                                        </PerfectScrollbar>
                                    </SubCard>
                                </ElevationScroll>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <AnimateButton>
                            <Button variant='contained' onClick={handleCreateNewProductType}>
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

export default ProductAddDetailDialog;
