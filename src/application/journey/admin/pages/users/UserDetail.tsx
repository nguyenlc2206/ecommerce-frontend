// import libs
import React from 'react';
import { useParams } from 'react-router-dom';

// import material ui
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

// import projects
import useAuth from '@ecommerce-frontend/src/common/hooks/useAuth';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';

// assets
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { GetAccountByIdServiceImpl } from '@ecommerce-frontend/src/domain/services/account/getAccountById';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import FormControl from '@ecommerce-frontend/src/application/widgets/forms/FormControl';
import { LoadingButton } from '@mui/lab';
import { LOGIN } from '@ecommerce-frontend/src/infras/data/store/actions/account';

// ==============================|| ADMIN USERDETAIL PAGE ||============================== //

const UserDetail = () => {
    /** init serivce */
    const getAccountByIdService = new GetAccountByIdServiceImpl();

    /** init redux */
    const { userSelect } = useSelector((state) => state.user);
    const { account } = useSelector((state) => state.account);

    const { id } = useParams();

    /** init hookks */
    const uploadInputRef = React.useRef(null);
    const [image, setImage] = React.useState<string | ArrayBuffer>('');
    const [iamgeURL, setImageURL] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const { updateProfile } = useAuth();

    const [fullName, setFullName] = React.useState<string>(userSelect?.fullName);
    const [email, setEmail] = React.useState<string>(userSelect?.email);
    const [phone, setPhone] = React.useState<string>(userSelect?.phoneNo);

    /** initial */
    const handleInitial = () => {
        setFullName(userSelect?.fullName);
        setEmail(userSelect?.email);
        setPhone(userSelect?.phoneNo);
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

    /** handle updateProfile */
    const hanleUpdateProfile = async () => {
        setLoading(true);
        let accountUpdate = new AccountModel();
        if (image) {
            accountUpdate.id = id;
            accountUpdate.data = {
                fullName: fullName,
                phoneNo: phone,
                avatar: image,
                email: email
            };
        } else {
            accountUpdate.id = id;
            accountUpdate.data = {
                fullName: fullName,
                phoneNo: phone,
                email: email
            };
        }
        /** call update profile */
        const res = await updateProfile(accountUpdate);
        setLoading(false);
        if (res.isFailure()) return;

        /** update header */
        if (res.data?.id === account?.id) {
            /** save data to redux */
            dispatch({ type: LOGIN, payload: { isLoggedIn: true, account: { ...res.data } } });
        }
    };

    /** @todo: init useEffect */
    React.useEffect(() => {
        getAccountByIdService.execute(id);
    }, []);

    React.useEffect(() => {
        handleInitial();
    }, [userSelect]);

    return (
        <>
            {userSelect && (
                <MainCard title='Account Detail'>
                    <Grid container spacing={gridSpacing}>
                        <Grid item sm={6} md={4}>
                            <SubCard title='Profile Picture' contentSX={{ textAlign: 'center' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Avatar
                                            alt='User 1'
                                            src={iamgeURL ? iamgeURL : (userSelect?.avatar as string)}
                                            sx={{ width: 100, height: 100, margin: '0 auto' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant='subtitle2' align='center'>
                                            Upload/Change Your Profile Image
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
                                                    Upload Avatar
                                                </Button>
                                            </AnimateButton>
                                        </label>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item sm={6} md={8}>
                            <SubCard title='Edit Account Details'>
                                <Grid container spacing={gridSpacing}>
                                    {userSelect?.email && (
                                        <Grid item xs={12}>
                                            <FormControl
                                                captionLabel='Email Address'
                                                value={email || ''}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </Grid>
                                    )}
                                    {userSelect?.phoneNo && (
                                        <Grid item md={6} xs={12}>
                                            <FormControl
                                                captionLabel='Phone Number'
                                                value={phone || ''}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setPhone(e.target.value)
                                                }
                                            />
                                        </Grid>
                                    )}
                                    {userSelect?.fullName && (
                                        <Grid item md={6} xs={12}>
                                            <FormControl
                                                captionLabel='Full Name'
                                                value={fullName || ''}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setFullName(e.target.value)
                                                }
                                            />
                                        </Grid>
                                    )}
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            id='outlined-basic8'
                                            fullWidth
                                            label='Birthday'
                                            defaultValue='22/06/1999'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack direction='row'>
                                            <LoadingButton
                                                variant='contained'
                                                loading={loading}
                                                onClick={hanleUpdateProfile}
                                            >
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

export default UserDetail;
