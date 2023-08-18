// S3.js

const aws = _g.require['aws-sdk'];


module.exports = class {
	constructor(rootDir, workflowName) {

		const s3 = new aws.S3();

		const bucket = rootDir;
		const storageDir = workflowName;

		this.makeDir = (dirPath) => {
			return s3.putObject({
				Bucket: bucket, 
				Key: `${storageDir}/${dirPath}/` }).promise();
		}

		this.listDir = async (dirPath, objectsOnly = true) => {
			let prefix = `${storageDir}/${dirPath}`;
			prefix = /.*\/$/.test(prefix) ? prefix : `${prefix}/`;
			let objList = await s3.listObjectsV2({
				Bucket: bucket, 
				Prefix: prefix,
				StartAfter: prefix }).promise();

			let dirList = [];
			objList.Contents.forEach( i => {
				let regex = new RegExp(`^${prefix}`);
				let dirItem = i.Key.replace(regex, '');

				let items = dirItem.split('/');
				switch (items.length) {
					case 1 :
						dirList.push(items[0]);
						break;

					case 2 :
						if ( items[1] == '' && !objectsOnly ) {
							dirList.push(`${items[0]}/`);
						}
						break;
				}
			});
			return dirList;
		}

		this.get = (objectPath) => {
			return s3.getObject({
  				Bucket: bucket, 
  				Key: `${storageDir}/${objectPath}` }).promise();	
		}

		this.put = (objectPath, data = '') => {
			return s3.putObject({
				Body: data,
				Bucket: `${bucket}`, 
				Key: `${storageDir}/`,}).promise();
		}

		this.delete = async (objectPath) => {

			
			
		}

		this.append = async (objectPath, data) => {

			
		}

		this.load = async (dirPath) => {
			let prefix = `${storageDir}/${dirPath}`
			prefix = /.*\/$/.test(prefix) ? prefix : `${prefix}/`;

			let objList = await s3.listObjectsV2({
				Bucket: bucket, 
				Prefix: prefix,
				StartAfter: prefix }).promise();

			let keyList = objList.Contents.map(item => item.Key);

			let keyPromises = keyList.map( key => { return s3.getObject({ Bucket: bucket, Key: key }).promise(); })

			let allPromises = await Promise.allSettled(keyPromises);

			let allObjects = allPromises.map( data => data.value.Body);

			let resultObj = {};
			for(let i in allObjects){
				let path = keyList[i];
				let objName = path.match(/.*\/(.*)\.json$/, '')[1];
				let result = {}
				try {
					result = JSON.parse(allObjects[i].toString());
				}
				catch(error) {
				}

				resultObj[objName] = result;
			}
			return resultObj;
		}

		this.exists = async (objectPath) => {
			

		}



	}

}