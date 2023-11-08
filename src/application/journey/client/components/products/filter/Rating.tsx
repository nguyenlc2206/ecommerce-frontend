import { useEffect, useState } from 'react';

// material-ui
import { Rating, Skeleton, Stack, Typography } from '@mui/material';

// ==============================|| PRODUCT GRID - RATING FILTER ||============================== //

const RatingSection = ({
    rating,
    handelFilter
}: {
    rating: number;
    handelFilter: (type: string, params: string, rating: number) => void;
}) => {
    const [isRatingLoading, setRatingLoading] = useState(true);
    useEffect(() => {
        setRatingLoading(false);
    }, []);

    return (
        <>
            {isRatingLoading ? (
                <Skeleton variant='rectangular' width='100%' height={172} />
            ) : (
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Rating
                        precision={0.5}
                        name='simple-controlled'
                        value={rating}
                        onChange={(event, newValue) => handelFilter('rating', '', newValue!)}
                    />
                    <Typography component='legend'>({rating})</Typography>
                </Stack>
            )}
        </>
    );
};

export default RatingSection;
