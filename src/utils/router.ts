import { queryString } from '@audentio/utils/src/queryString';
import * as H from 'history';
import NextLink from 'next/link';
import { useRouter as useNextRouter } from 'next/router';
import { useContext } from 'react';
import { RouteComponentProps, StaticContext, __RouterContext as RouterContext } from 'react-router';
import { NavLink as ReactRouterLink } from 'react-router-dom';
import { isNextApp } from '../utils/isNextApp';

export function useReactRouter<
    Params extends { [K in keyof Params]?: string } = {},
    C extends StaticContext = StaticContext,
    S = H.LocationState
>() {
    const router_context = useContext(RouterContext) as RouteComponentProps<Params, C, S>;

    if (router_context === undefined) {
        // will use light theme by default
        return null;
    }

    return router_context;
}

export const useRouter = () => {
    // const location = useLocation();
    // const history = useHistory();
    const reactRouter = useReactRouter();
    const router = useNextRouter();

    // next
    if (isNextApp()) {
        return {
            id: 'next',
            pathname: router?.pathname,
            search: queryString.stringify(router?.query),
            router,
            Link: NextLink,
        };
    }

    // react-router
    if (reactRouter) {
        return {
            id: 'react-router',
            pathname: reactRouter?.location?.pathname,
            search: reactRouter?.location?.search,
            router: reactRouter?.history,
            Link: ReactRouterLink,
        };
    }

    return {
        id: null,
        pathname: null,
        search: null,
        router: null,
        Link: null,
    };
};
