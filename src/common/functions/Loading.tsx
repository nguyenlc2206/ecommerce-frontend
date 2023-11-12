// import libs
import BeatLoader from 'react-spinners/BeatLoader';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';

const PageLoading = () => {
    const { pageLoading } = useSelector((state) => state.page);
    return (
        <div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={pageLoading}>
                <BeatLoader color='#36d7b7' margin={3} />
                {/* <CircularProgress color='inherit' /> */}
            </Backdrop>
        </div>
    );
};

export default PageLoading;
