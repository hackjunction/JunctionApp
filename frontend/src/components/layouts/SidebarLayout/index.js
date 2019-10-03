import React, { useState, useMemo, useCallback } from 'react';
import styles from './SidebarLayout.module.scss';
import { Layout, Icon } from 'antd';
import { findIndex } from 'lodash-es';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import CenteredContainer from 'components/generic/CenteredContainer/index';

const SIDEBAR_WIDTH = 300;
const COLLAPSED_WIDTH = 0;

const SidebarLayout = React.memo(({ renderTop, renderSidebarTop, baseRoute, location, routes, theme = 'white' }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    const activeIndex = useMemo(() => {
        const relativePath = location.pathname.replace(baseRoute, '');
        const idx = findIndex(routes, item => item.path === relativePath);

        return idx !== -1 ? idx : 0;
    }, [baseRoute, location.pathname, routes]);

    const closeSidebar = useCallback(() => {
        setSidebarCollapsed(true);
    }, []);

    const openSidebar = useCallback(() => {
        setSidebarCollapsed(false);
    }, []);

    const hasTop = typeof renderTop === 'function';
    const hasSidebarTop = typeof renderSidebarTop === 'function';
    const topHeight = hasSidebarTop ? 200 : 50;

    return (
        <Layout
            className={classNames({
                [styles.layout]: true,
                [styles.layoutWhite]: theme === 'white',
                [styles.layoutLight]: theme === 'light'
            })}
        >
            <Layout.Sider
                theme="light"
                collapsible
                collapsed={sidebarCollapsed}
                onCollapse={setSidebarCollapsed}
                breakpoint="lg"
                width={SIDEBAR_WIDTH}
                collapsedWidth={COLLAPSED_WIDTH}
                className={styles.sidebar}
                trigger={null}
            >
                <div className={styles.sidebarInner}>
                    <motion.div
                        className={styles.sidebarOverlayTop}
                        animate={{
                            paddingBottom: topHeight + activeIndex * 50
                        }}
                        transition="linear"
                    />
                    <motion.div
                        className={styles.sidebarOverlayBottom}
                        animate={{
                            top: topHeight + (activeIndex + 1) * 50
                        }}
                        transition="linear"
                    />
                    <div className={styles.sidebarContentTop}>
                        {hasSidebarTop && renderSidebarTop(sidebarCollapsed)}
                    </div>
                    <div className={styles.sidebarContentBottom} style={{ top: topHeight }}>
                        {routes.map((route, index) => {
                            const className = classNames({
                                [styles.sidebarInnerItem]: true,
                                [styles.sidebarInnerItemActive]: index === activeIndex
                            });
                            return (
                                <Link className={className} key={index} to={`${baseRoute}${route.path}`}>
                                    <Icon type={route.icon} className={styles.sidebarInnerItemIcon} />
                                    <span
                                        className={classNames({
                                            [styles.sidebarInnerItemTitle]: true,
                                            [styles.sidebarInnerItemTitleCollapsed]: sidebarCollapsed
                                        })}
                                    >
                                        {route.label}
                                    </span>
                                </Link>
                            );
                        })}
                        <div className={styles.sidebarClose} onClick={closeSidebar}>
                            <span className={styles.sidebarCloseText}>Close menu</span>
                        </div>
                    </div>
                </div>
            </Layout.Sider>
            <Layout.Content>
                <div
                    className={classNames({
                        [styles.content]: true,
                        [styles.contentCollapsed]: sidebarCollapsed
                    })}
                >
                    <div
                        onClick={openSidebar}
                        className={classNames({
                            [styles.sidebarTrigger]: true,
                            [styles.sidebarTriggerCollapsed]: sidebarCollapsed
                        })}
                    >
                        <Icon type="menu" className={styles.sidebarTriggerIcon} />
                    </div>
                    {hasTop && renderTop()}
                    <CenteredContainer className={styles.pageWrapperInner} wrapperClass={styles.pageWrapper}>
                        <Switch>
                            {routes.map(({ key, path, hidden, render }, index) => {
                                if (hidden) {
                                    return null;
                                } else {
                                    return (
                                        <Route key={index} exact path={`${baseRoute}${path}`}>
                                            {render()}
                                        </Route>
                                    );
                                }
                            })}
                            <Redirect to={baseRoute} />
                        </Switch>
                    </CenteredContainer>
                </div>
            </Layout.Content>
            {!sidebarCollapsed && <div className={styles.hideSidebarOverlay} onClick={closeSidebar} />}
        </Layout>
    );
});

export default SidebarLayout;
