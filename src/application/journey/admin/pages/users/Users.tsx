// import lib
import React from 'react';

// * import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import UserList from '@ecommerce-frontend/src/application/journey/admin/components/users/UserList';
import { GetAllServiceImpl } from '@ecommerce-frontend/src/domain/services/account/getAll';

// ==============================|| ADMIN USERS PAGE ||============================== //

const AdminUsers = () => {
    /** useEffect */
    React.useEffect(() => {}, []);

    return (
        <MainCard title='List Users'>
            <UserList />
        </MainCard>
    );
};

export default AdminUsers;
