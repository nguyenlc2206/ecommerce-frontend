// * import libs
import React from 'react';
import { FormattedMessage } from 'react-intl';

// third party
import * as Yup from 'yup';
import { useFormik } from 'formik';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';

import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';
import { LoadingButton } from '@mui/lab';
import { CreateCategoryServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/create';
import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';
import useScriptRef from '@ecommerce-frontend/src/common/hooks/useScriptRef';

// ===============================|| UI DIALOG - FORMS ||=============================== //

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = Yup.object({
    name: Yup.string().max(255).required('Name is required!')
});

export default function CategoryFormDialog() {
    /** init hooks */
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const uploadInputRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState<string | ArrayBuffer>('');
    const [imageURL, setImageURL] = React.useState<string>('');

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
        const fileReader = new FileReader();
        // const name = target.accept.includes('image') ? 'images' : 'videos';
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setImage(e.target.result);
            const blob = base64ToBlob(e.target.result as string);
            const blobUrl = URL.createObjectURL(blob);
            setImageURL(blobUrl);
        };
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            submit: null
        },
        validationSchema,
        onSubmit: async (values) => {
            /** init service */
            const createCategory = new CreateCategoryServiceImpl();
            const data = {
                image: image,
                name: values.name
            } as CategoryModel;

            /** execute service */
            const response = await createCategory.execute(data);
            if (response.isFailure() && scriptedRef.current) {
                formik.setStatus({ success: false });
                formik.setErrors({ submit: response.error.message });
                formik.setSubmitting(false);
                return;
            }

            if (scriptedRef.current) {
                formik.setStatus({ success: true });
                formik.setSubmitting(false);
                setOpen(false);
            }
        }
    });

    const handleSubmit = async () => {
        formik.handleSubmit();
    };

    return (
        <div>
            <Button variant='contained' startIcon={<PersonAddTwoToneIcon />} onClick={() => setOpen(true)}>
                <FormattedMessage id='category-add' />
            </Button>
            <form noValidate onSubmit={formik.handleSubmit}>
                <Dialog
                    open={open}
                    fullWidth={true}
                    maxWidth='sm'
                    onClose={() => setOpen(false)}
                    aria-labelledby='form-dialog-title'
                >
                    {open && (
                        <>
                            <DialogTitle id='form-dialog-title'>Add Category</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2} sx={{ mt: 0.1, textAlign: 'center' }}>
                                    <Grid item xs={12}>
                                        <Avatar
                                            src={imageURL}
                                            alt='User 1'
                                            sx={{ width: 100, height: 100, margin: '0 auto' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant='subtitle2' align='center'>
                                            Upload Your Category Image
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <input
                                            ref={uploadInputRef}
                                            accept='image/*'
                                            type='file'
                                            hidden
                                            id='icon-button-file'
                                            onChange={handleUploadImage}
                                        />
                                        <label htmlFor='icon-button-file'>
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

                                <FormControl
                                    fullWidth
                                    error={Boolean(formik.touched.name && formik.errors.name)}
                                    sx={{ ...theme.typography.customInput, mt: 3 }}
                                >
                                    <InputLabel htmlFor={`outlined-adornment-name-category`}>Category Name</InputLabel>
                                    <OutlinedInput
                                        id={`outlined-adornment-name-category`}
                                        value={formik.values.name}
                                        name='name'
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => formik.handleChange(e)}
                                    />
                                    {formik.touched.name && formik.errors.name && (
                                        <FormHelperText error id={`standard-weight-helper-text-name-category`}>
                                            {formik.errors.name}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                {formik.errors.submit && (
                                    <Box sx={{ mt: 3 }}>
                                        <FormHelperText error>{`${formik.errors.submit}`}</FormHelperText>
                                    </Box>
                                )}
                            </DialogContent>
                            <DialogActions sx={{ pr: 2.5 }}>
                                <Button
                                    sx={{ color: theme.palette.error.dark }}
                                    onClick={() => setOpen(false)}
                                    color='secondary'
                                >
                                    Cancel
                                </Button>
                                <LoadingButton
                                    onClick={handleSubmit}
                                    loading={formik.isSubmitting}
                                    variant='contained'
                                    size='large'
                                    color='primary'
                                    type='submit'
                                >
                                    <span>Add</span>
                                </LoadingButton>
                            </DialogActions>
                        </>
                    )}
                </Dialog>
            </form>
        </div>
    );
}
