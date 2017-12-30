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
  const authenticator = new Netlify({
    // eslint-disable-next-line camelcase
    site_id: 'maintainer-dashboard.netlify.com',
  });
  authenticator.authenticate(
    { provider: 'github', scope: 'user' },
    (err, data) => {
      // eslint-disable-next-line no-console
      if (err) console.warn(err.err.message);
      else {
        window.localStorage.setItem('GH_TOKEN', data.token);
        cb(data.token);
      }
    }
  );
}
