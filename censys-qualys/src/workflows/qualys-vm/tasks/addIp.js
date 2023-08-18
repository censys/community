// vm-add.js


module.exports = async function vm(my){

	const { argv, censys, qualysCloud, db } = my;

	// some test IPs
	let ips = ['10.2.2.3','10.2.3.4','10.2.4.3']

	const qc = await qualysCloud.addIps(ips);

	console.log(qc.response.body.bodyAsString)
  
}


