// index.js

let collectors = ['censys'];
let emitters = ['qualys'];

async function initialize(){

    await _g.components.initWorkflowObject(this);
    
    // initialize collectors, emitters, and jorel db to used by all commands and that persist between calls
    const joreldb = _g.components['jorel-db'];  
    this.db = new joreldb.Database(`${__dirname}/jorel/model`);

    const userAgent = _g.components.userAgent(this.name);
    // this.censys = new this.collectors.censys( {...this.settings.censys.authentication, userAgent: userAgent} );

    this.censys = new this.collectors.censys( {
        ...this.settings.censys.authentication,
        userAgent: userAgent,
        // saas: { rootEndpoint: rootEndpoint, cookies: cookies }
    });
    
    
    this.qualysCloud = new this.emitters.qualys(this.settings.qualys);



}

module.exports = class {

    constructor(name) {
        this.name = name;
        this.collectors = collectors;
        this.emitters = emitters;
        this.initialize = initialize;
    } 
}


