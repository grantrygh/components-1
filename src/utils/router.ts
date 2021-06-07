import { useRouter as useNextRouter } from 'next/router';
import { useHistory, useLocation } from 'react-router-dom';
import { isNextApp } from '../utils/isNextApp';

export const useRouter = () => {
    const location = useLocation();
    const history = useHistory();

    const router = useNextRouter();

    console.log('in this test', isNextApp);

    // next
    // if (isNextApp()) {
    return {
        pathname: router?.pathname,
        search: router?.query,
        router,
    };
    // }

    // react-router
    return {
        pathname: location?.pathname,
        search: location?.search,
        router: history,
    };
};
