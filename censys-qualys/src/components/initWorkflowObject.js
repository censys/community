// initWorkflowObject.js

module.exports = async function initWorkflowObject(workflow) {

  // before calling initWorkflowObject, the following should be defined on the properties of object workflow
  // workflow.name
  // workflow.collectors (an array of collector names or empty array)
  // workflow.emitters (an array of emitter names or empty array)

  workflow.collectors = (workflow.collectors) ? workflow.collectors : [];
  workflow.emitters = (workflow.emitters) ? workflow.emitters : [];

	workflow.dir = `${_g.app.dir}/workflows/${workflow.name}`;

  workflow.tasks = _g.load(`${workflow.dir}/tasks`);

  workflow.storage = new _g.app.storage.service(workflow, _g.app.storage);
  await workflow.storage.init();

	workflow.resources = _g.load(`${workflow.dir}/resources`);

  workflow.help = _g.load(`${workflow.dir}/help`);

	workflow.components = _g.load(`${workflow.dir}/components`);

  let wfSettings = await workflow.storage.load('settings');
  workflow.settings = _g.components.obj.merge(_g.app.settings, wfSettings);

	workflow.collectors = (workflow.collectors.length > 0) ? _g.load('collectors', ...workflow.collectors) : {};

	workflow.emitters = (workflow.emitters.length > 0) ? _g.load('emitters', ...workflow.emitters) : {};

  workflow.taskDispatch = taskDispatch;

  workflow.defaultTask = undefined;

  // at this point: test for settings file(s) and copy templates from workflowName/resources
}


async function taskDispatch(argv){

  this.argv = argv; // update this.argv for tasks on every call to task
  this.taskName = argv._[1] ? argv._[1] : this.defaultTask;

  if(argv.help){
    _g.components.showHelp(this, this.taskName);
    return;
  }

  if ( typeof this.tasks[this.taskName] == 'function'){
    await this.tasks[this.taskName](this);

  } else {
      console.log(`Unknown task: ${this.taskName}`);
  }

}
