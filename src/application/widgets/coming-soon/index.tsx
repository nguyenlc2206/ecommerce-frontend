// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';

// third party
import { useTimer } from 'react-timer-hook';

// project imports
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';

// assets
import imageGrid from '@ecommerce-frontend/src/assets/images/maintenance/img-soon-grid.svg';
import imageDarkGrid from '@ecommerce-frontend/src/assets/images/maintenance/img-soon-grid-dark.svg';
import imageBlock from '@ecommerce-frontend/src/assets/images/maintenance/img-soon-block.svg';
import imageBlueBlock from '@ecommerce-frontend/src/assets/images/maintenance/img-soon-blue-block.svg';
import imagePurpleBlock from '@ecommerce-frontend/src/assets/images/maintenance/img-soon-purple-block.svg';

// styles
const CardMediaWrapper = styled('div')({
    maxWidth: 720,
    margin: '0 auto',
    position: 'relative'
});

const PageContentWrapper = styled('div')({
    maxWidth: 450,
    margin: '0 auto',
    textAlign: 'center'
});

const CardMediaBlock = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '8s blink ease-in-out infinite'
});

const CardMediaBlue = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '15s wings ease-in-out infinite'
});

const CardMediaPurple = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '12s wings ease-in-out infinite'
});

// ===========================|| COMING SOON 2 ||=========================== //

const ComingSoon = () => {
    const theme = useTheme();
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3600 * 24 * 2 - 3600 * 15.5);

    const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp: time });

    return (
        <SubCard>
            <Grid container justifyContent='center' spacing={gridSpacing}>
                <Grid item xs={12}>
                    <PageContentWrapper>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Typography variant='h1'>Coming Soon</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body1'>Something new is on it&apos;s way</Typography>
                            </Grid>
                        </Grid>
                    </PageContentWrapper>
                </Grid>
                <Grid item xs={12}>
                    <CardMediaWrapper>
                        <CardMedia
                            component='img'
                            image={theme.palette.mode === 'dark' ? imageDarkGrid : imageGrid}
                            title='Slider5 image'
                        />
                        <CardMediaBlock src={imageBlock} title='Slider 1 image' />
                        <CardMediaBlue src={imageBlueBlock} title='Slider 2 image' />
                        <CardMediaPurple src={imagePurpleBlock} title='Slider 3 image' />
                    </CardMediaWrapper>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default ComingSoon;
