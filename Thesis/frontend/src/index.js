import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import InitialPage from './InitialPage/InitialPage'

const root = createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const bakcendApiId = process.env.REACT_APP_BACKEND_API_IDENTIFIER

root.render(
<Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: bakcendApiId
    }}
  >
    <InitialPage />
  </Auth0Provider>,
);