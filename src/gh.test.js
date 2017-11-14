const gh = require('./gh.js');

const run = async () => {
  try {
    console.log(await gh.getLovedIssues());
  } catch (e) {
    console.log(e);
  }
};

run();
