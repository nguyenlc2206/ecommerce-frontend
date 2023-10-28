// import lib
import React from 'react';
import { FormattedMessage } from 'react-intl';

// * import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import CategoryList from '@ecommerce-frontend/src/application/journey/admin/components/categories/CategoryList';
import CategoryFormDialog from '@ecommerce-frontend/src/application/journey/admin/components/categories/CategoryFormDialog';

// ==============================|| ADMIN CATEGORIES PAGE ||============================== //

const AdminCategories = () => {
    /** useEffect */
    React.useEffect(() => {}, []);

    return (
        <MainCard title={<FormattedMessage id='category' />} secondary={<CategoryFormDialog />}>
            <CategoryList />
        </MainCard>
    );
};

export default AdminCategories;
