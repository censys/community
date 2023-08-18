// index.js


let collectors = [];
let emitters = [];

async function initialize(){

    await _g.components.initWorkflowObject(this);

    this.taskDispatch = help;

}

module.exports = class {

    constructor(name) {
        this.name = name;
        this.collectors = collectors;
        this.emitters = emitters;
        this.initialize = initialize;
    } 
}


function help(argv){

  _g.components.showHelp(this, 'index');

}