// import libs
import React, { ReactElement, SyntheticEvent, forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

// import material ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Button,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Fab,
    Grid,
    InputLabel,
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/AddTwoTone';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import { CreateProductServiceImpl } from '@ecommerce-frontend/src/domain/services/product/create';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

// ==============================|| PRODUCT ADD DIALOG ||============================== //

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

// styles
const ImageWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
    cursor: 'pointer',
    width: 55,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    '& > svg': {
        verticalAlign: 'sub',
        marginRight: 6
    }
}));

// animation
const Transition = forwardRef((props: SlideProps, ref) => <Slide direction='left' ref={ref} {...props} />);

interface ProductAddProps {
    open: boolean;
    handleCloseDialog: (e: SyntheticEvent) => void;
}

const ProductAddDialog = ({ open, handleCloseDialog, ...others }: ProductAddProps) => {
    // init theme
    const theme = useTheme();
    const { categories } = useSelector((state) => state.category);
    const { pageLoading } = useSelector((state) => state.page);
    // handle category change dropdown
    const [currencyCateogry, setCurrencyCateogry] = React.useState(Object.values(categories)[0]?.id);
    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        event?.target.value && setCurrencyCateogry(event?.target.value);
    };

    // handle upload images
    const uploadInputRef = React.useRef(null);
    const [images, setImages] = React.useState<Array<string | ArrayBuffer>>([]);
    const [arrayImages, setArrayImages] = React.useState<Array<string | ArrayBuffer>>([]);
    /** chandle convert base64 to url */
    const base64ToBlob = (base64: string, contentType = 'image/png', chunkLength = 512) => {
        const byteCharsArray = Array.from(atob(base64.substr(base64.indexOf(',') + 1)));
        const chunksIterator = new Array(Math.ceil(byteCharsArray.length / chunkLength));
        const bytesArrays = [];

        for (let c = 0; c < chunksIterator.length; c++) {
            bytesArrays.push(
                new Uint8Array(byteCharsArray.slice(c * chunkLength, chunkLength * (c + 1)).map((s) => s.charCodeAt(0)))
            );
        }
        const blob = new Blob(bytesArrays, { type: contentType });
        return blob;
    };

    /** handle upload image  */
    const handleUploadImage = ({ target }) => {
        setImages(target.files);

        const arrImagesClone = _.cloneDeep(arrayImages);
        Array.from(target.files).map((item: any) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(item);
            fileReader.onload = (e) => {
                const blob = base64ToBlob(e.target.result as string);
                const blobUrl = URL.createObjectURL(blob);
                arrImagesClone.push(blobUrl);
                setArrayImages(arrImagesClone);
            };
        });
    };

    // handle fields
    const [nameProduct, setNameProduct] = React.useState<string>('');
    const [descriptionProduct, setDescriptionProduct] = React.useState<string>('');

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

    // handle add size
    const handleAddSize = () => {
        const newSize = { id: uuidv4(), price: 0, totalQty: 0, discount: 0, size: 'S', color: 'yellow' };
        const sizesClone: any = _.cloneDeep(listSizes);
        sizesClone.push(newSize);
        setListSizes(sizesClone);
    };

    // handle create new product
    const handleCreateNewProduct = async () => {
        // console.log(currencyCateogry, nameProduct, descriptionProduct, listSizes, images);
        const _sizes = listSizes.map((item: any) => JSON.stringify(_.omit(item, ['id'])));
        const data = {
            name: nameProduct,
            description: descriptionProduct,
            images: images,
            categoryId: currencyCateogry,
            sizes: _sizes
        } as ProductModel;
        const service = new CreateProductServiceImpl();
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
                                    value={nameProduct}
                                    onChange={(e) => setNameProduct(e.target.value)}
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
                                    value={descriptionProduct}
                                    onChange={(e) => setDescriptionProduct(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id='standard-select-currency'
                                    name='standard-select-currency-category'
                                    select
                                    label='Select Category*'
                                    value={currencyCateogry}
                                    fullWidth
                                    onChange={handleSelectChange}
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
                                                <Grid item>
                                                    <Tooltip title='Add size'>
                                                        <Fab
                                                            color='primary'
                                                            size='small'
                                                            onClick={handleAddSize}
                                                            sx={{
                                                                boxShadow: 'none',
                                                                ml: 1,
                                                                width: 32,
                                                                height: 32,
                                                                minHeight: 32
                                                            }}
                                                        >
                                                            <AddIcon fontSize='small' />
                                                        </Fab>
                                                    </Tooltip>
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
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant='subtitle1' align='left'>
                                            Product Images*
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div>
                                            <TextField
                                                ref={uploadInputRef}
                                                type='file'
                                                inputProps={{
                                                    multiple: true
                                                }}
                                                id='file-upload'
                                                fullWidth
                                                label='Enter SKU'
                                                sx={{ display: 'none' }}
                                                onChange={handleUploadImage}
                                            />
                                            <InputLabel
                                                htmlFor='file-upload'
                                                sx={{
                                                    background: theme.palette.background.default,
                                                    py: 2.0,
                                                    px: 0,
                                                    textAlign: 'center',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    mb: 3,
                                                    '& > svg': {
                                                        verticalAlign: 'sub',
                                                        mr: 0.5
                                                    }
                                                }}
                                            >
                                                <CloudUploadIcon /> Drop file here to upload
                                            </InputLabel>
                                        </div>
                                        <Grid container spacing={1}>
                                            {arrayImages.map((url: string) => {
                                                return (
                                                    <Grid key={url} item>
                                                        <ImageWrapper>
                                                            <CardMedia component='img' src={url} title='Product' />
                                                        </ImageWrapper>
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <AnimateButton>
                            <Button variant='contained' onClick={handleCreateNewProduct}>
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

export default ProductAddDialog;
