import React from 'react';
import PropTypes from 'prop-types';
import Netlify from 'netlify-auth-providers';

export default function Login({ onAccessToken }) {
  return (
    <button onClick={() => onClick(onAccessToken)}>
      Log in with your GitHub account
    </button>
  );
}

Login.propTypes = {
  onAccessToken: PropTypes.func.isRequired,
};

function onClick(cb) {
  const authenticator = new Netlify({});
  authenticator.authenticate(
    { provider: 'github', scope: 'user' },
    (err, data) => {
      if (err) cb(undefined);
      else {
        window.localStorage.setItem('GH_TOKEN', data.token);
        cb(data.token);
      }
    }
  );
}
