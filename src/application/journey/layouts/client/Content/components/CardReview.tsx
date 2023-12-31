// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';

// project import

// ==============================|| PEOPLE CARD ||============================== //

interface Props {
    id: number;
    name: string;
    image: string;
    tag: string;
    content: string;
    view: number;
}

const ReviewCard = ({ id, name, image, tag, content, view }: Props) => {
    const theme = useTheme();
    const color = ['primary', 'secondary', 'success', 'info', 'error', 'warning'];

    return (
        <SubCard
            sx={{
                bgcolor: 'background.default',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'scale3d(1.02, 1.02, 1)',
                    transition: 'all .4s ease-in-out'
                },
                opacity: view,
                mx: 0.5
            }}
        >
            <Stack spacing={2.5}>
                <Stack direction='row' spacing={2.5} alignItems='center'>
                    {image !== '' && (
                        <Avatar src={image} alt='user image' sx={{ height: 40, width: 40, bgcolor: 'transparent' }} />
                    )}
                    {image === '' && (
                        <Avatar
                            color={color[Math.floor(Math.random() * (5 - 0 + 1) + 0)]}
                            src={image}
                            sx={{ height: 40, width: 40 }}
                        >
                            {name.slice(0, 1)}
                        </Avatar>
                    )}
                    <Stack spacing={0}>
                        <Typography variant='h4' sx={{ fontWeight: 500 }}>
                            {name}
                        </Typography>
                        <Typography variant='subtitle1' sx={{ color: theme.palette.primary.main }}>
                            {tag}
                        </Typography>
                    </Stack>
                </Stack>
                <Typography variant='body1'>{content}</Typography>
            </Stack>
        </SubCard>
    );
};

export default ReviewCard;
