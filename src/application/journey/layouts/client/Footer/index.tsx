// import libs
import { useLocation } from 'react-router-dom';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Grid, IconButton, Link, Stack, Typography } from '@mui/material'; // Divider

import PublicIcon from '@mui/icons-material/Public';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

// Link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.hint,
    '&:hover': {
        color: theme.palette.primary.main
    },
    '&:active': {
        color: theme.palette.primary.main
    }
}));

// =============================|| LANDING - FOOTER SECTION ||============================= //

const FooterSection = (pathName: any) => {
    const theme = useTheme();
    const textColor = theme.palette.mode === 'dark' ? 'text.secondary' : 'text.hint';

    return (
        <>
            {pathName?.pathName?.pathname === '/' && (
                <Container sx={{ mb: 15 }}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Grid container spacing={8}>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={{ xs: 2, md: 5 }}>
                                        <Typography variant='h4' color={textColor} sx={{ fontWeight: 500 }}>
                                            About Pet Shop
                                        </Typography>
                                        <Typography variant='body2' color={textColor}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore mollitia
                                            harum blanditiis repellendus sint quod odit eveniet fugiat saepe asperiores
                                            explicabo, eius ea. Commodi repellendus iste, repudiandae sapiente impedit
                                            nobis.
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={{ xs: 5, md: 2 }}>
                                        <Grid item xs={12} sm={6}>
                                            <Stack spacing={{ xs: 3, md: 5 }}>
                                                <Typography variant='h4' color={textColor} sx={{ fontWeight: 500 }}>
                                                    Help
                                                </Typography>
                                                <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                    <FooterLink href='#' target='_blank' underline='none'>
                                                        Support
                                                    </FooterLink>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Stack spacing={{ xs: 3, md: 5 }}>
                                                <Typography variant='h4' color={textColor} sx={{ fontWeight: 500 }}>
                                                    Feedback
                                                </Typography>
                                                <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                    <FooterLink href='#' target='_blank' underline='none'>
                                                        Email
                                                    </FooterLink>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            )}

            <Box sx={{ bgcolor: 'dark.dark', py: { xs: 0, sm: 1.5 } }}>
                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems='center'
                        justifyContent='space-between'
                        spacing={{ xs: 1.5, sm: 1, md: 3 }}
                    >
                        <Typography color='text.secondary'>
                            © Pet shop is build by{' '}
                            <Link href='https://www.facebook.com/lcnnguyen99' target='_blank' underline='hover'>
                                NguyenCaoLe
                            </Link>
                        </Typography>
                        <Stack direction='row' alignItems='center' spacing={{ xs: 3, sm: 1.5, md: 2 }}>
                            <IconButton
                                size='small'
                                aria-label='Berry Blog'
                                component={Link}
                                href='https://www.facebook.com/lcnnguyen99'
                                target='_blank'
                            >
                                <PublicIcon sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} />
                            </IconButton>
                            <IconButton
                                size='small'
                                aria-label='codedTheme Twitter'
                                component={Link}
                                href='https://www.facebook.com/lcnnguyen99'
                                target='_blank'
                            >
                                <FacebookIcon sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} />
                            </IconButton>
                            <IconButton
                                size='small'
                                aria-label='codedTheme Dribble'
                                component={Link}
                                href='https://github.com/nguyenlc2206'
                                target='_blank'
                            >
                                <GitHubIcon sx={{ color: 'text.secondary', '&:hover': { color: 'warning.main' } }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default FooterSection;
