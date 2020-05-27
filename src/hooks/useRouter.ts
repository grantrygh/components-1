import * as H from 'history';
import { useContext } from 'react';
import { RouteComponentProps, StaticContext, __RouterContext as RouterContext } from 'react-router';

export function useRouter<
    Params extends { [K in keyof Params]?: string } = {},
    C extends StaticContext = StaticContext,
    S = H.LocationState
>() {
    return useContext(RouterContext) as RouteComponentProps<Params, C, S>;
}
