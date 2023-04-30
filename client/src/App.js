import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import apollo client, provider, and memory cache 
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';

// importing set client from apollo server 
import { setContext } from '@apollo/client/link/context';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// created a new apollo client to work with our db 
const httpLink = createHttpLink({
  uri: '/graphql',
});

// request middleware that jwt token to every request as an authorization header 
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// setting up client to let the authlink work before the requests to graphql come through
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client = {client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
