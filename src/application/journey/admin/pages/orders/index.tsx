// import lib
import React from 'react';

// * import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import OrdersList from '@ecommerce-frontend/src/application/journey/admin/pages/orders/OrdersList';

// ==============================|| ADMIN ORDERS PAGE ||============================== //

const AdminOrders = () => {
    /** useEffect */
    React.useEffect(() => {}, []);

    return (
        <MainCard>
            <OrdersList />
        </MainCard>
    );
};

export default AdminOrders;
