var lastTry = "";
var newPhrase = 'CryP7'
var solution = "";
var myAttempt = "";
var hinted = [];
var hintAttempts = 3;
var gameAttempts = 3;
var points = 0;
var gamePoints = 0;
var HINT_MODIFIER = 0.5; //The lower the more difficult
var MIN_HINTS = 1; //The higher the easier

cryptAnim.style.fontSize = '5vw';


function animateCryptHeader() {
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
	pointsDisplay.innerHTML = points+' puntos'+drawAlphabet();
	cryptGame.innerHTML = 'Descifra la siguiente frase por '+gamePoints+' puntos';
	guessIt();
}
function guessThis(id, value) {
	if (!value) return;
	guess(id, value);
}
function editable(cryptoIndexChar, placeholder) {
	if (cryptoIndexChar == 'void') return '<span class="grayed editCancel">-</span>';
	if (!placeholder) placeholder = '?';
	cryptoIndexChar = cryptoIndexChar.toUpperCase();
	return '<input type="text" class="editAlpha" value="'+placeholder+'" oninput="guessThis(\''+cryptoIndexChar+'\', this.value)" onclick="this.value = \'\'">';
}
function drawAlphabet() {
	var l = '<br>';
	var n = 65;
	var alpha = [];
	for (var e in abcd) {
		var myGuess = guesses[e];
		var hasGuess = Boolean(myGuess);
		var abindex = abcd[e];
		console.log('Alpha phase 1: abindex:'+abindex+' abcd/e:'+abcd[e]+' e:'+e);
		if (!hasGuess) myGuess = editable(abindex);
		if (hasGuess) myGuess = myGuess.toUpperCase();

		alpha[abcd[e]] = myGuess;
	}
	for (var e = 65; e < 91; e++) {
		var let = String.fromCharCode(e);
		var cl = 'maybe';
		var index = abcd.indexOf(let);
		if (guesses[index]) {
			var ln = letNo(index).toUpperCase();
			var g = guesses[index].toUpperCase();
			cl = 'hinted';
			if (ln != g) cl = 'failed';
		}
		if (hinted[index]) cl = 'hinted';
		//Check if letter exists
		var letix = cryptCrypt(solution).toUpperCase().indexOf(let);
		if (letix < 0) cl = 'unconfirmed';

		var edit = alpha[let];
		var abindex = getAlphaFromIndex(index);
		if (cl == 'failed') {
			edit = editable(abindex.crypto, edit);
		}
		if (cl == 'unconfirmed') edit = editable('void');

		if (cl == 'unconfirmed') cl = 'unconfirmed grayed';
		l += '<div class="alpha '+cl+'">'+let+' <span class="filler"></span>=<span class="filler"></span> '+edit+'</div>';
		n++;
	}
	return l;
}
function startNewGame(phrase) {
	newPhrase = solution.toUpperCase();
	echo('cryptGame', phrase);
	echo('hints', '');
	var elems = [
	'#butHints', '#butSolve', '#sup',
	];

	hinted = [];
	guesses = [];

	for (var e in elems) $(elems[e]).fadeOut();
	$('#playbtn').fadeIn();
}
function dictionaryUse(sentence) {
	sentence = sentence.toUpperCase();
	var lets = 0;
	for (var let = 65; let <= 90; let++) {
		if (sentence.match(String.fromCharCode(let))) lets++;
	}
	return lets;
}
function newGame() {
	cryptAnim.style.fontSize = '1.5vw';
	gameAttempts = 3;
	newDictionary();
	var len = cryptDataBase.length-1;
	solution = cryptDataBase[rand(0,len)];
	var words = solution.split(' ').length;
	var lets = dictionaryUse(solution);
	hintAttempts = Math.floor(lets * HINT_MODIFIER) + MIN_HINTS;
	newPhrase = cryptCrypt(solution);
	lastTry = solution;

	gamePoints = (10 * newPhrase.length);
	var ll = 'Descifra la siguiente frase: ';
	echo('cryptGame', ll);
	updatePoints();
	document.getElementById('playbtn').style.display = 'none';

	document.getElementById('butHints').style.display = 'inline';
	updateHints();

	document.getElementById('sup').style.display = 'table-row';
	document.getElementById('anim').style.display = 'table-cell';

	$('#cryptGameTable').fadeIn();

	guessIt();
}
function getAlphaFromIndex(index, inverse) {
	var realChar = letNo(index);
	var cryptoChar = abcd[index];

	if (inverse) {
		var cryptoChar = letNo(index).toUpperCase();
		var realIndex = abcd.indexOf(cryptoChar);
		var realChar = letNo(realIndex);
	}
	return {
		'original': realChar.toLowerCase(),
		'crypto': cryptoChar.toLowerCase(),
	}
}
function guess(index, solut) {
	var index = abcd.indexOf(index);
	if (!hinted[index]) {
		guesses[index] = solut;
		//Checks if letter is correct or incorrect
		var alpha = getAlphaFromIndex(index);

		var shouldBe = alpha.original;
		if (shouldBe == solut) {

		}
		else {
			notification('La letra no es correcta. Inténtalo de nuevo.');
			reduceGamePoints();
			gameAttempts--;
			var cl = checkLose();
			if (cl) return;
			updateHints();
		}
	}
	updatePoints();
}
function reduceGamePoints() {
	gamePoints = Math.ceil(gamePoints * 0.5);
}
function checkLose() {
	if (gameAttempts <= 0) {
		var losemsg = 'Has agotado el número máximo de intentos.';
		notification(losemsg);
		cryptGame.innerHTML = losemsg;
		startNewGame('¿Volver a intentarlo?');
		return true;
	}
	return false;
}
function checkWin(newP, manual, peek) {
	console.log('Checking for '+newP);
	if (newP.toUpperCase() == solution.toUpperCase()) {
		cryptWin();
		if (peek) return true;
		return;
	}
	if (manual) {
		reduceGamePoints();
		gameAttempts--;
		checkLose();
		notification('La respuesta no es correcta. Inténtalo de nuevo.');
		updateHints();
	}
	if (peek) return false;
	return newP;
}
function hints() {
	updateHints();
	if (hintAttempts <= 0) {
		notification('Has agotado el número máximo de intentos.');
		return;
	}
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
	hintAttempts--;
	reduceGamePoints();
	updateHints();
	updatePoints();
}
function updateHints() {
	butHints.value = 'Pista ('+hintAttempts+')';
	if (hintAttempts <= 0) butHints.style.opacity = 0.5;
	if (hintAttempts > 0) butHints.style.opacity = 1;
}
function cryptWin() {
	echo('cryptGame', 'Enhorabuena, has dado con la respuesta correcta.');
	points += gamePoints;
	if (clean(newPhrase, 'gi').toUpperCase() == solution.toUpperCase()) {
		newPhrase = solution;
		
	}
	startNewGame('Has ganado '+gamePoints+' puntos. ¿Volver a jugar?');
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
				splitStringClean[ss] = gss;

				var shouldBe = getAlphaFromIndex(index);
				if (gss != shouldBe.original) {
					splitString[ss] = '<b class="failed">'+splitString[ss]+'</b>';
				}
				else {
					splitString[ss] = '<b>'+gss.toUpperCase()+'</b>';
				}
			}
			else {
				splitString[ss] = '<span class="unconfirmed">'+splitString[ss]+'</span>';
			}
		}
		if (index < 0) {
			splitString[ss] = '<b>'+splitString[ss].toUpperCase()+'</b>';
		};
	}
	str = splitString.join('');
	var strc = splitStringClean.join('');

	var peek = checkWin(strc, false, true);
	if (peek) {
		checkWin(strc);
		return;
	}
	echo('cryptSolve', str);
}
var t = setInterval(animateCryptHeader, 20);
var t2 = setInterval(randomTitle, 1000);