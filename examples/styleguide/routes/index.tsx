import React from 'react';
// import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import { AppShell } from '../components/AppShell';

function Routes() {
    return (
        <AppShell>
            <Switch>
                <Route exact path="/" component={require('./home').default} />
                <Route path="/shop" component={require('./shop').default} />
            </Switch>
        </AppShell>
    );
}

// export default __DEV__ ? hot(module)(Routes) : Routes;
export default Routes;
