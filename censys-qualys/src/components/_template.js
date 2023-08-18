// _template.js

module.exports = function(){
	console.log(`This is the template for files in ./components:
  - files in ./components are loaded when ./components/_loader.js is called
  - only .js files where the name does not begin with underscore are loaded
  - object name will be the same as file name without .js extension
  - if only one function in file, assign function to module.exports
  `)
}