import * as H from 'history';
import { useRouter as useNextRouter } from 'next/router';
import { useContext } from 'react';
import { RouteComponentProps, StaticContext, __RouterContext as RouterContext } from 'react-router';
import { isNextApp } from '../utils/isNextApp';

export function useReactRouter<
    Params extends { [K in keyof Params]?: string } = {},
    C extends StaticContext = StaticContext,
    S = H.LocationState
>() {
    return useContext(RouterContext) as RouteComponentProps<Params, C, S>;
}

export const useRouter = () => {
    // const location = useLocation();
    // const history = useHistory();
    const { location, history } = useReactRouter();

    const router = useNextRouter();
    // next
    if (isNextApp()) {
        return {
            pathname: router?.pathname,
            search: router?.query,
            router,
        };
    }

    // react-router
    return {
        pathname: location?.pathname,
        search: location?.search,
        router: history,
    };
};
