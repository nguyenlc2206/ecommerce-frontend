// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Container, Grid, useMediaQuery } from '@mui/material';

// third party
import { useTimer } from 'react-timer-hook';

// styles

const TimeBlock = styled('div')(({ theme }) => ({
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    borderRadius: '12px',
    padding: '16px 0',
    textAlign: 'center',
    fontWeight: 650,
    fontSize: '1.5rem'
}));

const TimeBlockDot = styled('div')(({ theme }) => ({
    color: theme.palette.secondary.main,
    borderRadius: '12px',
    padding: '16px 0',
    textAlign: 'center',
    fontWeight: 650,
    fontSize: '1.5rem'
}));

// ===========================|| TIMER COUNT DOWN ||=========================== //

const TimerCountDown = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const time = new Date();
    time.setSeconds(time.getSeconds() + 3600 * 24 * 2 - 3600 * 22.0);

    const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp: time });

    return (
        <Container sx={{ my: 2.0, width: { xs: '300px', sm: '480px' } }}>
            <Grid container spacing={1.75} justifyContent='center' sx={{ textAlign: 'center' }}>
                <Grid item xs={2.5}>
                    <TimeBlock>{hours}</TimeBlock>
                </Grid>
                <Grid item>
                    <TimeBlockDot>:</TimeBlockDot>
                </Grid>
                <Grid item xs={2.5}>
                    <TimeBlock>{minutes}</TimeBlock>
                </Grid>
                <Grid item>
                    <TimeBlockDot>:</TimeBlockDot>
                </Grid>
                <Grid item xs={2.5}>
                    <TimeBlock>{seconds}</TimeBlock>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TimerCountDown;
