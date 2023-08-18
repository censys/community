// index.js


const Filesystem = require('./services/Filesystem.js');
const S3 = require('./services/S3.js');

const storageServices = { file: Filesystem, s3: S3 };


module.exports = class {

	constructor(workflow, storage){

		let type = storage.type.toLowerCase();
		let Service = storageServices[type] ? storageServices[type] : storageServices['file'];
		let service = new Service(`${storage.path}`, `${workflow.name}`);

		this.type = type;

		this.init = async () => {

			let pa = [];

			// pa.push(service.mkdir(`tasks`));
			pa.push(service.makeDir('settings'));
			// pa.push(service.mkdir(`database`));

			let taskList = Object.keys(workflow.tasks)
			taskList.forEach( taskName => {
				pa.push(service.makeDir(`tasks/${taskName}`));

				pa.push(service.makeDir(`tasks/${taskName}/input`))
				pa.push(service.makeDir(`tasks/${taskName}/output`))
				pa.push(service.makeDir(`tasks/${taskName}/logs`))
			})
			return Promise.allSettled(pa);
		}

		this.listDir = async (dirPath, objectsOnly = true) => {
			return service.listDir(dirPath, objectsOnly);

		}

		this.makeDir = async (entity, entityPath = `tasks/${workflow.taskName}/input`) => {
			return service.makeDir(`${entityPath}/${entity}`);

		}
	
		this.get = async (entity, entityPath = `tasks/${workflow.taskName}/input`) => {
			return ( await service.get(`${entityPath}/${entity}`) );
		}

		this.exists = async (entity, entityPath = `tasks/${workflow.taskName}/input`) => {
			return ( await service.exists(`${entityPath}/${entity}`) );
		}
	
		this.put = async (data, entity, entityPath = `tasks/${workflow.taskName}/output`) => {
			data = ( typeof data == 'object' ) ? JSON.stringify(data, null, 2) : data.toString();
			await service.put(`${entityPath}/${entity}`, data);
		}

		this.delete = async (entity) => {
	
		}
	
		this.loadDir = async (entity) => {
			return await service.load(entity)
	
		}

		this.load = this.loadDir;

		this.log = async (entity) => {
			// console.log(workflow);

		}
	


	}
}











