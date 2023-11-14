// import lib
import React from 'react';

// * import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import CategoriesList from '@ecommerce-frontend/src/application/journey/admin/pages/categories/CategoriesList';

// ==============================|| ADMIN CATEGORY PAGE ||============================== //

const AdminCategories = () => {
    /** useEffect */
    React.useEffect(() => {}, []);

    return (
        <MainCard>
            <CategoriesList />
        </MainCard>
    );
};

export default AdminCategories;
