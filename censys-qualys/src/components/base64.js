// base64.js


function encode(data) {
	let buff = new Buffer(data, 'ascii');
	return buff.toString('base64');
}


function decode(data) {
	let buff = new Buffer(data, 'base64');
	return buff.toString('ascii');
}


module.exports.encode = encode;
module.exports.decode = decode;
