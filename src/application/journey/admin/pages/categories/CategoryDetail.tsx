// * import libs
import React from 'react';
import { useParams } from 'react-router-dom';

// import material ui
import { LoadingButton } from '@mui/lab';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

// * import projects
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';

// assets
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import FormControl from '@ecommerce-frontend/src/application/widgets/forms/FormControl';
import { GetCategoryByIdServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/getById';

// ==============================|| ADMIN CATEGORY DETAIL PAGE ||============================== //

const CategoryDetail = () => {
    /** init serivce */
    const getCategoryById = new GetCategoryByIdServiceImpl();
    /** init redux */
    const { categorySelect } = useSelector((state) => state.category);

    /** init hookks */
    const { id } = useParams();
    const uploadInputRef = React.useRef(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>(categorySelect?.name);
    const [image, setImage] = React.useState<string | ArrayBuffer>(categorySelect?.image);
    const [imageURL, setImageURL] = React.useState<string>('');

    /** initial */
    const handleInitial = () => {
        setName(categorySelect?.name);
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

    /** @todo: init useEffect */
    React.useEffect(() => {
        getCategoryById.execute(id);
    }, []);

    React.useEffect(() => {
        handleInitial();
    }, [categorySelect]);

    return (
        <>
            {categorySelect && (
                <MainCard title='Category Detail'>
                    <Grid container spacing={gridSpacing}>
                        <Grid item sm={6} md={4}>
                            <SubCard title='Category Picture' contentSX={{ textAlign: 'center' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Avatar
                                            alt='User 1'
                                            src={imageURL ? imageURL : (categorySelect?.image as string)}
                                            sx={{ width: 100, height: 100, margin: '0 auto' }}
                                        />
                                    </Grid>
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
                            </SubCard>
                        </Grid>
                        <Grid item sm={6} md={8}>
                            <SubCard title='Edit Category Details'>
                                <Grid container spacing={gridSpacing}>
                                    {categorySelect?.name && (
                                        <Grid item xs={12}>
                                            <FormControl
                                                captionLabel='Category Name'
                                                value={name || ''}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </Grid>
                                    )}
                                    <Grid item xs={12}>
                                        <Stack direction='row'>
                                            <LoadingButton variant='contained' loading={loading} onClick={() => {}}>
                                                Change Details
                                            </LoadingButton>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

export default CategoryDetail;
