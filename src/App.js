import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthContext from './store/auth-context';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {

  const authctx=useContext(AuthContext)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authctx.isLoggedIn && 
        (<Route path='/auth'>
          <AuthPage />
        </Route>
        )}
       
          <Route path='/profile'>
          { authctx.isLoggedIn && 
          <UserProfile />}
          {!authctx.isLoggedIn && <Redirect to='/auth' />}
          
        </Route>
      

        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
