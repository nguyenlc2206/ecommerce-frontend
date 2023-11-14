// import lib
import React from 'react';

// * import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import UserList from '@ecommerce-frontend/src/application/journey/admin/pages/users/UsersList';

// ==============================|| ADMIN USERS PAGE ||============================== //

const AdminUsers = () => {
    /** useEffect */
    React.useEffect(() => {}, []);

    return (
        <MainCard>
            <UserList />
        </MainCard>
    );
};

export default AdminUsers;
