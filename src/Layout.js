import {
    BrowserRouter as Router,
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

    return (
        <>
            <Router>
                <div className={styles.sidebar}>
                    <Link className={styles.active} to="/">Dashboard</Link>
                    <Link to="/posts">Posts</Link>
                    <Link to="/links">Links</Link>
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
            </Router>

        </>
    )
}

export default Layout