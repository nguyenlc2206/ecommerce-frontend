import { useEffect, useState } from 'react';

// material-ui
import { Checkbox, FormControlLabel, Grid, Skeleton } from '@mui/material';

import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';

// ==============================|| PRODUCT GRID - CATEGORIES FILTER ||============================== //

const Categories = ({
    categoriess,
    handelFilter
}: {
    categoriess: Array<{ id: string; value: string }>;
    handelFilter: (type: string, params: { id: string; value: string }) => void;
}) => {
    const { categories } = useSelector((state) => state.category);

    const [isCategoriesLoading, setCategoriesLoading] = useState(true);
    useEffect(() => {
        setCategoriesLoading(false);
    }, []);

    return (
        <Grid container spacing={1}>
            {isCategoriesLoading ? (
                <Grid item xs={12}>
                    <Skeleton variant='rectangular' width='100%' height={96} />
                </Grid>
            ) : (
                <>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={categoriess.some((item) => item?.value === 'all')} />}
                            onChange={() => handelFilter('categories', { id: '', value: 'all' })}
                            label='All'
                            id='all'
                            name='all'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {Object.values(categories)
                            .slice(0, Object.values(categories).length / 2 + 1)
                            .map((element: CategoryModel) => {
                                return (
                                    <FormControlLabel
                                        key={element.id}
                                        id={element.id}
                                        name={element?.name}
                                        control={
                                            <Checkbox
                                                checked={categoriess.some(
                                                    (item) => item?.value === element?.name.toLowerCase()
                                                )}
                                            />
                                        }
                                        onChange={() =>
                                            handelFilter('categories', {
                                                id: element?.id,
                                                value: element?.name.toLowerCase()
                                            })
                                        }
                                        label={
                                            element?.name.toLowerCase().charAt(0).toUpperCase() +
                                            element?.name.toLowerCase().slice(1)
                                        }
                                    />
                                );
                            })}
                    </Grid>
                    <Grid item xs={6}>
                        {Object.values(categories)
                            .slice(Object.values(categories).length / 2 + 1, Object.values(categories).length)
                            .map((element: CategoryModel) => {
                                return (
                                    <FormControlLabel
                                        key={element.id}
                                        id={element.id}
                                        name={element?.name}
                                        control={
                                            <Checkbox
                                                checked={categoriess.some(
                                                    (item) => item?.value === element?.name.toLowerCase()
                                                )}
                                            />
                                        }
                                        onChange={() =>
                                            handelFilter('categories', {
                                                id: element?.id,
                                                value: element?.name.toLowerCase()
                                            })
                                        }
                                        label={
                                            element?.name.toLowerCase().charAt(0).toUpperCase() +
                                            element?.name.toLowerCase().slice(1)
                                        }
                                    />
                                );
                            })}
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default Categories;
