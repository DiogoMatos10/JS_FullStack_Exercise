import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import SecurityList from './components/SecurityList';
import SecurityDetail from './components/SecurityDetail';

// Config of Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000', 
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<SecurityList />} />
          <Route path="/securities" element={<SecurityList />} />
          <Route path="/securities/:symbol" element={<SecurityDetail />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
