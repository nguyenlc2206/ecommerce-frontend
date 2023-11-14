// import libs
import React from 'react';
import { Grid } from '@mui/material';

// import projects
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import ProductCard from '@ecommerce-frontend/src/application/journey/client/components/products/ProductCard';
import { GetAllProductServiceImpl } from '@ecommerce-frontend/src/domain/services/product/getAll';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import ProductEmpty from '@ecommerce-frontend/src/application/journey/client/components/products/ProductEmpty';

// ==============================|| PRODUCT LIST ||============================== //

const ProductsClientList = () => {
    /** init variable */
    const { products } = useSelector((state) => state.product);
    const [rows, setRows] = React.useState<ProductModel[]>(
        Object.values(products).filter((item) => item?.isDeleted !== true)
    );

    /** useEffect */
    React.useEffect(() => {
        setRows(Object.values(products).filter((item) => item?.isDeleted !== true));
    }, [products]);

    return (
        <>
            {rows.length ? (
                rows.map((item: ProductModel) => (
                    <Grid key={item?.id} item xs={12} sm={6} md={4} lg={2.5}>
                        <ProductCard
                            id={item?.id}
                            image={item?.images[0]}
                            name={item?.name}
                            description={item?.description}
                            offerPrice={
                                item?.products[0]?.price -
                                item?.products[0]?.price * (item?.products[0]?.discount / 100)
                            }
                            salePrice={item?.products[0]?.price}
                            rating={2}
                            item={item}
                        />
                    </Grid>
                ))
            ) : (
                <Grid item xs={12} sx={{ mt: 3 }}>
                    <ProductEmpty />
                </Grid>
            )}
        </>
    );
};

export default ProductsClientList;
