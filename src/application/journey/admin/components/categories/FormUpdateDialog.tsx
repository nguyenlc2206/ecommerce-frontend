// import libs
import React from 'react';

// import material ui
import { useTheme } from '@mui/material/styles';
import { Button, Typography, Grid, Dialog, DialogProps, TextField } from '@mui/material';

import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import { UpdateCategoryServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/update';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

// ===============================|| FORM UPDATE CATEGORY DIALOG - FORMS ||=============================== //

interface FormProps {
    category: CategoryModel;
    open: boolean;
    setOpen: (value: boolean) => void;
}

const FormUpdateCategoryDialog = ({ category, open, setOpen }: FormProps) => {
    React.useEffect(() => {
        setName(category?.name);
    }, [category]);
    /** init theme */
    const theme = useTheme();
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('md');

    /** init variable redux */
    const { pageLoading: loading } = useSelector((state) => state.page);

    /** init hooks */
    const uploadInputRef = React.useRef(null);
    const [image, setImage] = React.useState<any>('');
    const [imageURL, setImageURL] = React.useState<string>('');

    const [name, setName] = React.useState<string>(category?.name);

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
        setImage(target.files[0]);
        const fileReader = new FileReader();
        // const name = target.accept.includes('image') ? 'images' : 'videos';
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            const blob = base64ToBlob(e.target.result as string);
            const blobUrl = URL.createObjectURL(blob);
            setImageURL(blobUrl);
        };
    };

    // hanle update category
    const hanleUpdateCategory = async () => {
        setOpen(false);
        const data: CategoryModel = { id: category?.id, name: name, image: image ? image : null };
        const service = new UpdateCategoryServiceImpl();
        const res = await service.execute(data);
        dispatch(setLoading(false));
    };

    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='responsive-dialog-title'
            >
                {open && (
                    <>
                        {/* <DialogTitle id='responsive-dialog-title'>Edit Category</DialogTitle> */}
                        <DialogContent>
                            <SubCard title='Category Detail' contentSX={{ textAlign: 'center' }}>
                                <Grid container spacing={3}>
                                    {category?.name && (
                                        <Grid item xs={12}>
                                            <TextField
                                                id='category-outlined-basic5'
                                                fullWidth
                                                label='Name'
                                                value={name || ''}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </Grid>
                                    )}
                                    {(category?.image || imageURL) && (
                                        <Grid item xs={12} sx={{ mt: 2 }}>
                                            <Avatar
                                                alt='Image Category'
                                                src={imageURL ? imageURL : category?.image}
                                                sx={{ width: 125, height: 125, margin: '0 auto' }}
                                            />
                                        </Grid>
                                    )}
                                    <Grid item xs={12}>
                                        <Typography variant='subtitle2' align='center'>
                                            Upload/Change Your Category Image
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <input
                                            ref={uploadInputRef}
                                            accept='image/*'
                                            type='file'
                                            hidden
                                            id='category-icon-button-file'
                                            onChange={handleUploadImage}
                                        />
                                        <label htmlFor='category-icon-button-file'>
                                            <AnimateButton>
                                                <Button
                                                    onClick={() =>
                                                        uploadInputRef.current && uploadInputRef.current.click()
                                                    }
                                                    variant='contained'
                                                    size='small'
                                                >
                                                    Upload Image
                                                </Button>
                                            </AnimateButton>
                                        </label>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </DialogContent>
                        <DialogActions sx={{ pr: 2.5 }}>
                            <AnimateButton>
                                <Button
                                    disabled={loading}
                                    variant='contained'
                                    size='large'
                                    onClick={hanleUpdateCategory}
                                    autoFocus
                                >
                                    Update
                                </Button>
                            </AnimateButton>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
};

export default FormUpdateCategoryDialog;
