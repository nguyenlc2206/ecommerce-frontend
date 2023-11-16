// import lib
import React from 'react';

// * import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import CouponsList from '@ecommerce-frontend/src/application/journey/admin/pages/coupons/CouponsList';

// ==============================|| ADMIN COUPONS PAGE ||============================== //

const AdminCoupons = () => {
    /** useEffect */
    React.useEffect(() => {}, []);

    return (
        <MainCard>
            <CouponsList />
        </MainCard>
    );
};

export default AdminCoupons;
