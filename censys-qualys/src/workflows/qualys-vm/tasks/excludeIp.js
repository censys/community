// vm-add.js


module.exports = async function vm(my){

	const { argv, censys, qualysCloud, db } = my;

	// a test IP
	const qc = await qualysCloud.excludeIps(['10.2.3.4']);

	console.log(qc.response.body.bodyAsString)
  
  

}

