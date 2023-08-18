// Filesystem.js

// const fs = require('fs').promises;
const fs = require('fs')


module.exports = class {
	constructor(rootDir, workflowName) {

		const storageDir = `${rootDir}/${workflowName}`;

		this.makeDir = async (dirPath, recursive = true) => {
			fs.mkdirSync(`${storageDir}/${dirPath}`, { recursive: recursive });
		}


		this.get = async (filePath) => {
			try {
				let data = fs.readFileSync(`${storageDir}/${filePath}`);
				data = /.*\.json$/.test(filePath) ? JSON.parse(data.toString()) : data.toString();
				return data;
			}
			catch(error) {
				return undefined;
			}
			
		}

		this.put = async (filePath, data = '') => {
			await this.delete(`${storageDir}/${filePath}`);
			fs.writeFileSync(`${storageDir}/${filePath}`, data);
		}

		this.delete = async (filePath) => {
			try {
				if (fs.statSync(`${storageDir}/${filePath}`).isFile()) {
					fs.unlinkSync(`${storageDir}/${filePath}`);
				}
			}
			catch(error){

			}
		}

		this.append = async (filename, data) => {
			// fsPromises.appendFile(`${dir}/${filename}`, data);
			
		}

		this.load = async (filePath) => {
			return _g.load(`${storageDir}/${filePath}`);
		}

		this.exists = async (filePath) => {
			return fs.existsSync(`${storageDir}/${filePath}`);
		}
		
	}
}

