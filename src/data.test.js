const data = require('./data.js');

const run = async () => {
  try {
    console.log(await data.getLovedIssues());
  } catch (e) {
    console.log(e);
  }
};

run();
