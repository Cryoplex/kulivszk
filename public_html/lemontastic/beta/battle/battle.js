

function searchEnem() {
	document.cookie = 'action=get';
	$('#php').load('battle.php');
}
function setData() {
	helpers = localStorage.getItem('helpers');
	data = JSON.parse(localStorage.getItem('data'));
	document.cookie = 'action=set';
	document.cookie = 'id='+data.ident;
	console.log(helpers);
	document.cookie = 'helpers='+JSON.stringify(helpers);

	$('#php').load('battle.php');
}