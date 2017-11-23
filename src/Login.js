//
//
//   if (err) {
//     return $("#output").text("Error Authenticating with GitHub: " + err);
//   }
//   $("#output").text("Authenticated with GitHub. Access Token: " + data.token);
// });

import React from 'react';
// import netlify from 'netlify-auth-providers';

export default function Login({ onAccessToken }) {
  return (
    <button onClick={() => onClick(onAccessToken)}>Log in with your GitHub account</button>
  );
}

function onClick(cb) {
  const authenticator = new netlify.default({});
  authenticator.authenticate(
    { provider: 'github', scope: 'user' },
    (err, data) => {
      if (err) cb(undefined);
      else cb(data.token);
    }
  );
}
