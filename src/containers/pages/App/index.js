import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </ul>
      </div>
      <Route path='/' exact component={Dashboard}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
    </Router>
  );
}

export default App;
