// importFromLogbook.js

module.exports = async function importFromLogbook(my) {
  const { argv, censys, qualysCloud, db } = my;

  let idFrom = argv.idFrom ? Number(argv.idFrom) : 0;
  let saved = await my.storage.get("lastId.json");
  idFrom = saved ? Number(saved.lastId) : idFrom;

  const addIps = argv.addIps ? argv.addIps : true;
  const excludeIps = argv.excludeIps ? argv.excludeIps : false;

  const trialMode = argv.trialMode ? argv.trialMode : false; //trialMode will truncate the list of IPs for testing on a trial version of Qualys

  // const addType = argv.addType ? argv.addType : '';
  // const addOperation = argv.addOperation ? argv.addOperation : '';

  // const excludeType = argv.excludeType ? argv.excludeType : '';
  // const excludeOperation = argv.excludeOperation ? argv.excludeOperation : '';

  if (Number.isNaN(idFrom)) {
    console.log(
      "Error: idFrom is not a number. Verify the lastId.json and settings.yaml contain a valid number value for idFrom."
    );
    return;
  }

  if (idFrom == 0) {
    // limit the filter type to HOST when downloading the entire logbook since this may be very large
    filter = { type: ["HOST"] };
  }

  let results = {};
  results = await censys.api.saas.getLogbookCursor({
    filter: {},
    idFrom: idFrom,
  });

  let cursor = results.data.cursor;
  let lb = await censys.api.saas.getLogbookData({ cursor: cursor });

  if (lb.success) {
    db.logbook.import(lb.data);

    // get the last id retrieved
    db.logbook.allRows();
    db.logbook.lastRow();
    let dbLastId = db.logbook.row["id"];

    // if(addType != ''){
    if (addIps) {
      await doQualys(qualysCloud.addIps, "HOST", "ASSOCIATE", dbLastId, my, trialMode);
    }

    // if(excludeType != ''){
    if (excludeIps) {
      await doQualys(qualysCloud.excludeIps, "HOST", "DISASSOCIATE", dbLastId, my, trialMode);
    }
  }
};

async function doQualys(qcAction, type, operation, dbLastId, my, trialMode = false) {
  my.db.logbook.where((row) => row.type == type && row.operation == operation);

  // convert ip addresses to an array and eliminate duplicates
  let { entity } = my.db.logbook.rowSetToArray({ entity: [] });
  let ips = entity.map((i) => i.ipAddress);
  ips = [...new Set(ips)];

  ips = trialMode ? ips.slice(1, 20) : ips; //truncate number of IPs for Qualys trial mode

  if (ips.length > 0) {
    const qc = await qcAction(ips);

    if (qc.success && typeof dbLastId == "number") {
      await my.storage.put({ lastId: dbLastId + 1 }, "lastId.json", `tasks/${my.taskName}/input`);

      // summarize results and output to console
      console.log();
      console.log(`Summary:${trialMode ? " *** TRIAL MODE" : ""}`);
      console.log("-------");
      console.log(`Total number of events: ${my.db.logbook.numOfRows()}`);
      console.log(`Number of ${type}, ${operation} events: ${my.db.logbook.rowSet.numOfRows()}`);
      console.log(`Number of IPs shipped to Qualys VM instance: ${ips.length}`);
      console.log();
    }
  }
}
