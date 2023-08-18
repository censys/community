// index.js


let collectors = [];
let emitters = [];

async function initialize(){

    await _g.components.initWorkflowObject(this);

    this.taskDispatch = inspect;

}

module.exports = class {

    constructor(name) {
        this.name = name;
        this.collectors = collectors;
        this.emitters = emitters;
        this.initialize = initialize;
    } 
}


function inspect(argv){

  let object = argv._[1] ? _g[argv._[1]] : _g;
  const properties = argv._.slice(2);

  for (let i in properties){
    try{
      object = object[properties[i]]

    }
    catch(err){

    }
  }
  const output = argv.asString ? JSON.stringify(object, null, 2) : object;
  console.log(output);

}