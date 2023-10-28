// import lib
import React from 'react';
import { FormattedMessage } from 'react-intl';

// * import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import UserList from '@ecommerce-frontend/src/application/journey/admin/components/users/UserList';

// ==============================|| ADMIN USERS PAGE ||============================== //

const AdminUsers = () => {
    /** useEffect */
    React.useEffect(() => {}, []);

    return (
        <MainCard title={<FormattedMessage id='users' />}>
            <UserList />
        </MainCard>
    );
};

export default AdminUsers;
