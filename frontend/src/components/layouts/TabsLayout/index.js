import React, { useMemo } from 'react';
import styles from './TabsLayout.module.scss';

import classNames from 'classnames';
import { Switch, Redirect, Route } from 'react-router-dom';
import { findIndex } from 'lodash-es';
import { Link } from 'react-router-dom';
import Footer from 'components/Footer';

const TabsLayout = ({ renderHeader, baseRoute, location, routes }) => {
    const hasHeader = typeof renderHeader === 'function';

    const activeIndex = useMemo(() => {
        const relativePath = location.pathname.replace(baseRoute, '');
        const idx = findIndex(routes, item => item.path === relativePath);

        return idx !== -1 ? idx : 0;
    }, [baseRoute, location.pathname, routes]);

    return (
        <div className={styles.wrapper}>
            {hasHeader && renderHeader()}
            <div className={styles.nav}>
                {routes.map((route, index) => (
                    <Link
                        key={index}
                        className={classNames({
                            [styles.navItem]: true,
                            [styles.navItemActive]: index === activeIndex
                        })}
                        to={`${baseRoute}${route.path}`}
                    >
                        {route.label}
                    </Link>
                ))}
            </div>
            <div className={styles.content}>
                <Switch>
                    {routes.map(({ key, path, hidden, render }, index) => {
                        if (hidden) {
                            return null;
                        } else {
                            return <Route key={index} exact path={`${baseRoute}${path}`} render={render} />;
                        }
                    })}
                    <Redirect to={baseRoute} />
                </Switch>
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
};

export default TabsLayout;
