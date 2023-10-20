import { useContext } from 'react';
import { ConfigContext } from '@ecommerce-frontend/src/common/contexts/config';

// ==============================|| CONFIG - HOOKS ||============================== //

const useConfig = () => useContext(ConfigContext);

export default useConfig;
