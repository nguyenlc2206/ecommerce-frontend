import { forwardRef, useState } from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Slide,
    SlideProps,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import {
    Timeline,
    TimelineDot,
    TimelineItem,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent,
    TimelineSeparator
} from '@mui/lab';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// import project
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import ComingSoon from '@ecommerce-frontend/src/application/widgets/coming-soon';

const listBoxSX = {
    bgcolor: (theme: Theme) => theme.palette.background.default,
    py: 0
};

const dotSX = {
    p: 0,
    '& > svg': {
        width: 14,
        height: 14
    },
    display: { xs: 'none', md: 'flex' }
};

// tab animation
const Transition = forwardRef((props: SlideProps, ref) => <Slide direction='left' ref={ref} {...props} />);

// ==============================|| ORDER STATUS DETAIL ||============================== //

interface OrderDetailProps {
    order: OrderModel;
}

const OrderStatus = ({ order }: OrderDetailProps) => {
    // init theme
    const theme = useTheme();
    return (
        <ComingSoon />
        // <SubCard title='ORDER STATUS'>
        //     <Grid container spacing={gridSpacing}>
        //         <Grid item xs={12} md={12} lg={12}>
        //             <Grid container spacing={0}>
        //                 <Grid item xs={12} sm={12} md={6} lg={3}>
        //                     <Grid container spacing={1}>
        //                         <Grid item xs={12}>
        //                             <Typography variant='h5'>Order Place Date</Typography>
        //                         </Grid>
        //                         <Grid item xs={12}>
        //                             <Typography variant='body2'>10th Mar, 2021</Typography>
        //                         </Grid>
        //                     </Grid>
        //                 </Grid>
        //                 <Grid item xs={12} sm={6} md={6} lg={2}>
        //                     <Grid container spacing={1}>
        //                         <Grid item xs={12}>
        //                             <Typography variant='h5'>Order Status</Typography>
        //                         </Grid>
        //                         <Grid item xs={12}>
        //                             <Typography variant='body2'>Processing</Typography>
        //                         </Grid>
        //                     </Grid>
        //                 </Grid>
        //                 <Grid item xs={12} sm={6} md={4} lg={3}>
        //                     <Grid container spacing={1}>
        //                         <Grid item xs={12}>
        //                             <Typography variant='h5'>Delivery Option</Typography>
        //                         </Grid>
        //                         <Grid item xs={12}>
        //                             <Typography variant='body2'>Fedex Express Delivery</Typography>
        //                         </Grid>
        //                     </Grid>
        //                 </Grid>
        //                 <Grid item xs={12} sm={6} md={4} lg={2}>
        //                     <Grid container spacing={1}>
        //                         <Grid item xs={12}>
        //                             <Typography variant='h5'>Payment</Typography>
        //                         </Grid>
        //                         <Grid item xs={12}>
        //                             <Typography variant='body2'>Credit Card</Typography>
        //                         </Grid>
        //                     </Grid>
        //                 </Grid>
        //                 <Grid item xs={12} sm={6} md={4} lg={2}>
        //                     <Grid container spacing={1}>
        //                         <Grid item xs={12}>
        //                             <Typography variant='h5'>Order Amount</Typography>
        //                         </Grid>
        //                         <Grid item xs={12}>
        //                             <Typography variant='body2'>$90,020</Typography>
        //                         </Grid>
        //                     </Grid>
        //                 </Grid>
        //             </Grid>
        //         </Grid>
        //         <Grid item md={8} lg={9}>
        //             <Timeline
        //                 sx={{
        //                     '& > li': {
        //                         mb: 2.75,
        //                         [theme.breakpoints.down('md')]: {
        //                             flexDirection: 'column',
        //                             '& > div': {
        //                                 px: 0
        //                             },
        //                             '& > div:first-of-type': {
        //                                 textAlign: 'left'
        //                             }
        //                         }
        //                     },
        //                     [theme.breakpoints.down('md')]: {
        //                         p: 0
        //                     }
        //                 }}
        //             >
        //                 <TimelineItem>
        //                     <TimelineOppositeContent>
        //                         <Typography variant='h6'>Order Placed</Typography>
        //                         <Typography variant='body2'>12 jun</Typography>
        //                     </TimelineOppositeContent>
        //                     <TimelineSeparator>
        //                         <TimelineDot color='primary' sx={dotSX}>
        //                             <FiberManualRecordIcon />
        //                         </TimelineDot>
        //                         <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
        //                     </TimelineSeparator>
        //                     <TimelineContent sx={{ flex: 3 }}>
        //                         <List sx={listBoxSX}>
        //                             <ListItem>
        //                                 <ListItemText primary='The order was validated.' />
        //                             </ListItem>
        //                             <Divider />
        //                             <ListItem>
        //                                 <ListItemText primary='The order was placed.' />
        //                             </ListItem>
        //                             <Divider />
        //                             <ListItem>
        //                                 <ListItemText primary='The order was placed.' />
        //                             </ListItem>
        //                         </List>
        //                     </TimelineContent>
        //                 </TimelineItem>
        //                 <TimelineItem>
        //                     <TimelineOppositeContent>
        //                         <Typography variant='h6'>Order Processing</Typography>
        //                         <Typography variant='body2'>14 jun</Typography>
        //                     </TimelineOppositeContent>
        //                     <TimelineSeparator>
        //                         <TimelineDot color='primary' sx={dotSX}>
        //                             <FiberManualRecordIcon />
        //                         </TimelineDot>
        //                         <TimelineConnector sx={{ bgcolor: 'grey.400' }} />
        //                     </TimelineSeparator>
        //                     <TimelineContent sx={{ flex: 3 }}>
        //                         <List sx={listBoxSX}>
        //                             <ListItem>
        //                                 <ListItemText primary='Payment transaction [method: Credit Card, type: sale, amount: $90,020, status: Processing ]' />
        //                             </ListItem>
        //                         </List>
        //                     </TimelineContent>
        //                 </TimelineItem>
        //                 <TimelineItem>
        //                     <TimelineOppositeContent>
        //                         <Typography variant='h6'>Order Shipping</Typography>
        //                         <Typography variant='body2'>16 Jun</Typography>
        //                     </TimelineOppositeContent>
        //                     <TimelineSeparator>
        //                         <TimelineDot sx={dotSX}>
        //                             <FiberManualRecordIcon />
        //                         </TimelineDot>
        //                         <TimelineConnector sx={{ bgcolor: 'grey.400' }} />
        //                     </TimelineSeparator>
        //                     <TimelineContent sx={{ flex: 3 }}>
        //                         <List sx={listBoxSX}>
        //                             <ListItem>
        //                                 <ListItemText primary='Sent a notification to the client by e-mail.' />
        //                             </ListItem>
        //                         </List>
        //                     </TimelineContent>
        //                 </TimelineItem>
        //                 <TimelineItem>
        //                     <TimelineOppositeContent>
        //                         <Typography variant='h6'>Order Delivered</Typography>
        //                         <Typography variant='body2'>17 Jun</Typography>
        //                     </TimelineOppositeContent>
        //                     <TimelineSeparator>
        //                         <TimelineDot sx={dotSX}>
        //                             <FiberManualRecordIcon />
        //                         </TimelineDot>
        //                         <TimelineConnector sx={{ bgcolor: 'grey.400' }} />
        //                     </TimelineSeparator>
        //                     <TimelineContent sx={{ flex: 3 }}>
        //                         <List sx={listBoxSX}>
        //                             <ListItem>
        //                                 <ListItemText primary='Order Delivered' />
        //                             </ListItem>
        //                         </List>
        //                     </TimelineContent>
        //                 </TimelineItem>
        //             </Timeline>
        //         </Grid>
        //     </Grid>
        // </SubCard>
    );
};

export default OrderStatus;
