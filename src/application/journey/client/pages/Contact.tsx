// import libs

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

// import projects
import AppBar from '@ecommerce-frontend/src/application/journey/layouts/client/Header/components/Appbar';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';

// style
const HeaderWrapper = styled('div')(({ theme }) => ({
    backgroundImage: `url(${'https://res.cloudinary.com/dybi8swhy/image/upload/v1699256146/ImagesCommon/bg-header_vlu2ye.jpg'})`,
    backgroundSize: '100% 600px',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center',
    paddingTop: 30,
    minHeight: '93.5vh',
    [theme.breakpoints.down('md')]: {
        paddingTop: 0
    }
}));

// ==============================|| CONTACT CLIENT PAGE ||============================== //

const ContactClientPage = () => {
    /** init theme */
    const theme = useTheme();

    return (
        <>
            <HeaderWrapper>
                <AppBar />

                <Container>
                    <Grid container justifyContent='center' spacing={gridSpacing}>
                        <Grid item sm={10} md={7} sx={{ mt: { md: 12.5, xs: 2.5 }, mb: { md: 12.5, xs: 2.5 } }}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant='h1'
                                        color='white'
                                        component='div'
                                        sx={{
                                            fontSize: '3.5rem',
                                            fontWeight: 900,
                                            lineHeight: 1.4,
                                            [theme.breakpoints.down('md')]: { fontSize: '1.8125rem', marginTop: '80px' }
                                        }}
                                    >
                                        Get in touch
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant='h4'
                                        component='div'
                                        sx={{
                                            fontWeight: 400,
                                            lineHeight: 1.4,
                                            [theme.breakpoints.up('md')]: { my: 0, mx: 12.5 }
                                        }}
                                        color='white'
                                    >
                                        Getting feedback from you, helps me build apps faster and better.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ position: 'relative', display: { xs: 'none', lg: 'block' } }}>
                            <img
                                src={
                                    'https://res.cloudinary.com/dybi8swhy/image/upload/v1699256496/ImagesCommon/widget-mail_i805nq.svg'
                                }
                                alt='Berry'
                                style={{
                                    marginBottom: -0.625,
                                    position: 'absolute',
                                    bottom: -90,
                                    right: '0',
                                    width: 400,
                                    maxWidth: '100%',
                                    animation: '5s wings ease-in-out infinite'
                                }}
                            />
                        </Grid>
                        <Grid item xs={10} sx={{ mb: -37.5 }}>
                            <Card sx={{ mb: 6.25 }} elevation={4}>
                                <CardContent sx={{ p: 4 }}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Name</InputLabel>
                                                <OutlinedInput type='text' label='Name' placeholder='Enter Your Name' />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Email Address</InputLabel>
                                                <OutlinedInput
                                                    type='text'
                                                    label='Email Address'
                                                    placeholder='Enter Your Email Address'
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    id='outlined-multiline-static1'
                                                    placeholder='Message'
                                                    multiline
                                                    fullWidth
                                                    rows={4}
                                                    defaultValue=''
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={gridSpacing}>
                                                <Grid item sm zeroMinWidth></Grid>
                                                <Grid item>
                                                    <AnimateButton>
                                                        <Button variant='contained' color='secondary'>
                                                            Get Started
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </HeaderWrapper>
        </>
    );
};

export default ContactClientPage;
