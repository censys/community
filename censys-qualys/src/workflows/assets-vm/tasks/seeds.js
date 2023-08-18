// seeds.js

const {asTable} = _g.components;
const xml = _g.require['fast-xml-parser'];

module.exports = async function seeds(my){

  const apiBatch = my.argv.apiBatch ? my.argv.apiBatch : 1;
  const apiDelay = my.argv.apiDelay ? my.argv.apiDelay : 500;

  const seedsLabel = my.argv.seedsLabel ? my.argv.seedsLabel : 'qualys-vm';
  const testMode = my.argv.testMode ? true : false;

  let ca = await my.censys.api.saas.getAssetsHosts();
  if (ca.success){
    my.db.assets.import(ca.response.body.assets);

  } else {
    console.log(`There was an error getting host assets from Censys ASM. http status: ${cs.repsonse.status}`);
    return;
  }


  let qvm = await await my.qualysCloud.listIps();
  if(qvm.success){
    //convert qvm xml payload to json here. Dang this is ugly and fragile but it works
    // eventually this should be abstracted away into the emitter so a JSON payload is returned
    let qvmJson = xml.parse(qvm.response.body.bodyAsString);
    let qvmIpArray = qvmJson['IP_LIST_OUTPUT']['RESPONSE']['IP_SET']['IP'];
  
    let allQvmIps = [...new Set(qvmIpArray)]; // this shouldn't be necessary but, just in case, eliminate dups
    let qvmIps = [];
    for (i in allQvmIps) {
      qvmIps.push({
        ipv4: allQvmIps[i]
      });
    }
    my.db.qualys.import(qvmIps);

  } else {
    console.log(`There was an error getting IPs from Qualys. http status: ${qvm.repsonse.status}`);
    return;

  }

  let managedArray = [];
  my.db.assets.allRows();
  my.db.assets.rowSet.forEachRow( caRow => {
    my.db.qualys.where( qvmRow => qvmRow.ipv4.includes(caRow.data.ipAddress) );
    if(my.db.qualys.rowSet.numOfRows() != 0 ){
      managedArray.push(caRow.data.ipAddress);

    }
  })
  managedArray = testMode ? managedArray.slice(0,20) : managedArray;

  let allIps = [...new Set(managedArray)]; // eliminate duplicates
  let seedsArray = [];
  for (i in allIps) {
    seedsArray.push({
      type: 'IP_ADDRESS',
      value: allIps[i]
    });
  }
  let query = {label: seedsLabel};
  let data = await my.censys.api.saas.putSeeds({seeds: seedsArray}, query);
  if(!data.success){
    console.log(`Unable to import seeds in Censys ASM due to an error. http status: ${data.repsonse.status}`)

  }


  if (testMode){
    console.log('testMode enabled');
  }
  console.log(`Success! ${managedArray.length} seeds imported into Censys ASM.`)

}
















