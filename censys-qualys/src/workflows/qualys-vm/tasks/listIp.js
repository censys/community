// vm-list.js


module.exports = async function vm(my){

  const { argv, censys, qualysCloud, db } = my;


  const qc = await qualysCloud.listIps();

  console.log(qc.response.body.bodyAsString)
  
}

