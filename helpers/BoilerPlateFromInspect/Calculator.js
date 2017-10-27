// Requires the admc/wd client library
// (npm install wd)
// Then paste this into a .js file and run with Node 7.6+

const wd = require('wd');
const driver = wd.promiseChainRemote("localhost", 4723);
const caps = {"app":"Microsoft.WindowsCalculator_8wekyb3d8bbwe!App","platformName":"Windows","deviceName":"windowsPC"};

async function main () {
  await driver.init(caps);
  let els2 = await driver.elementsByName("One");
  await driver.quit();
}

main().catch(console.log);



