const data = require('./data.js');

const run = async () => {
  const oldIssues = await data.getOldIssues();
  console.log(oldIssues);
};

run();
