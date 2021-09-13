import React, { useEffect } from "react";
import {
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Links from './pages/Links'
import Posts from './pages/Posts'
import styles from './styles/SideNav.module.css'


const Layout = () => {
    let location = useLocation();
    console.log(location)
    return (
        <>
            <div className={styles.sidebar}>
                <Link className={location.pathname === "/" ? styles.active : ''} to="/">Dashboard</Link>
                <Link className={location.pathname === "/posts" ? styles.active : ''} to="/posts">Posts</Link>
                <Link className={location.pathname === "/links" ? styles.active : ''} to="/links">Links</Link>
            </div>

            <div className={styles.content}>
                <Switch>
                    <Route path="/" exact>
                        <Dashboard />
                    </Route>
                    <Route path="/links">
                        <Links />
                    </Route>
                    <Route path="/posts">
                        <Posts />
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default Layout