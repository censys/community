// unquote.js

module.exports = function (strToUnquote){
	if (strToUnquote){
    	let regex = /^["'].*["']$/;
    	return (regex.test(strToUnquote) ? strToUnquote.slice(1,-1) : strToUnquote) ;
 }
}