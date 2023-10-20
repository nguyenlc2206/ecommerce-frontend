import { Suspense, ElementType } from 'react';

// project imports
import Loader from '@ecommerce-frontend/src/common/functions/Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: ElementType) => (props: any) => (
    <Suspense fallback={<Loader />}>
        <Component {...props} />
    </Suspense>
);

export default Loadable;
