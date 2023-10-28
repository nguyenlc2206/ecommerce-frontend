// import lib
import React from 'react';
import { FormattedMessage } from 'react-intl';

// * import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';

// ==============================|| ADMIN ORDERS PAGE ||============================== //

const AdminOrders = () => {
    /** useEffect */
    React.useEffect(() => {}, []);

    return <MainCard title={<FormattedMessage id='orders' />}></MainCard>;
};

export default AdminOrders;
