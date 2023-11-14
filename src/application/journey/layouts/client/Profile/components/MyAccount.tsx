// import libs
import React from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';

// import projects
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import useAuth from '@ecommerce-frontend/src/common/hooks/useAuth';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { LOGIN } from '@ecommerce-frontend/src/infras/data/store/actions/account';

// ==============================|| PROFILE - MY PROFILE ACCOUNT ||============================== //

const MyAccountProfile = () => {
    /** init theme */
    const theme = useTheme();

    /** init variables */
    const { account } = useSelector((state) => state.account);
    const { userSelect } = useSelector((state) => state.user);

    const { id } = useParams();

    /** init hooks */
    const uploadInputRef = React.useRef(null);
    const [image, setImage] = React.useState<any>('');
    const [imageURL, setImageURL] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const { updateMe, updateProfile } = useAuth();

    const [fullName, setFullName] = React.useState<string>(
        userSelect?.fullName ? userSelect?.fullName : account?.fullName
    );
    const [email, setEmail] = React.useState<string>(userSelect?.email ? userSelect?.email : account?.email);
    const [phone, setPhone] = React.useState<string>(userSelect?.phoneNo ? userSelect?.phoneNo : account?.phoneNo);

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

    /** handle updateMe account */
    const handleUpdateAccount = async () => {
        setLoading(true);
        /** prepare data update me */
        if (!userSelect) {
            let data: AccountModel = { fullName: fullName, email: email, phoneNo: phone, avatar: image };
            const res = await updateMe(data);
        } else {
            let data: AccountModel = {
                id: id,
                fullName: fullName,
                email: email,
                phoneNo: phone,
                avatar: image ? image : null
            };
            /** call update profile */
            const res = await updateProfile(data);
        }
        setLoading(false);
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item sm={6} md={4}>
                    <SubCard title='Profile Picture' contentSX={{ textAlign: 'center' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Avatar
                                    alt='Avatar Account'
                                    src={
                                        imageURL ? imageURL : userSelect?.avatar ? userSelect?.avatar : account?.avatar
                                    }
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
                                            onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
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
                    <SubCard title='General Settings'>
                        <form noValidate autoComplete='off'>
                            <Grid container spacing={gridSpacing}>
                                {(userSelect?.fullName || account?.fullName) && (
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id='outlined-basic5'
                                            fullWidth
                                            label='Username'
                                            value={fullName || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setFullName(e.target.value)
                                            }
                                        />
                                    </Grid>
                                )}
                                {(userSelect?.email || account?.email) && (
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id='outlined-basic6'
                                            fullWidth
                                            label='Account Email'
                                            value={email || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </Grid>
                                )}
                                {(userSelect?.phoneNo || account?.phoneNo) && (
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id='outlined-basic7'
                                            fullWidth
                                            label='Phone Number'
                                            value={phone || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setPhone(e.target.value)
                                            }
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Divider sx={{ mt: 2 }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid spacing={2} container justifyContent='flex-end'>
                                        <Grid item>
                                            <AnimateButton>
                                                <Button
                                                    disabled={loading}
                                                    variant='contained'
                                                    onClick={handleUpdateAccount}
                                                >
                                                    Update Profile
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </SubCard>
                </Grid>
            </Grid>
        </>
    );
};

export default MyAccountProfile;
