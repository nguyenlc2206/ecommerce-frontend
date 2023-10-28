// import lib
import React from 'react';
import { FormattedMessage } from 'react-intl';

// * import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';

// ==============================|| ADMIN COUPONS PAGE ||============================== //

const AdminCoupons = () => {
    /** useEffect */
    React.useEffect(() => {}, []);

    return <MainCard title={<FormattedMessage id='coupons' />}></MainCard>;
};

export default AdminCoupons;
