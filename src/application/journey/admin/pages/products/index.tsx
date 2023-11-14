// import lib
import React from 'react';

// * import projects
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import ProductList from '@ecommerce-frontend/src/application/journey/admin/pages/products/ProductsList';

// ==============================|| ADMIN PRODUCTS PAGE ||============================== //

const AdminProducts = () => {
    // show a right sidebar when clicked on new product
    return (
        <MainCard>
            <ProductList />
        </MainCard>
    );
};

export default AdminProducts;
