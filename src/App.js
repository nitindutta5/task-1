import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Link from './pages/Link'
import Post from './pages/Post'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/link">
            <Link />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
