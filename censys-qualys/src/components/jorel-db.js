// jorel-db.js - JSON Object Relational Database

function Database(modelPath = '.', dataPath = `${modelPath}/tables`){
	_initSchema(this, modelPath, dataPath);
}

function _initSchema(db, modelPath, dataPath){
	db._path = modelPath;
	db._schema = require(`${modelPath}/schema.json`);
	db._exec = require(`${modelPath}/functions/_loader.js`);
	db._var = {};

	// let extractors = require(`${modelPath}/extractors/_loader.js`);

	for(let i in db._schema.table){
		tableName = db._schema.table[i].name;
		db[tableName] = new Table();
		db[tableName]._db = db;
		db[tableName]._schema = db._schema;
		db[tableName]._name = tableName;
		db[tableName]._tableSchema = db._schema.table[i];
		db[tableName].rowSet = new RowSet;
		db[tableName].rowSet._table = db[tableName];

		// db[tableName]._extractors = extractors;
		// db[tableName]._extractors = require(`${dataPath}/${tableName}/extractors/_loader.js`);
		db[tableName]._extractors = load('extractors',`${modelPath}/tables/${tableName}`);
	}
}

function Table(){
	this._db = {};
	this._name = '';
	this._schema = [];
	this._tableSchema = {};
	this._row = [];
	this._namedRowSet = {};

	this.rowSet = {};
	this.row = {};

	this.var = {};

	this.extract = (extractor) => { 
		extractor = extractor ? extractor : '_default';
		let extractArray = [];
		this.rowSet.forEachRow( row => {
			this._extractors[extractor](this, extractArray);
		});
		return extractArray;
	}

	this._loadRow = (rowToLoad) =>{ // never copy from the loaded row since it points to proxy and not actual row
		this.row = proxyRow((rowToLoad) ? rowToLoad : {}); // if object is undefined then set to an empty object so proxy has something to proxy
		return this.row;
	}

	this.saveRowSet = (rowSetName) => {
		this._namedRowSet[rowSetName] = [...this.rowSet._row];
	}

	this.useRowSet = (rowSetName) => {
		this.rowSet._row = [...this._namedRowSet[rowSetName]];
	}

	this.appendRowSet = (rowSetName) => {
		this.rowSet._row = [...this.rowSet._row, ...this._namedRowSet[rowSetName]];
		// this._namedRowSet[rowSetName] = [...this._namedRowSet[rowSetName], ...this.rowSet._row];
	}

	this.deleteRowSet = (rowSetName) => {
		delete this._namedRowSet[rowSetName];
	}

	this.rowSetToArray = (objOfColArrays) => {
		this.rowSet.forEachRow( row => {
			for (let j in objOfColArrays){
				objOfColArrays[j].push(row[j]);
			}
		});
		return objOfColArrays;
	}

	this.clearFilter = () => { this._filter = row => false }
	this.setFilter = (filterFunc) => { this._filter = filterFunc; }
	this._filter = row => false;

	this._filterStack = [];
	this.pushFilter = () => {
		this._filterStack.push(this._filter);
	}
	this.popFilter = () => {
		this._filter = (this._filterStack.length == 0) ? row => false : this._filterStack.pop();
	}

	this._updateRowSet = (arrayOfObjects) =>{
		this.rowSet._row = [];
		for(let i in arrayOfObjects){
			this._filter(arrayOfObjects[i]) ? {} : this.rowSet._row.push(arrayOfObjects[i]);
		}
		this._loadRow(this.rowSet._row[0]);
	}

	this.relateRowToOne = (oneTable) => {
		oneColumn = this._db[oneTable]._tableSchema['primaryKey'];
		manyColumn = this._tableSchema.foreignKey[oneTable];
		this._db[oneTable].find(oneColumn, this.row[manyColumn]);
	}

	this.relateRowToOneAll = () => {
		for( let oneTable in this._tableSchema['foreignKey']) {
			this.relateRowToOne(oneTable);
		}
	}

	this.relateRowSetToOne = (oneTable) => {
		let tmpArray = [];
		this.rowSet.forEachRow ( (row) => {
			this.relateRowToOne(oneTable);
			tmpArray = [...tmpArray, ...this._db[oneTable].rowSet._row];

		});
		this._db[oneTable]._updateRowSet([...new Set(tmpArray)]);
	}

	this.relateRowToMany = (manyTable) => {
		oneColumn = this._tableSchema['primaryKey'];
		manyColumn = this._db[manyTable]._tableSchema.foreignKey[this._tableSchema.name];
		this._db[manyTable].find(manyColumn, this.row[oneColumn]);
	}

	this.relateRowSetToMany = (manyTable) => {
		let tmpArray = [];
		this.rowSet.forEachRow ( (row) => {
			this.relateRowToMany(manyTable);
			tmpArray = [...tmpArray, ...this._db[manyTable].rowSet._row];

		});
		this._db[manyTable]._updateRowSet(tmpArray);
	}

	this.relateRowToOneCascade = () => {
		for(let foreignTable in this._tableSchema.foreignKey){
			this.relateRowToOne(foreignTable);
			this._db[foreignTable].relateRowToOneCascade();
			
		}
	}

	this.projectRowToMany = (...tab) => {
		this.relateRowToMany(tab[0]);
		for(let i = 0, len = tab.length-1; i<len; i++){
			this._db[tab[i]].relateRowSetToMany(tab[i+1]);
		}
		
	}

	this.import = (arrayOfObjects, importFunc) => {
		// this._row = [...arrayOfObjects];

		this._row = importFunc ? arrayOfObjects.map(importFunc) : [...arrayOfObjects];

		for(let i in this._tableSchema.index){
			this._createIndex(this._tableSchema.index[i])
		}

	};

	this.numberOfRows = this.numOfRows = () => { return this._row.length } // number of rows in table

	this.allRows = () => { this._updateRowSet([...this._row]); }

	this.noRows = () => { this._updateRowSet([]) }

	this.firstRow = () => { this._loadRow(this.rowSet._row[0]) }

	this.lastRow = () => { this._loadRow(this.rowSet._row[this.rowSet.numOfRows()-1]) }

	this.forAllRows = (cb) => {
		this.allRows();
		this.rowSet.forEachRow(cb);
	}

	this._createIndex = (keyToIndex) => { 
		let index = this['_indexOf_'+keyToIndex] = {};
		for (let rowNum in this._row){ // this could be optimized by creating all indexes in a single loop
			this._row[rowNum]._rowNumber = rowNum; 	// add row numbers while indexing.
													// this creates a requirement that there must be at least one index

			valToIndex = this._row[rowNum][keyToIndex];
			index[valToIndex] = (index[valToIndex]) ? index[valToIndex] : [];  // ( index[valToIndex] ) ? { } : index[valToIndex] = []; 
			index[valToIndex].push(this._row[rowNum]);

			this._tableSchema.column = [ ...new Set([...this._tableSchema.column, ...Object.keys(this._row[rowNum])]) ];
		}
	}

	
	this.match = this.find = (key, val, compareFunc) => {
		let index = this['_indexOf_'+key];
		let foundSet = [];
		if (index && !compareFunc){ // if there's an index and no comparison function, use index to find exact match
			foundSet = (index[val]) ? index[val] : [];

		} else { // compare value in each rows when index can't be used
			if (!compareFunc){ // if no comparison function is passed, set the default
				compareFunc = (rowsVal,val) => { return(rowsVal == val) }
		
			}
			for (let rowNum in this._row){
				rowsVal = (key in this._row[rowNum]) ? this._row[rowNum][key] : '';
				if (compareFunc(rowsVal, val, this._row[rowNum])) {
					foundSet.push(this._row[rowNum]);
				}
			}
		}
		this._updateRowSet([...foundSet]);
		return this.rowSet;
	}

	this.where = (compareFunc) => {
		let foundSet = [];
		for (let rowNum in this._row){
			if (compareFunc(this._row[rowNum])) {
				foundSet.push(this._row[rowNum]);
			}
		}
		this._updateRowSet([...foundSet]);
		return this.rowSet;
	}
	
	this.contains = this.contain = (key, val) => {
			return this.match(key, val, (rowsVal, value) => {
				return rowsVal.search(new RegExp(value, 'i')) != -1 ;
				})	
	}
}


function proxyRow(objToProxy){
	let proxy = new Proxy ( objToProxy, {
		get(trapTarget, key, receiver) {
			if (!(key in receiver)) {
				return ''; // if key doesn't exist, return empty string instead of undefined
			}
			return Reflect.get(trapTarget, key, receiver)
		}
	});
	return proxy;
}


function RowSet(){
	this._row = [];
	this._table = {};

	this.forEachRow = (cb) => {
		for (let i in this._row) {
			cb(this._table._loadRow(this._row[i]));
		}
	}

	this.numberOfRows = this.numOfRows = () => { return this._row.length } //number of row in rowSet

	this.sort = (column, order='<') => {
		this._row.sort( (a,b) => {
			// return (a[column] < b[column] ? -1 : (a[column] > b[column] ? 1 : 0)); // this sorts lowercase after uppercase....

			// locale compare is much slower but sorts non-latin character sets properly
			return ( order == '>' ? b[column].localeCompare(a[column]) : a[column].localeCompare(b[column]) ) 
		})
		return this;
	}
}

function load(name, path = './'){
	let target = `${path}/${name}/_loader.js`;
	delete require.cache[require.resolve(target)];
	return require(target);

}

module.exports.Database = Database;

