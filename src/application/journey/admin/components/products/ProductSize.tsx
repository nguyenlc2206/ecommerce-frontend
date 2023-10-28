// import libs
import React, { forwardRef, SyntheticEvent } from 'react';
import * as _ from 'lodash';

// material-ui
import { useTheme, Theme, styled } from '@mui/material/styles';
import {
    Button,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Slide,
    SlideProps,
    TextField,
    Typography
} from '@mui/material';

// project imports
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';

// assets
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { GetAllCategoryServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/getAll';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { CreateProductServiceImpl } from '@ecommerce-frontend/src/domain/services/product/create';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';

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

// product category options
const sizes = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' }
];

// ==============================|| PRODUCT ADD SIZE DIALOG ||============================== //

interface ProductAddProps {
    open: boolean;
    handleCloseDialog: (e: SyntheticEvent) => void;
}

const ProductAddSize = ({ open, handleCloseDialog }: ProductAddProps) => {
    /** init service */
    const getAllCategories = new GetAllCategoryServiceImpl();
    const createProduct = new CreateProductServiceImpl();

    /** init theme */
    const theme = useTheme();
    /** init hooks */
    const uploadInputRef = React.useRef(null);
    const { categories } = useSelector((state) => state.category);
    const [images, setImages] = React.useState<Array<string | ArrayBuffer>>([]);
    const [arrayImages, setArrayImages] = React.useState<Array<string | ArrayBuffer>>([]);

    const [nameProduct, setNameProduct] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [price, setPrice] = React.useState<string>('');
    const [discount, setDiscount] = React.useState<string>('');
    const [qty, setQty] = React.useState<string>('');

    // handle category change dropdown
    const [currency, setCurrency] = React.useState('');
    const handleSelectChangeCatetory = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
    ) => {
        event?.target.value && setCurrency(event?.target.value);
    };

    // handle size change dropdown
    const [size, setSize] = React.useState('');
    const handleSelectChangeSize = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        event?.target.value && setSize(event?.target.value);
    };

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
        const arrImagesClone = _.cloneDeep(arrayImages);
        const imageClone = _.cloneDeep(images);

        const fileReader = new FileReader();
        // const name = target.accept.includes('image') ? 'images' : 'videos';
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            imageClone.push(e.target.result);
            setImages(imageClone);
            const blob = base64ToBlob(e.target.result as string);
            const blobUrl = URL.createObjectURL(blob);
            arrImagesClone.push(blobUrl);
            setArrayImages(arrImagesClone);
        };
    };

    /** handle add product */
    const handleAddProduct = async () => {
        // console.log(arrayImages, nameProduct, description, currency, price, discount, qty, size);
        const dataCreate = {
            name: nameProduct,
            description: description,
            categoryId: currency,
            sizes: [{ size: size, price: Number(price), totalQty: Number(qty), discount: Number(discount) }],
            images: images
        } as ProductModel;
        // console.log(dataCreate);
        const response = await createProduct.execute(dataCreate);
        handleCloseDialog;
    };

    /** useEffect */
    React.useEffect(() => {
        getAllCategories.execute();
    }, []);

    React.useEffect(() => {}, [arrayImages]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            sx={{
                '&>div:nth-of-type(3)': {
                    justifyContent: 'flex-end',
                    '&>div': {
                        m: 0,
                        borderRadius: '0px',
                        maxWidth: 450,
                        minWidth: 400,
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
                                    id='outlined-basic1'
                                    fullWidth
                                    label='Enter Product Name*'
                                    value={nameProduct}
                                    onChange={(e) => setNameProduct(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='text' color='error' onClick={handleCloseDialog}>
                            Close
                        </Button>
                        <AnimateButton>
                            <Button variant='contained' onClick={handleAddProduct}>
                                Create
                            </Button>
                        </AnimateButton>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default ProductAddSize;
