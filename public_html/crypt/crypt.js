var lastTry = "";
var newPhrase = 'CryP7'
var solution = "";
var myAttempt = "";
var playing = false;
var hinted = [];
var hintAttempts = 3;
var gameAttempts = 3;
var points = 0;
var gamePoints = 0;

function animateCryptHeader() {
	if (playing) return;
	var h = animCrypt(newPhrase, lastTry);
	lastTry = h;
	echo('cryptAnim', h)
}
var rtPos = 0;
function randomTitle() {
	var s = 'CryP7';
	var n = randChar();
	var l = "";
	var ss = s.split("");
	for (i = 0; i < ss.length; i++) {
		if (i == rtPos) {
			l+=n;
		}
		else {
			l+=ss[i];
		}
	}
	rtPos = rand(0,s.length);
	
	document.title = l;
	setTimeout(function() {
		document.title = 'CryP7';
	}, 100);
}
var helpShown = false;
function help() {
	if (helpShown) {
		newGame();
		return;
	}
	document.getElementById('playbtn').value = 'Jugar';
	echo('cryptGame', '<span style="font-size: 18px">Intenta descifrar la frase que aparece en pantalla.<br><br>\
	Cada letra corresponde a otra letra del abecedario (Sin repeticiones).<br>\
	Por ejemplo: [ t=z, g=h, a=w, o=a ]<br>\
	Si apareciese la palabra "HWZA", la respuesta sería "GATO".<br><br>\
	</span>');
	helpShown = true;
}
var abcd = [];
var guesses = [];
function newDictionary() {
	abcd = [];
	guesses = [];
	var n = 65;
	for (i = 0; i < 26; i++) {
		abcd[i] = String.fromCharCode(n++);
	}
	for (i = 0; i < 1000; i++) {
		var s1 = rand(0,(abcd.length-1));
		var s2 = rand(0,(abcd.length-1));
		var c = abcd[s1];
		abcd[s1] = abcd[s2];
		abcd[s2] = c;
	}
}
function letNo(num) {
	return String.fromCharCode(65+num).toLowerCase();
}
function cryptCrypt(text) {
	var tx = text.toLowerCase();
	for (i = 0; i < abcd.length; i++) {
		var rep = letNo(i);
		var torep = abcd[i];
		tx = tx.replace(new RegExp(rep, 'g'), torep);
	}
	return tx;
}
function updatePoints() {
	pointsDisplay.innerHTML = points+' puntos';
	cryptGame.innerHTML = 'Descifra la siguiente frase por '+gamePoints+' puntos';
}
function newGame() {
	hintAttempts = 3;
	gameAttempts = 3;
	newDictionary();
	var len = cryptDataBase.length-1;
	solution = cryptDataBase[rand(0,len)];
	newPhrase = cryptCrypt(solution);

	gamePoints = (10 * newPhrase.length);
	var ll = 'Descifra la siguiente frase: ';
	echo('cryptGame', ll);
	updatePoints();
	document.getElementById('playbtn').style.display = 'none';

	document.getElementById('butHints').style.display = 'inline';
	updateHints();
	document.getElementById('butGuess').style.display = 'inline';
	document.getElementById('butSolve').style.display = 'inline';

	document.getElementById('guessIndex').style.display = 'inline';
	document.getElementById('guessGuess').style.display = 'inline';
	document.getElementById('solveText').style.display = 'inline';

	document.getElementById('sup').style.display = 'table-row';
	document.getElementById('anim').style.display = 'table-cell';

	guessIt();
}
function guess(index, solution) {
	if (!index) index = guessIndex.value.toUpperCase();
	if (!solution) solution = guessGuess.value.toLowerCase();

	var index = abcd.indexOf(index);
	if (!hinted[index]) guesses[index] = solution;

	guessTable();
}
function solve() {
	var value = solveText.value;
	if (!value) return;
	checkWin(value, true);
}
function checkWin(newP, manual) {
	console.log('Checking for '+newP);
	if (newP.toUpperCase() == solution.toUpperCase()) {
		cryptWin();
		return;
	}
	if (manual) {
		gamePoints = Math.ceil(gamePoints / 2);
		gameAttempts--;
		if (gameAttempts <= 0) {
			notification('Has agotado el número máximo de intentos.');
			newGame();
			return;
		}
		notification('La respuesta no es correcta. Inténtalo de nuevo.');
		updateHints();
	}
	return newP;
}
function hints() {
	updateHints();
	if (hintAttempts <= 0) {
		notification('Has agotado el número máximo de intentos.');
		return;
	}
	playing = true;
	var hh = false;
	do {
		var no = rand(0,25);
		var h1 = letNo(no);
		var patt = new RegExp(h1, 'g');
		hh = patt.test(solution);
		hh = ( hh && !isin(guesses, h1));
		console.log(hh+" "+isin(guesses,h1));
	} while (hh == false);

	var h2 = abcd[no];
	var ll = 'Pista: La letra '+h2+' es en realidad '+h1;
	guesses[no] = h1;
	hinted[no] = true;
	echo('hints', ll);
	guessTable();
	hintAttempts--;
	gamePoints = Math.ceil(gamePoints / 2);
	updateHints();
	updatePoints();
}
function updateHints() {
	butHints.value = 'Pista ('+hintAttempts+')';
	if (hintAttempts <= 0) butHints.style.opacity = 0.5;
	if (hintAttempts > 0) butHints.style.opacity = 1;

	butSolve.value = 'Resolver ('+gameAttempts+')';
}
function cryptWin() {
	echo('cryptGame', 'Enhorabuena, has dado con la respuesta correcta.');
	points += gamePoints;
	if (clean(newPhrase, 'gi').toUpperCase() == solution.toUpperCase()) {
		newPhrase = solution;
		
	}
	newGame();
}
function guessTable() {
	var ll = "<caption>Tus suposiciones</caption> \
	<tr><th>Letra</th><th>Suposición</th></tr>";

	for (i = 0; i < 26; i++) {
		if (guesses[i] == undefined) continue;
		ll+='<tr><td>'+abcd[i]+'</td><td>'+guesses[i]+'</td></tr>'
	}
	echo('guesses', ll);
	guessIt();
}
function clean(text, i) { return text.replace(new RegExp('<\/*b>', i),""); }
function guessIt() {
	var str = newPhrase;
	str = clean(str, 'g');

	var splitString = str.split('');
	var splitStringClean = str.split('');
	for (var ss in splitString) {
		var chara = splitString[ss].toUpperCase();
		var index = abcd.indexOf(chara);
		if (index >= 0) {
			var gss = guesses[index];
			if (gss) {
				console.log('Chara '+chara+' index '+index+' gss '+gss);
				splitString[ss] = '<b>'+gss+'</b>';
				splitStringClean[ss] = gss;
			}
		}
		if (index < 0) {
			splitString[ss] = '<b>'+splitString[ss]+'</b>';
		};
	}
	str = splitString.join('');
	var strc = splitStringClean.join('');

	checkWin(strc);
	echo('cryptSolve', str);
}
var t = setInterval(animateCryptHeader, 20);
var t2 = setInterval(randomTitle, 1000);