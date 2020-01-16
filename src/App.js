import React from 'react';
import './App.css';

// apollo stuff
// Apollo Boost includes packages that are essential for building an Apollo app, like in-memory cache, local state management, and error handling. It's also flexible enough to handle features like authentication.
// Basically, Apollo Boost has a bunch of stuff baked in that makes it easier to use apollo
import ApolloClient from 'apollo-boost';
// The ApolloProvider is similar to React's Context.Provider. It wraps your React app and places the client on the context, which allows you to access it from anywhere in your component tree
import { ApolloProvider } from '@apollo/react-hooks';

// gql function parses a query string into a query document
import { gql } from 'apollo-boost';

// useQuery is a hook exported from @apollo/react-hooks that leverages the Hooks API to share GraphQL data with your UI
// First, pass your GraphQL query wrapped in the gql function into the useQuery hook. When your component renders and the useQuery hook runs, a result object will be returned containing loading, error, and data properties. Apollo Client tracks error and loading state for you, which will be reflected in the loading and error properties. Once the result of your query comes back, it will be attached to the data property
import { useQuery } from '@apollo/react-hooks';

const cryptoClient = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
});

const dogsClient = new ApolloClient({
  uri: 'https://32ypr38l61.sse.codesandbox.io/',
})

const GET_DOGS = gql `
  {
    dogs {
      id
      breed
    }
  }
`;

function Dogs({onDogSelected}) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if(loading) return 'Loading...';
  if(error) return `Error! ${error.message}`;

  return (
    <select name='dog' onChange={onDogSelected}>
      {data.dogs.map(dog => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
}

function App() {
  return (
    <ApolloProvider client={dogsClient}>
      <div className="App">
        <Dogs />
      </div>
    </ApolloProvider>
  );
}

export default App;
