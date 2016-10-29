function loadData() {
	var dbf = fs.readFileSync('database.json', 'utf8');
	if (!dbf) {
		return;
	}
	var pl = fs.readFileSync('pokemonList.json', 'utf8');
	if (pl) pokemonList = JSON.parse(pl);

	var db = JSON.parse(dbf);
	database = db;
    if (!database.boardGame) database.boardGame = newBoardGame(100);

	console.log('Loaded database. '+dbf.length+' characters.');
}

function saveData() {
	shufleData();

	var db = JSON.stringify(database);
	fs.writeFile('database.json', db);
	console.log('Saved database. '+db.length+' characters.');
}

loadData();