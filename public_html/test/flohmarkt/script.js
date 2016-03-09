//$Functions
var floh = {};
floh.inventory = [];
floh.market = [];
var s = [
	'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
	'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'
];
floh.temp = {};
var buying = false;;

floh.money = 0;
floh.marketList = [];
floh.craftSelected = [];
var priceChanges = [];
floh.lastPrices = [];

var searchString;
var craftableFilter = false;
var volume = 0;
var antiscrap;

function closeAllWindows() {
	$('#dWindow').slideUp(100);
	$('#black').fadeOut(100);

	buying = false;
	inventory();
}
function inventory() {
	var l = '';
	for (var x in floh.inventory) {
		var thees = floh.inventory[x];

		//Filter final items
		if (filter_final.checked) {
			var crafting = recipeSearch(thees.id);
			if (crafting.length > 0) continue;
		}

		//Filter ingredient items
		if (filter_ingredients.checked) {
			var crafting = recipeSearch(thees.id);
			if (crafting.length < 1) continue;
		}

		l += '<div id="item'+x+'" onclick="showData('+x+')" class="item"><p>'+getName(floh.inventory[x])+' '+getQuality(floh.inventory[x])+'<br><span class="desc">'+floh.inventory[x].desc+'</span><br>'

		var colorClass = (priceChanges[thees.id]) ? 'colorGreen' : 'colorRed';
		l += '<span class="'+colorClass+'">$'+sellItem(x, 1)+'</span></div>';

	}
	doc('inv').innerHTML = l;

	var l = '';
	for (var x in floh.market) {
		var thees = floh.market[x];

		//Filter final items
		if (filter_final.checked) {
			var crafting = recipeSearch(thees.id);
			if (crafting.length > 0) continue;
		}

		//Filter ingredient items
		if (filter_ingredients.checked) {
			var crafting = recipeSearch(thees.id);
			if (crafting.length < 1) continue;
		}

		var p = buyItem(x, 1);
		var extraClass = 'available';
		if (!canAfford(p)) extraClass = 'unavailable';
		l += '<div id="item'+x+'" onclick="showData('+x+', 1)" class="item '+extraClass+'"><p>'+getName(floh.market[x])+' '+getQuality(thees)+'<br><span class="desc">'+floh.market[x].desc+'</span><br>';

		colorClass = (priceChanges[thees.id]) ? 'colorGreen' : 'colorRed';
		l += '<span class="'+colorClass+'">$'+buyItem(x, 1)+'</span></div>';
	}
	doc('marketplace').innerHTML = l;

	if (!floh.marketList) return;

	var l = '';
	for (var x in floh.marketList) {
		var obj = floh.marketList[x][2];
		var thees = {};
		if (!obj) continue;
		thees = JSON.parse(obj);
		var from = floh.marketList[x][3];
		var p = thees.price;
		var extraClass = 'available';
		if (!canAfford(p)) extraClass = 'unavailable';
		l += '<div class="item '+extraClass+'"><p>'+getName(thees)+' '+getQuality(thees)+' by '+from+'<br><span class="desc">'+thees.desc+'</span><br>';
		l += '<span>$'+shortNum(p)+'</span></div>';
	}
	doc('serverplace').innerHTML = l;

	craftingInventory();
}
function getName(obj) {
	var thisID = obj.id;
	return floh.items[thisID][1]
}
function getNameFromID(id) {
	return getName({'id': id});
}
function canAfford(cost) {
	if (floh.money >= cost) return 1;
	return 0;
}
function craftingInventory() {
	var l = '';
	for (var x in floh.inventory) {
		var thees = floh.inventory[x];
		if (isInside(x, floh.craftSelected)) continue;
		var completeName = getName(thees)+' '+getQuality(thees);
		completeName = completeName.toUpperCase();
		var search = completeName.search(searchString.toUpperCase());
		if (search < 0) continue;
		//Is this item used along with other items selected for crafting something?
		var isCrafting = isCraftingIngredient(thees.id) || (floh.craftSelected.length < 1);
		var addClass = (isCrafting) ? 'available' : 'unavailable';

		var hideUncraft = hideUncraftable.checked;
		var somethingCraftable = 0;
		if (hideUncraft) {
			//Check if something is craftable with this.
			var recipesFor = recipeSearch(thees.id);
			console.log('Searching recipes for item id '+thees.id+' the result is '+recipesFor);
			for (var cin in recipesFor) {
				var thisRecipe = recipesFor[cin];
				if (canICraftThis(thisRecipe) && isThisItemNeeded(thees.id, thisRecipe)) {
					somethingCraftable++;
				}
			}
			if (addClass == 'unavailable') addClass = 'notshown';
		}
		if (!somethingCraftable && hideUncraft) continue;

		var craftableFilter = isCraftable.checked;
		if (craftableFilter && !recipeSearch(thees.id).length) {
			continue;
		}

		



		l += '<div class="smallItem '+addClass+'" id="'+x+'" onclick="selectItem('+x+')"><span>'+getName(thees)+'<br>Quality: '+getQuality(thees)+'</span></div>';
	}
	if (l.length <= 0) l = 'There is nothing you can craft... For now.';
	doc('todoCraft').innerHTML = l;

	var l = '';
	for (var x in floh.craftSelected) {
		var thees = floh.inventory[floh.craftSelected[x]];
		l += '<div class="smallItem selected" id="'+x+'" onclick="unSelectItem('+x+')"><span>'+getName(thees)+'<br>Quality: '+getQuality(thees)+'</span></div>';
	}
	doc('doingCraft').innerHTML = l;

	var l = '';
	var cc = canCraft();
	if (cc) {
		var thees = (cc == 'c') ? floh.items[floh.inventory[floh.craftSelected[0]].id] : floh.items[floh.craftRecipes[cc][1]];
		if (thees) {
			l += '<div class="item" onclick="craftNow()"><span>'+thees[1]+'<br>Quality: '+romanNumber(craftNow(1) + 1)+'</span></div>';
		}
	}
	doc('doneCraft').innerHTML = l;


	$('.smallItem').hover(function() {
		var ths = floh.inventory[this.id].id;
		if (this.className == 'smallItem selected') ths = floh.inventory[floh.craftSelected[this.id]].id;
		var it = {'id': ths};
		var smTip = '<span class="smallTip">'+showRecipesFor(it)+'</span>';
		craftToolTip.innerHTML = smTip;
	}, function() {
		craftToolTip.innerHTML = '';
	});


}
function isUsedForCraft(item) {
	var itemID = item.id;
	console.log('Checking item ID: '+itemID);

	for (var iufc in floh.craftSelected) {
		console.log('Recipe item '+iufc+' has recipes!');
		var it = floh.inventory[floh.craftSelected[iufc]];
		var itid = it.id;
		var recipes = recipeSearch(itid);
		console.log('The recipes are the following: '+recipes);
		for (var iufcc in recipes) {
			if (canICraftThis(recipes[iufcc])) return 1;
		}
	}
	return 0;
}
function isCraftingIngredient(id) {
	var results = [];
	for (var ici in floh.craftSelected) {
		results[ici] = 0;
		var thees = floh.inventory[floh.craftSelected[ici]];
		var rec = recipeSearch(thees.id);
		for (var ici2 in rec) {
			var rec2 = floh.craftRecipes[rec[ici2]];
			for (var ici3 in rec2[0]) {
				if (id == rec2[0][ici3]) {
					results[ici] = 1;
					break;
				}
			}
		}
	}
	var sum = 0;
	for (var ici in results) {
		if (results[ici]) sum++;
	}
	return (sum == results.length && results.length > 0);
}
function craftData(id) {
	//Too lazy to fix this.
	var bef = floh.craftRecipes;

	var obj = floh.inventory[id];
	var iddy = obj.id;
	//Gets possible recipes for that (item) ID in an Array.
	var recipes = recipeSearch(iddy);

	var l = '';
	for (var cd in recipes) {
		//
		var recipe = recipes[cd];

		var someArray = [];
		var tooLong = floh.craftRecipes[recipe][0];
		console.log(tooLong);
		for (var xx in tooLong) {
			someArray[xx] = floh.items[tooLong[xx]][1];
		}

		l += '<b>'+floh.items[floh.craftRecipes[recipe][1]][1]+'</b><br>('+someArray.join('<br>')+')<br><br>';
	}

	//Too lazy to fix this.
	floh.craftRecipes = bef;
	return l;
}

function canCraft() {
	var arr = [];
	for (var cc in floh.craftSelected) {
		arr[cc] = floh.inventory[floh.craftSelected[cc]].id;
		console.log('This arr cc is '+arr[cc]);
	}
	var recipe = searchRecipeByIngredients(arr);
	console.log(arr);
	console.log('Can craft: '+recipe);
	if (!recipe && arr.length > 2) {
		var prototype = arr[0];
		for (var testPrototype in arr) {
			if (arr[testPrototype] != prototype) return;
		}
		return 'c';
	}
	return recipe;
}
function isThisItemNeeded(itemID, recipe) {
	var rec = floh.craftRecipes[recipe][0];
	var count = 0;
	for (var ine in rec) {
		if (rec[ine] == itemID) count++;
	}
	var selected = 0;
	for (var ine in floh.craftSelected) {
		if (floh.inventory[floh.craftSelected[ine]].id == itemID) selected++;
	}
	return !(selected == count);
}
function canICraftThis(recipe) {
	var ings = floh.craftRecipes[recipe][0];
	var items = 0;
	var require = [];
	for (var cict in ings) {
		var it = ings[cict];
		require[it] = (require[it] + 1) || 1;
	}
	for (var cict in ings) {
		var item = ings[cict];
		if (getItemsByID(ings[cict]) >= require[item]) items++;
	}
	if (items == ings.length) return 1;
	return 0;
}

function craftNow(peek) {
	var cc = canCraft();
	var combine = floh.inventory[floh.craftSelected[0]].id;

	//If both items are the same (C), the output item is the first array item.
	var result = (cc == 'c') ? combine : floh.craftRecipes[cc][1];

	var arr = floh.craftSelected.sort();
	var q = 0;
	for (var cn = floh.craftSelected.length-1; cn >= 0; cn--) {
		var rarity = floh.inventory[floh.craftSelected[cn]].rarity;
		if (rarity > q && cc != 'c') q = rarity;
		if (cc == 'c') q += rarity

		if (peek) continue;
		floh.inventory.splice(floh.craftSelected[cn], 1);
	}
	if (cc == 'c') q = Math.ceil(q * 0.9);
	q += 1;
	if (peek) return q;

	notification('You crafted '+floh.items[result][1]+' '+romanNumber(q+1)+' without problems!');

	addItemToInventory(result, q);
	var thisItem = floh.inventory[floh.inventory.length-1];
	changeItemStatus(thisItem, 'repaired', 1);
	floh.craftSelected = [];
	craftingInventory();

}
function selectItem(id) {
	if (!floh.craftSelected) floh.craftSelected = [];
	for (var si in floh.craftSelected) {
		if (id == floh.craftSelected[si]) return 'Already on list.';
	}
	floh.craftSelected[floh.craftSelected.length] = id;
	floh.inventory[id].craftSelected = true;

	craftingInventory();
}
function unSelectItem(id) {
	floh.inventory[id].craftSelected = false;
	floh.craftSelected.splice(id, 1);

	craftingInventory();
}

function showData(x, fromMarket) {
	buying = true;
	$('#black').fadeIn(100);
	var thees = (!fromMarket) ? floh.inventory[x] : floh.market[x];
	var l = getName(thees)+' '+getQuality(thees)+'<br><br>'+thees.desc;
	l += '<br>(Base) Price: $'+getPrice(thees.id, thees);

	l += '<canvas style="width: 500px; height: 100px; background-color: white" id="priceChangeGraph"></canvas>';

	console.log('Line 269');
	if (fromMarket) {
		l += '<br>'+floh.market[x].value;
		l += '<br><br><br>';
		l += '<div class="button" onclick="buyItem('+x+')">Buy this item for $'+buyItem(x, 1)+'</div>';
	}
	else {
		l += '<br>'+getItemStatus(floh.inventory[x]);
		l += '<br><br><br>';
		l += '<div class="button" onclick="sellItem('+x+')">Sell this shit for $'+sellItem(x, 1)+'</div>';

		//Sell all button
		var qty = 0;
		var priceAll = 0;
		for (var sd in floh.inventory) {
			if (floh.inventory[sd].id == floh.inventory[x].id) {
				qty++;
				priceAll += sellItem(sd, 1);
			}
		}
		if (deCraftItem(x, 1) >= 1) {
			l += '<br><div class="button" onclick="deCraftItem('+x+')">Decraft this item</div>';
		}

		if (qty > 1) {
			l += '<br><div class="button" onclick="sellItemsByID('+floh.inventory[x].id+')">Sell all items of this type ('+qty+') for $'+shortNum(priceAll)+'</div>';
		}

		//Scrap Metal
		if (thees.id == 2) l += '<div class="button" onclick="identifyScrap('+x+')">Identify this Metal</div>';
	}
	console.log('Line 296');
	l += '<span id="dErrors"></span>';

	dWindow.innerHTML = l;

	//
	var c=document.getElementById("priceChangeGraph");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(0,50);
	for (var pc in floh.lastPrices[thees.id]) {
		var y = floh.lastPrices[thees.id][pc];
		var x = pc * (500 / floh.lastPrices[thees.id].length);

		y -= 0.5;
		y *= 100;
		y = 100 - y;
		ctx.lineTo(x,y);
		console.log('Stroking to '+x+' '+y);
	}
	ctx.stroke();
	//


	$('#dWindow').slideDown(100);
}
function getItemStatus(obj) {
	var gis = '';
	if (!obj.status) obj.status = itemStatuses;
	for (var gs in obj.status) {
		if (obj.status[gs]) {
			gis += "Item is "+gs+" ("+Math.floor(itemStatusModifiers[gs]*100)+"% price)"+'<br>';
		}
	}
	return gis;
}
function sellItem(id, peek, silent) {
	var item = floh.inventory[id];
	var cost = getPrice(item.id, item);

	//Price quality modifier
	if (item.rarity) cost += (item.rarity / 100);
	var quality = item.rarity;
	var pmod = (quality / 7.5) + 1.8;
	cost *= pmod;

	if (peek) return Math.floor(cost * 100) / 100;

	increaseMoney(cost);


	floh.inventory.splice(id, 1);
	if (!silent) closeAllWindows();
}
function sellItemOnMarketplace(id) {
	var cost = sellItem(id, 1);
	floh.inventory[id].price = cost;

	var itemID = floh.inventory[id].id;
	if (!floh.username) {
		floh.username = prompt('Type an username before selling the item.');
	}
	document.cookie = 'act=sell';
	var st = JSON.stringify(floh.inventory[id]);
	$.post('send.php', 'value=sell,,'+itemID+',,'+JSON.stringify(floh.inventory[id])+',,'+floh.username);
	console.log(st);
	console.log(JSON.parse(st));

	floh.inventory.splice(id, 1);
	closeAllWindows();
}
function getServerItems() {
	floh.marketList = [];
	document.cookie = 'act=getlist';
	$('#php').load('send.php', function() {
		//Callback
		var itemList = php.innerHTML.split('\n');
		for (var il in itemList) {
			floh.marketList[il] = itemList[il].split(',,');
		}
	});


}
function sellItemsByID(id) {
	var index = 0;
	while (index < floh.inventory.length) {
		if (floh.inventory[index].id == id) {
			sellItem(index, 0, 1);
			index--;
		}
		index++;
	}
	closeAllWindows();
}
function buyItem(id, peek) {
	var item = floh.market[id];
	var cost = getPrice(item.id, item) * 1.5;

	//Price quality modifier
	var quality = item.rarity;
	var pmod = (quality / 10) + 1;
	cost *= pmod;

	if (peek) return Math.floor(cost * 100) / 100;

	if (!canAfford(cost)) {
		dErrors.innerHTML = '<p>You don\'t have enough money to buy that!';
		return;
	}

	increaseMoney(cost * -1);

	floh.inventory[floh.inventory.length] = JSON.parse(JSON.stringify(item));
	floh.market.splice(id, 1);

	closeAllWindows();
}

function increaseMoney(ammount) {
	floh.money += ammount;
	$('#yourMoney').effect('highlight', 50);
	upd.money();
}
function addItemToInventory(id, parentQuality) {
	var index = floh.inventory.length;
	var i = floh.items[id];
	var val = Math.floor(Math.random()*65535);
	floh.inventory[index] = new Item(id, i[1], i[2], i[3], val, parentQuality);
}
function addItemToMarket() {
	if (buying) return;
	if (floh.market.length > (10 + floh.inventory.length)) {
		console.log('Market item list is too long. I am not adding more items, soz. '+floh.market.length);
		removeMarketItem();

		return;
	}

	var index = floh.market.length;
	var id = rand(0,floh.items.length);
	var i = floh.items[id];
	var val = Math.floor(Math.random()*65535);
	if (!i) return;
	floh.market[index] = new Item(id, i[1], i[2], i[3], val);

	inventory();
}
function removeMarketItem() {
	if (buying) return;

	var index = rand(0,floh.market.length);
	floh.market.splice(index, 1);

	inventory();
}
function changeItemStatus(obj, status, newValue) {
	if (!obj.status) obj.status = {};
	obj.status[status] = newValue;

	var id = obj.id;
	var type = floh.items[id][4];

	if (status == 'used' || status == 'destroyed' || status == 'dirty' || status == 'expired') {
		obj.status['new'] = 0;
	}
	if (status == 'filled' && type == 'container') {
		obj.status['empty'] = 0;
		obj.status['refilled'] = 0;
	}
	if (status == 'empty' && type == 'container') {
		obj.status['filled'] = 0;
		obj.status['refilled'] = 0;
		obj.status['new'] = 0;
	}
	if (status == 'wet' || status == 'burned') {
		if (rand(1,10) == 1) obj.status['broken'] = 1;
		if (rand(1,10) == 1) obj.status['destroyed'] = 1;
		obj.status['new'] = 0;
	}
	if (status == 'broken') {
		if (rand(1,10) == 1) obj.status['destroyed'] = 1;
		obj.status['new'] = 0;
	}
	if (status == 'antique') {
		obj.status['old'] = 0;
		obj.status['new'] = 0;
	}
	if (status == 'unused') {
		obj.status['broken'] = 0;
	}
	if (status == 'old') {
		obj.status['used'] = 1;
	}
	if (status == 'repaired') {
		obj.status['new'] = 0;
		obj.status['broken'] = 0;
	}
	if (status == 'refilled') {
		obj.status['new'] = 0;
		obj.status['empty'] = 0;
	}

	if (type != 'container') {
		obj.status['filled'] = 0;
		obj.status['empty'] = 0;
		obj.status['refilled'] = 0;
	}
	if (type != 'food') {
		obj.status['rotten'] = 0;
		obj.status['expired'] = 0;
	}
	if (type != 'bkable') {
		obj.status['broken'] = 0;
		obj.status['destroyed'] = 0;
	}

	var timeConditions = ['new', 'old', 'antique'];
	for (var tc in timeConditions) {
		var thold = (tc + 2);
		var quota = Math.pow(16, thold) - 1;
		if (obj.status[timeConditions[tc]] && obj.age > quota) obj.age = quota;
	}
}
function getConditionModifier(obj, peek) {
	if (!obj.status) obj.status = {};
	var cond = obj.status;
	var mod = 1;
	for (var gcm in itemStatuses) {
		if (cond[gcm]) {
			mod *= itemStatusModifiers[gcm];
		}
	}
	return mod;
}
function Item(id, name, price, desc, value, parentQuality) {
	this.id = id;
	this.name = name;
	this.desc = desc;
	this.price = price;
	this.value = value;
	this.status = {};
	this.status = itemStatuses;
	this.status['new'] = 1;
	this.status['filled'] = 1;
	this.status['unused'] = 1;

	this.age = rand(128, 512);

	this.rarity = 0;
	if (this.value < 32767) this.rarity = 1;
	if (this.value < 10922) this.rarity = 2;
	if (this.value < 2730)  this.rarity = 3;
	if (this.value < 546)  this.rarity = 4;
	if (this.value < 91)  this.rarity = 5;
	if (this.value < 13)  this.rarity = 6;
	if (this.value <= 1)   this.rarity = 7;

	if (parentQuality) this.rarity = parentQuality+1;
	return this;
}

var upd = {
	'updateAll': function() {
		this.scrapPrice();
		this.inventorySearch();
		this.money();
	},
	'scrapPrice': function() {
		buttonIdentify.innerHTML = "Identify All Scrap for $"+identifyAllScrap(1);
		if (parseInt(identifyAllScrap(1) * 100) == 0) buttonIdentify.innerHTML = "You don't have Scrap Metal to Identify";
	},
	'inventorySearch': function() {
		if (searchString != searchy.value) {
			searchString = searchy.value || '';
			inventory();
		}
	},
	'money': function() {
		var mon = Math.floor(floh.money * 100) / 100;
		yourMoney.innerHTML = 'Money: $'+mon.toFixed(2);
	}
}

function update() {
	upd.inventorySearch();
	var randy = rand(1,1000);
	if (randy < 10) {
		addItemToMarket();
	}
	else if (randy == 100) {
		removeMarketItem();
	}

	if (rand(1,161) == 1) {
		var r = rand(0,floh.trashItems.length-1);
		if (floh.trashItems[r] > (floh.inventory.length) + 10) return; //Prevent loads of trash
		floh.trashItems[r] += rand(1,2);

	}
	for (var tb in floh.trashItems) {
		trash_bin_items.innerHTML = floh.trashItems[0];
		paper_bin_items.innerHTML = floh.trashItems[1];
		plastic_bin_items.innerHTML = floh.trashItems[2];
		glass_bin_items.innerHTML = floh.trashItems[3];
	}
}
function getTrash(trashBin) {
	var binIndex = 0;
	var bef = '';

	var randy = rand(62,104);
	if (trashBin == 'paper') {
		var randy = rand(157,164);
		trashBin = 'the Paper Recycle Bin';
		binIndex = 1;
	}
	if (trashBin == 'plastic') {
		var randy = read([115, 124, 125, 126, 172, 173, 174, 175, 176]);
		trashBin = 'the Plastic Recycle Bin';
		binIndex = 2;
	}
	if (trashBin == 'glass') {
		var randy = rand(187, 197);
		trashBin = 'the Glass Recycle Bin';
		binIndex = 3;
	}

	if (floh.trashItems[binIndex] < 1) return;

	if (rand(1,10) == 1) {
		randy = getRandomItem();
		var bef = 'You are a lucky bastard! ';
	}

	var iname = floh.items[randy][1];

	notification(bef+'You have got '+iname+' in '+trashBin+'!');
	floh.trashItems[binIndex] -= 1;
	addItemToInventory(randy);
	var thisItem = floh.inventory[floh.inventory.length-1];
	changeItemStatus(thisItem, 'dirty', 1);
	changeItemStatus(thisItem, 'used', 1);
	changeItemStatus(thisItem, 'empty', rand(0,1));
	changeItemStatus(thisItem, 'burned', rand(0,1));
	changeItemStatus(thisItem, 'destroyed', rand(0,1));
	changeItemStatus(thisItem, 'broken', rand(0,1));
	changeItemStatus(thisItem, 'expired', rand(0,1));
	changeItemStatus(thisItem, 'rotten', rand(0,1));
	if (rand(1,10) == 1) changeItemStatus(thisItem, 'new', 1);

	update();
}
function getRandomItem() {
	var randy = rand(1,volume * 100);
	while (true) {
		var randomItem = rand(0, floh.items.length-1);
		var cost = getPrice(randomItem);
		var chances = 1/(cost * 100);
		if (Math.random() < chances) {
			return randomItem;
			break;
		}
	}
}
function identifyScrap(id) {
	var thiss = floh.inventory[id];
	if (thiss.id != 2) return 0;

	//Selects an item ID from scrapList array.
	var num = read(scrapList);

	//Copies item quality from Scrap Metal.
	var parentQuality = thiss.rarity;
	//Adds item ID to inventory.
	addItemToInventory(num, parentQuality);
	notification('After identifying, you discover the metal is '+getNameFromID(num)+'!');

	//Deletes this Scrap Metal item.
	floh.inventory.splice(id, 1);
	closeAllWindows();
	return 1;
}
function identifyAllScrap(peek) {
	var scrappy = 0;
	for (var ias in floh.inventory) {
		if (floh.inventory[ias].id != 2) continue;
		if (floh.inventory[ias].id == 2) scrappy++;
	}
	var scrapPrice = getPrice(2);
	var ironPrice = getPrice(3);
	var avg = (scrapPrice + ironPrice) / 2;
	var price = Math.ceil((avg * scrappy) * 100) / 100;

	if (peek) return shortNum(price);

	if (!canAfford(price)) return "You don't have enough money!";
	if (!scrappy) return "You don't have Scrap Metal!";
	increaseMoney(price * -1);

	var ias = 0;
	while (ias < floh.inventory.length) {
		var isScrap = identifyScrap(ias);
		if (isScrap) ias--;
		ias++;
	}
	upd.scrapPrice();
	return "Sucessfully identified "+scrappy+" piles of Scrap Metal.";
}

function addMagnetToJunkyard() {
	if (!canAfford(10)) return;
	increaseMoney(-10);

	$('#junkMountain').append('<span class="junk_magnet" style="width: 30px; height: 50px"></span>');


	$('.junk_magnet').draggable({stop: function() {
		var thisTop = parseInt($(this).css('top'));
		var thisLeft = parseInt($(this).css('left'));

		$('.junk_scrap').each(function(a, b) {
			var toTop = parseInt($(b).css('top'));
			var toLeft = parseInt($(b).css('left'));

			if (toTop > thisTop) toTop -= 25+Math.random()+(25*Math.random());
			if (toTop < thisTop) toTop += 25+Math.random()+(25*Math.random());
			if (toLeft > thisLeft) toLeft -= 25+Math.random()+(25*Math.random());
			if (toLeft < thisLeft) toLeft += 25+Math.random()+(25*Math.random());

			$(b).animate({top: toTop+'px', left: toLeft+'px'}, 1000);
		});

		$(this).remove();

	}});

}
function addBombToJunkyard(quality, peek) {
	var cost = (quality * quality) + quality;
	if (peek) return cost;
	if (!canAfford(cost)) return;
	increaseMoney((cost * -1));
	var qty = 20;
	if (quality > 0) qty = qty * (quality * quality);
	$('#junkMountain').append('<span class="junk_bomb '+quality+'" style="width: '+qty+'px; height: '+qty+'px"></span>');
	var scrapHunger = Math.pow((quality - 1), 2);
	var junkHunger = 100 - scrapHunger;

	$('.junk_bomb').draggable({stop: function() {
		var range = parseInt($(this).css('width'));
		var thisTop = parseInt($(this).css('top')) - (range/2);
		var thisLeft = parseInt($(this).css('left')) - (range/2);

		$('.junk_garbage').each(function(a, b) {
			var toRange = parseInt($(b).css('width'));
			var toTop = parseInt($(b).css('top'));
			var toLeft = parseInt($(b).css('left'));

			if (thisTop-range < toTop+toRange && thisTop+range > toTop-toRange) {
				if (thisLeft-range < toLeft+toRange && thisLeft+range > toLeft-toRange) {
					if (rand(1,100) < junkHunger) $(b).remove();
					console.log('Removed junk here. Chances are '+junkHunger/100);
				}
			}
		});
		$('.junk_scrap').each(function(a, b) {
			var toRange = parseInt($(b).css('width'));
			var toTop = parseInt($(b).css('top'));
			var toLeft = parseInt($(b).css('left'));

			if (thisTop-range < toTop+toRange && thisTop+range > toTop-toRange) {
				if (thisLeft-range < toLeft+toRange && thisLeft+range > toLeft-toRange) {
					if (rand(1,100) < scrapHunger) $(b).remove();
					console.log('Removed scrap here. Chances are '+scrapHunger/100);
				}
			}
		});

		$(this).effect('explode', 1000);

	}});
}
function junkyardGenerator() {
	var junkies = $('.junk_garbage').length + $('.junk_scrap').length + $('.junk_bomb').length;
	if (junkies > 2000) return; //Prevent junkyard from filling up
	var junk = rand(1,100);

	var num = rand(10,100);
	var randX = rand(1,300);
	var randY = rand(1,300);
	if (junk < 10) {
		$('#junkMountain').append('<span class="junk_scrap" style="top: '+randX+'px; left: '+randY+'px"></span>');
	}
	else {
		$('#junkMountain').append('<span class="junk_garbage" style="top: '+randX+'px; left: '+randY+'px; width: '+num+'px; height: '+num+'px"></span>');
	}

	$('.junk_garbage').draggable();

	$('.junk_scrap').unbind();
	$('.junk_scrap').click(function() {
		$(this).remove();
		var item = read([2, rand(177,183)]);
		notification('You rummage through the garbage and find '+getNameFromID(item));
		addItemToInventory(item);
		upd.scrapPrice();

	});

}
function junkyardBatch() {
	var min = 4 * incRandom();
	for (var jb = 0; jb < min; jb++) junkyardGenerator();
}

function getItemsByID(id) {
	var num = 0;
	for (var gibid in floh.inventory) if (floh.inventory[gibid].id == id) num++;
	return num;
}
function getFirstItemByID(id) {
	var result = 0;
	for (var gfibid in floh.inventory) if (floh.inventory[gfibid].id == id) return gfibid;
}
function searchRecipeByIngredients(array) {
	//Clean array
	for (var a in array) {
		array[a] = parseInt(array[a]);
	}

	var array = JSON.stringify(array.sort());
	for (srbi in floh.craftRecipes) {
		var s = JSON.stringify(floh.craftRecipes[srbi][0].sort());
		if (array == s) {
			return srbi;
		}
	}
	return 0;
}
function recipeSearch(id) {
	var recipes = [];
	for (var rs in floh.craftRecipes) {
		var rec = floh.craftRecipes[rs][0];
		for (var rsr in rec) {
			if (id == rec[rsr]) {
				recipes[recipes.length] = rs;
				break;
			}
		}
	}
	return recipes;
}

function sortitems(where, invert, byQuality) {
	if (floh.craftSelected.length) {
		notification('Error: One does not simply order items while the crafting grid is not empty.');
		return;
	}
	floh[where].sort(function(a, b) {
		if (byQuality) console.log('Sorting by quality');
		var val1 = (byQuality) ? a.rarity : a.price;
		var val2 = (byQuality) ? b.rarity : b.price;

		if (invert) return val2-val1;
		return val1-val2;
	});
	inventory();
}

function deCraftItem(id, peek) {
	var index = 0;
	var searchID = floh.inventory[id].id;
	for (var dci in floh.deCraftRecipes) {
		if (floh.deCraftRecipes[dci][0] == searchID) {
			index = dci;
			break;
		}
	}
	if (peek) return index;
	if (index > 0) {
		var result = floh.deCraftRecipes[index][1];
		floh.inventory.splice(id, 1);
		notification('You dismantled your '+floh.items[searchID][1]+'!');
		for (var dci in result) {
			var nam = floh.items[result[dci]][1];
			notification('Received '+nam+'!');
			addItemToInventory(result[dci]);
		}
	}
	closeAllWindows();
}
function showRecipesFor(item) {
	var itemID = item.id;
	var recipes = recipeSearch(itemID);
	var l = '<span class="showRecipes">Recipes for '+floh.items[itemID][1]+'<br>';
	for (var srf in recipes) {
		var rec = floh.craftRecipes[recipes[srf]];
		l += (parseInt(srf) + 1)+'. '+floh.items[rec[1]][1]+'<br>';
	}
	l += '</span>';
	return l;
}

/* TESTING STUFF KEEP OUT */

function drawLine(x, y, tox, toy) {
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(tox,toy);
	ctx.stroke();
}
function graph(arr) {
	var startx = 0;
	var starty = 50;
	for (var a in arr) {
		drawLine(startx, starty, startx+10, arr[a]);

		startx += 1;
		starty = arr[a];
	}
}
function srand(num) {
	var n = num + (plusOrMinus() * incRandom());
	return Number(n);
}
function incRandom() {
	var r = 1;
	while (Math.random() > 0.5) {
		r++;
	}
	return r;
}

function randomArray(firstNum) {
	var array = [firstNum];
	for (var x = 0; x < 50; x++) {
		var last = array[array.length-1];
		array[array.length] = srand(last);
	}
	return array;
}
function randomPrice(basePrice) {
	var array = randomArray(1);
	var pArray = [basePrice];
	for (var h = 0; h < 50; h++) {
		if (!h) continue;
		var nu = pArray[h-1] + ((basePrice / 10) * array[h]);
		if (nu < basePrice*0.1) nu += basePrice/10;
		if (nu > basePrice*1.9) nu -= basePrice/10;
		pArray[h] = nu;
	}

	return pArray;
}
function plusOrMinus() {
	var r = Math.random()-0.5;
	if (r < 0) {
		return -1;
	}
	else {
		return 1;
	}
}


/* TESTING STUFF KEEP OUT */
function tickItemConditions() {
	for (var tic in floh.inventory) {
		var item = floh.inventory[tic];
		if (!item.age) item.age = rand(128,512);
		if (item.age >= Math.pow(16, 2)) changeItemStatus(item, 'used', 1);
		if (item.age >= Math.pow(16, 3)) changeItemStatus(item, 'old', 1);
		if (item.age >= Math.pow(16, 4)) changeItemStatus(item, 'antique', 1);
		
	}
}
function changePrices() {
	tickItemConditions();

	for (cp in floh.items) {
		var beffy = getPrice(cp);

		if (!floh.lastPrices[cp]) floh.lastPrices[cp] = [];
		floh.lastPrices[cp][floh.lastPrices[cp].length] = floh.prices[cp] || 1;
		if (floh.lastPrices[cp].length > 100) floh.lastPrices[cp].splice(0, 1);

		var bef = floh.prices[cp] || 1;
		var pc = Math.random()+0.5;

		//Second attempt if the item is not following a pattern
		if (pc < 1 && priceChanges[cp] == 1 || pc > 1 && priceChanges[cp] == 0) {
			pc = Math.random()+0.5;
		}

		if (pc < 0.5) pc = 0.5;
		if (pc > 1.5) pc = 1.5;
		floh.prices[cp] = pc;

		var afty = getPrice(cp);

		if (afty >= beffy) {
			priceChanges[cp] = 1;
		}
		else {
			priceChanges[cp] = 0;
		}
	}
	upd.scrapPrice();
}
function getQuality(item) {
	return romanNumber(item.rarity + 1);
}
function getPrice(itemID, item) {
	if (!floh.prices) return;
	var mul = floh.prices[itemID] || 1;
	if (item) {
		var mul2 = getConditionModifier(item);
		mul *= mul2;	
	}

	var price = Math.floor((floh.items[itemID][2] * mul) * 100)/100;
	if (price < 0.01) price = 0.01;
	return price;
}

var t = setInterval(update, 1000);
var up = setInterval(changePrices, 30000);

changePrices();

//Loading and saving games
function loadGame() {
	if (localStorage.getItem('floh')) {
		floh = JSON.parse(localStorage.getItem('floh'));

		if (!floh.lastPrices) floh.lastPrices = [];
		if (floh.junkyard) junkMountain.innerHTML = floh.junkyard;

		console.log('Loading previous save file. '+JSON.stringify(floh).length);
	}
	else {
		console.log('No save file found.');
	}

	if (!floh.trashItems) floh.trashItems = [];
	for (var ti = 0; ti < 4; ti++) if (!floh.trashItems[ti]) floh.trashItems[ti] = 0;
}
function saveGame() {
	getServerItems();
	junkyardBatch();

	floh.junkyard = junkMountain.innerHTML;

	console.log('Saving...');
	localStorage.setItem('floh', JSON.stringify(floh));
	console.log('Saved... '+JSON.stringify(floh).length+'.');

	$('.notification').remove();
	notification('Game Saved');
}
function getItemDataFromID(id) {
	var item = floh.items[id];
	return {
		'id': item[0],
		'name': item[1],
		'basePrice': item[2],
		'description': item[3],
		'trait': item[4]
	}
}
function dumpItemData(id) {
	var item = getItemDataFromID(id);
	return item.id+' '+item.name+' '+item.basePrice+' '+item.description+' '+item.trait;
}
function dumpAllItems() {
	var l = 'ITEM LIST (FOR DEBUGGING PURPOSES)<br>';
	for (var x in floh.items) l += dumpItemData(x)+'<br>';
	debugLog.innerHTML = l;
}


loadGame();
saveGame();

var sg = setInterval(saveGame, 60000); //Saves the game every 30 seconds.



floh.prices = [];
floh.items = [
	//0-9
	[0, 'Stick',           0.01,     'A plain old stick', 'bkable'],
	[1, 'Rock',            0.02,     'It rocks!', 'bkable'],
	[2, 'Scrap Metal',     0.05,     'Who is that metal? It\'s Scrap!'],
	[3, 'Scrap Iron',      0.01,     'That is a lot of iron you have there.'],
	[4, 'Scrap Steel',     0.03,     'Just Steel.'],
	[5, 'Stainless Steel', 0.23,     'Perfect for your frying pans, or cutlery, or, well.'],
	[6, 'Zinc',            0.15,     'Ka-zinc!'],
	[7, 'Lead',            0.16,     'Follow the Lead-er!'],
	[8, 'Aluminium',       0.18,     'Nto "Aluminum" yuo dsylxeic mohtefrukcer!'],
	[9, 'Magnesium',       0.22,     'Eat it! Better than eating Fish!'],
	//10-19
	[10, 'Brass',           0.40,     'A pain in the Brass'],
	[11, 'Copper',          0.64,     'Seldom copper to be found in scrap nowadays...'],
	[12, 'Nickel',          1.30,     'It\'s worth a few nickels!'],
	[13, 'Tin',             1.42,     'You better scrap all of those soda cans!'],
	[14, 'Silver',          51.6,     'Wild Silver appeared!'],
	[15, 'Ruthenium',       176.3,    'Imported from Rus!'],
	[16, 'Osmium',          1340.4,   'Dat smell'],
	[17, 'Iridium',         2045.9,   'Yes! Now I can finish my Quantum Armor!'],
	[18, 'Palladium',       2580.3,   'Fashionable metal'],
	[19, 'Rhodium',         3492.1,   'You got a rare one, mate!'],
	//20-29
	[20, 'Gold',   		    3782,     'Golden Shower!'],
	[21, 'Platinum',        3814.9,   '#1 Greatest hit!'],
	[22, 'Titanium',        0.55,     'Attack on the Titanium'],
	[23, 'Vanadium',        1.93,     'The most powerful metal in the world used to make a Frisbee!'],
	[24, 'Cobalt',          3.07,     'Open Alpha phase!'],
	[25, 'Tungsten',        3.43,     'AKA Wolfram'],
	[26, 'Reclaimed Metal', 0.20,     'Better than iron!'],
	[27, 'Refined Metal',   1.00,     'Overpowered Scrap Metal'],
	[28, 'Hat',             1.00,     'Heavy Metal Hat!'],
	[29, 'Pure Iron',       0.10,     ''],
	//30-39
	[30, 'Pure Steel',      0.30,     ''],
	[31, 'Fernico',         3.79,     ''],
	[32, 'Invar',           1.19,     ''],
	[33, 'Zamak', 			1.01,     ''],
	[34, 'Molybdochalkos',  0.68,     'Not Molybdenum at all'],
	[35, 'Alnico',			3.86,	  ''],
	[36, 'Duralumin', 		0.69,     ''],
	[37, 'Billon',          44.40,    'It is worth a billion!'],
	[38, 'Bronze',			1.75,	  'You end up in the third place.'],
	[39, 'Cupronickel',      1.64,     ''],
	//40-49
	[40, 'Copper-Tungsten',     3.45,       'Made out of Copper, and Tungsten.'],
	[41, 'Corinthian Bronze',	1629.1,		''],
	[42, 'Chromium',			0.52,           'Google it!'],
	[43, 'Solder',				0.61,			'Sold all the things!'],
	[44, 'Magnalium',           0.38,			''],
	[45, 'Cunife',              2.41,			''],
	[46, 'Hepatizon',			2770,			''],
	[47, 'Nickel Silver',       2.32,			''],
	[48, 'Shakudou',            804,			''],
	[49, 'Tumbaga',				402.96,			''],
	//50-59
	[50, 'Nitinol',				1.38,			''],
	[51, 'Nichrome',			1.65,			''],
	[52, 'Chromel',				2.12,			''],
	[53, 'Monel',				1.62,			''],
	[54, 'Electrum',			2875.2,			''],
	[55, 'Goloid',				1457.19,		''],
	[56, 'Shibuichi',			22.84,			'Copper-Silver alloy.'],
	[57, 'Sterling Silver',		58.29,			''],
	[58, 'Osmiridium',			2539.72,		''],
	[59, 'Pseudo Palladium',	2657,			''],
	//60-69
	[60, 'White Gold',			6318,			''],
	[61, 'Tungstensteel',		2.79,			''],

	//Generic Trash Items 62-105

	[62, 'Banana Skin',			0.01,		'', 'food'],
	[63, 'Lemon Skin',			0.01,		'Acidic!', 'food'],
	[64, 'Orange Skin',			0.01,		'', 'food'],
	[65, 'Used Toothbrush',		0.1,		'', 'bkable'],
	[66, 'Defunct Zipper',		0,			'', 'bkable'],
	[67, 'Pizza Crust',			0.07,		'Free food!', 'food'],
	[68, 'Scrap Silicon Wafer',	0.1,		''],
	[69, 'Random Electric Component', 0.5,	''],
	//70-79
	[70, 'Leaky Lithium Battery',	  0.2,  '', 'container'],
	[71, 'Worn out Alkaline Battery', 0.02, '', 'container'],
	[72, 'Rechargeable NiMH Battery', 1.5,	'', 'container'],
	[73, 'Cotton Swab',			0.02,		''],
	[74, 'Food Wrapper',		0.01,		''],
	[75, 'Aluminium Food Wrapper',    0.16, ''],
	[76, 'Candy Wrapper',		0.01,		''],
	[77, 'Dog Buns',			0.01,		''],
	[78, 'Cigarette Butt',		0.15,		''],
	[79, 'Almost depleted Cigarette', 0.5,  ''],
	//80-89
	[80, 'Expired Random Pill',	0.99,		'It should be drugs!'],
	[81, 'Expired Fish',		2,			'This shit smells bad', 'food'],
	[82, 'Expired Meat',		1.5,		'I think I can still eat it', 'food'],
	[83, 'Expired Eggs',		0.85,		'They just have been cooked for a week, still edible!', 'food'],
	[84, 'Rotten Meat',			0.15,		'I am not eating this for less than 10k', 'food'],
	[85, 'Rotten Eggs',			0.08,		'', 'food'],
	[86, 'Expired Youghurt',	0.6,		'The expiry date is from yesterday.', 'food'],
	[87, 'Old Youghurt',		0.01,		'This thing turned blue after a year of decomposition.', 'food'],
	[88, 'Trimmed photo',		0.03,		'Someone did not like this person', 'bkable'],
	[89, 'Old Album Photo',		0.09,		'You can watch this as if you have family', 'bkable'],
	//90-99
	[90, 'Old T-Shirt',			1,			'Now you do not have to wear that cardboard Shirt anymore!', 'bkable'],
	[91, 'Old Pants',			3,			'They are just worn out, but still usable.', 'bkable'],
	[92, 'Old Underpants',		0.35,		'You know what side comes back because of those brownish marks', 'bkable'],
	[93, 'Old Bra',				0.42,		'Size 38F, you can make a good camping tent if needed', 'bkable'],
	[94, 'Old Panties',			0.4,		'Fetishists would pay a lot for this', 'bkable'],
	[95, 'Old Skirt',			2.5,		'Scottish Skirt', 'bkable'],
	[96, 'Old Shoe',			1.3,		'Just find the pair', 'bkable'],
	[97, 'Gauze',				0.02,		'It has some puss and may be infected with AIDS'],
	[98, 'Grandma Denture',		0.3,		'Better than keeping your gold teeth'],
	[99, 'Broken Walking Stick', 1.5,		'Made out of Wood', 'bkable'],
	//100-109
	[100, 'Used Dildo',			5,			'Veins included', 'bkable'],
	[101, 'Chicken Bones',		0.05,		'May still have some chicken and you can have lunch', 'food'],
	[102, 'Molding Apple',		0.1,		'Blue Apple Variant', 'food'],
	[103, 'Molding Pear',		0.1,		'Yummy yummy in your tummy', 'food'],
	[104, 'Molding Tomato',		0.1,		'', 'food'],
	[105, 'Dog Buns on a Stick', 0.01,		''],
	[106, 'Medicine Powder',		0.75,		''],
	[107, 'Aluminium Hat',		0.87,		'Use it to block Illuminati and Aliens radio transmissions'],
	[108, '22K Gold',			2836,		''],
	[109, '18K Gold',			2127,		''],
	//110-119
	[110, '14K Gold',			1595,		''],
	[111, '9K Gold',				1196,		''],
	[112, 'Towering Pillar of Hats', 3,		'A-ha-ha! You are as PRESUMPTUOUS as you are POOR and IRISH. Tarnish notte the majesty of my TOWER of HATS.'],

	[113, 'Wood Powder',		0.01,		''],
	[114, 'Pebble',				0.01,		''],
	[115, 'Plastic',			0.06,		''],
	[116, 'Cotton',				0.01,		''],
	[117, 'Tobacco',			0.33,		''],
	[118, 'Cloth',				0.85,		''],
	[119, 'Apple Seeds',		0.06,		''],
	//120-129
	[120, 'Pear Seeds',			0.06,		''],
	[121, 'Tomato Seeds',		0.06,		''],
	[122, 'Bra Ring',			0.28,		'', 'bkable'],

	[123, 'WPC Plank',			0.05,		'Wood-Plastic Composite', 'bkable'],
	[124, 'Plastic Cap',		0.13,		'', 'bkable'],
	[125, 'Plastic Bottle',     0.16,		'', 'bkable'],
	[126, 'Plastic Bag',		0.09,		'', 'bkable'],
	[127, 'Rubber',				0.15,		''],

	[128, 'Unused',				0,			''], //Fix me please

	[129, 'Hexamine Nitrate',	0.05,		''],
	[130, 'Nitric Acid',		3.30,		'Nitrogen Dioxide + Water'],
	[131, 'Nitrogen Dioxide',	1.05,		'Nitric Oxide + Oxygen'],
	[132, 'Nitric Oxide',       0.30,       'Nitrogen + Oxygen'],
	[133, 'Oxygen',				0.05,		''],
	[134, 'Water',				0.05,		''],
	[135, 'RDX',				10.05,		'Hexamine Nitrate + Nitric Acid'],
	[136, 'C-4',				61.92,		'RDX + dioctyl sebacate + Rubber + mineral oil'],
	[137, 'Dioctyl Sebacate',	0.05,		''],
	[138, 'Mineral Oil',		0.07,		'Petroleum => Mineral Oil, Gasoline'],
	[139, 'Petroleum',			0.30,		''],
	[140, 'Gasoline',			0.07,		'Petroleum => Mineral Oil, Gasoline'],
	[141, 'Nitrogen',			0.05,		''],

	[142, 'Cotton Fibre',		0.06,		'Cotton + Cotton + Cotton', 'bkable'],
	[143, 'Denim',				0.24,		'Cotton Fibre + Cotton Fibre', 'bkable'],
	[144, 'Pair of Jeans',		1.59,		'Denim + Denim + Zipper', 'bkable'],
	[145, 'Zipper',				0.05,		'', 'bkable'],
	[146, 'Button',				0.24,		'Plastic + Plastic'],
	[147, 'Thread',				0.24,		'Cotton Fibre + Cotton Fibre'],
	[148, 'Shirt',				2.18,		'Cloth + Button', 'bkable'],
	[149, 'T-Shirt',			1.57,		'Cloth + Thread', 'bkable'],
	[150, 'Sock',				0.14,		'Cotton Fibre + Cotton Fibre', 'bkable'],
	[151, 'Cotton Ball',		0.21,		'Cotton + Cotton'],
	[152, 'Boxer Shorts',		0.62,		'Cotton Fibre + Thread', 'bkable'],
	[153, 'Plush',				1.85,		'Cloth + Cotton Ball + Button + Button', 'bkable'],
	[154, 'Pillow',				1.41,		'Cloth + Cotton Ball', 'bkable'],
	[155, 'Cigarette',			1.24,		'Cigarette Butt + Tobacco + Tobacco + Paper'],
	[156, 'Paper',				0.05,		'', 'bkable'],
	//Paper and cardboard trash items
	[157, 'Porn Magazine',		2,			'Too bad weekly tits poster is taken away.', 'bkable'],
	[158, 'Cardboard Box',      0.74,       'You can make a fort out of it. (And even cardboard clothing!)', 'bkable'],
	[159, 'Egg Carton',			0.12,		'Muffle your noisy neighbors!', 'bkable'],
	[160, 'Cardboard Tube',		0.06,		'Tons of them are thrown away each year. Save this poor little tube!', 'bkable'],
	[161, 'Paper Bag',          0.02,       'Your 100% eco-friendly shopping companion.', 'bkable'],
	[162, 'Envelope',			0.01,		'Fees, fees, fees, fees, fees.', 'bkable'],
	[163, 'Newspaper',			0.10,		'I love reading those old waiting room newspapers, they keep me informed what is going on in 1986', 'bkable'],
	[164, 'Book',				0.30,		'Twilight? Someone threw this book into the recycle bin. My fireplace loves this saga!', 'bkable'],

	[165, 'Glosy Paper',		0.9,		'Oh my Gloss!'],
	[166, 'Cardboard',			0.33,		'Main ingredient for all cardboard armor things.', 'bkable'],
	[167, 'Cardboard Chestplate', 1.17,		'Cardboard Box + Cardboard', 'bkable'],
	[168, 'Cardboard Pants', 	1.62,		'Cardboard Box + Cardboard Bos', 'bkable'],
	[169, 'Egg Sound Muffler',	0.21,		'Egg Carton + Egg Carton', 'bkable'],
	[170, 'Cardboard Sword',	0.35,		'Cardboard Tube + Cardboard', 'bkable'],
	[171, 'Cardboard Helmet',	0.31,		'Paper Bag + Cardboard', 'bkable'],
	[172, 'Adhesive Tape',		0.59,		'Can fix everything!'],
	[173, 'Duct Tape',			0.18,		'Duck Tape, quack!'],
	[174, 'Straw',				0.01,		'Better not to drink from here...'],
	[175, 'Plastic Gloves',		0.22,		'Leave no traces.'],
	[176, 'Plasic Coated Paper', 0.57,		'Immune to water, overpowered kick-ass paper.'],
	[177, 'Soda Can (Empty)',	0.2,		'Smash it to get free tin!', 'container'],
	[178, 'Scrap Copper Wire',	0.17,		'You can get rich by selling this.'],
	[179, 'Scrap Zinc Wire',    0.09,		''],
	[180, 'Shotgun Shell Casing', 1.66,		''],
	[181, 'Bottle Cap',			0.2,		''],
	[182, 'Soda Can Ring',		0.02,		''],
	[183, 'Broken Knife Blade',	5.4,		''],
	[184, 'Copper Wire',		1.7,		''],
	[185, 'Zinc Wire',			0.9,		''],
	[186, 'Knife',				7,			''],

	[187, 'Broken Wine Bottle',	0.04,		'', 'container'],
	[188, 'Broken Dish',		0.04,		'', 'bkable'],
	[189, 'Marble',				0.1,		''],
	[190, 'Broken Glass Vase',	0.04,		'', 'bkable'],
	[191, 'Broken Glass Jar',	0.04,		'', 'bkable'],
	[192, 'Broken Porcelain Vase', 0.04,	'', 'bkable'],
	[193, 'Broken Porcelain Jar',  0.04,	'', 'bkable'],
	[194, 'Glass Shard',		0.08,		'', 'bkable'],
	[195, 'Porcelain Shard',	0.09,		'', 'bkable'],
	[196, 'Glass Powder',		0.17,		''],
	[197, 'Porcelain Powder', 	0.2,		''],
	[198, 'Cork',				0.15,		''],
];

//Calculate money value of all items together
for (var vlm in floh.items) volume += getPrice(vlm);

//Trash:
//       http://collabedit.com/dq2qu

floh.craftRecipes = [
	/*
	Tool types (For crafting and uncrafting)

	'alloy': Melted and mixed in an Industrial Furnace.
	'craft': Default. Iten can be crafted/uncrafted with bare hands.
	'smash': Smash the items with a blunt object.
	'smelt': Melted at high temperature in an Oven/Cooker
	'press': Made by applying pressure to the objects.
	'chem': Chemical Reaction.
	'loom': String and a Loom is needed for making clothes.
	'glue': Glue items together with an adhesive.
	'cut': Item has to be cut off with a scissor or knife.
	'distill': Crafted by distillation
	*/
	[[null], null, 'craft'],				//Unused recipe, DO NOT CHANGE
	[[2, 2, 2], 26, 'smelt'], 				//Reclaimed Metal (Scrap Metal + Scrap Metal + Scrap Metal)
	[[26, 26, 26], 27, 'smelt'],			//Refined Metal (Reclaimed Metal + Reclaimed Metal + Reclaimed Metal)
	[[27, 27, 27], 28, 'craft'],			//Hat (Refined Metal + Refined Metal + Refined Metal)
	[[3, 3], 29, 'smelt'],					//Pure Iron (Scrap Iron + Scrap Iron)
	[[4, 4], 30, 'smelt'],					//Pure Steel (Scrap Steel + Scrap Steel)
	[[29, 12, 24], 31, 'alloy'],			//Fernico (Pure Iron + Nickel + Cobalt)
	[[29, 12], 32, 'alloy'],				//Invar (Pure Iron + Nickel)
	[[6, 8, 9, 11], 33, 'alloy'],			//Zamak (Zinc + Aluminium + Magnesium + Copper)
	[[7, 11], 34, 'alloy'],					//Molybdochalkos (Lead + Copper)
	[[8, 12, 24], 35, 'alloy'],				//Alnico (Aluminium + Nickel + Cobalt)
	[[8, 11], 36, 'alloy'],					//Duralumin (Aluminium + Copper)
	[[11, 14], 37, 'alloy'],				//Billon (Copper + Silver)
	[[11, 6], 10, 'alloy'],					//Brass (Copper + Zinc)
	[[11, 13], 38, 'alloy'],			//Bronze (Copper + Tin)
	[[11, 12], 39, 'alloy'],			//Cupronickel (Copper + Nickel)
	[[11, 25], 40, 'alloy'],			//Copper-Tungsten (Copper + Tungsten)
	[[11, 14, 20], 41, 'alloy'],		//Corinthian Bronze (Copper + Silver + Gold)
	[[28, 28], 28, 'craft'],			//Hat (Hat + Hat)
	[[28, 28, 28], 112, 'craft'],     //Towering Pillar of Hats (Hat + Hat + Hat)
	[[30, 12, 42],  5, 'alloy'],		//Stainless Steel (Pure Steel + Nickel + Chromium)
	[[7, 13], 43, 'alloy'],			//Solder (Lead + Tin)
	[[8, 9], 44, 'alloy'],			//Magnalium (Aluminium + Magnesium)
	[[11, 11, 12, 29], 45, 'alloy'],	//Cunife (Copper + Copper + Nickel + Pure Iron)
	[[11, 41], 46, 'alloy'],			//Hepatizon (Copper + Corinthian Bronze)
	[[11, 11, 12, 6], 47, 'alloy'],	//Nickel Silver (Copper + Copper + Nickel + Zinc)
	[[11, 11, 11, 20], 48, 'alloy'], //Shakudou (Copper + Copper + Copper + Gold)
	[[11, 11, 11, 49], 49, 'alloy'], //Tumbaga (Copper + Copper + Copper + Shakudou)
	[[12, 22], 50, 'alloy'],			//Nitinol (Nickel + Titanium)
	[[12, 12, 12, 42], 51, 'alloy'],	//Nichrome (Nickel + Nickel + Nickel + Chrome)
	[[12, 12, 51], 52, 'alloy'],		//Chromel (Nickel + Nickel + Nichrome)
	[[12, 12, 11], 53, 'alloy'],		//Monel (Nickel + Nickel + Copper)
	[[14, 20], 54, 'alloy'],			//Electrum (Silver + Gold)
	[[11, 14, 14, 20], 55, 'alloy'],	//Goloid (Copper + Silver + Silver + Gold)
	[[11, 11, 37], 56, 'alloy'],		//Shibuichi (Copper + Copper + Billon)
	[[14, 14, 14, 11], 57, 'alloy'],	//Sterling Silver (Silver + Silver + Silver + Copper)
	[[16, 17], 58, 'alloy'],			//Osmiridium (Osmium + Iridium)
	[[14, 19], 59, 'alloy'],			//Pseudo Palladium (Silver + Rhodium)
	[[20, 20, 20, 12], 60, 'alloy'],	//White Gold (Gold + Gold + Gold + Nickel)
	[[20, 20, 20, 18], 60, 'alloy'],	//White Gold (Gold + Gold + Gold + Palladium)
	[[30, 25], 61, 'alloy'],			//Tungstensteel (Pure Steel + Tungsten)
	[[0, 77], 105, 'craft'],			//Dog Buns on a Stick (Stick + Dog Buns)
	[[1, 80], 106, 'smash'],			//Medicine Powder (Rock + Expired Random Pill)
	[[75, 28], 107, 'craft'],		//Aluminium Hat (Aluminium Food Wrapper + Hat)
	[[2, 20], 108, 'alloy'],			//22K Gold (Scrap Metal + Gold)
	[[2, 108], 109, 'alloy'],		//18K Gold (Scrap Metal + 22K Gold)
	[[2, 109], 110, 'alloy'],		//14K Gold (Scrap Metal + 18K Gold)
	[[2, 110], 111, 'alloy'],		//9K Gold (Scrap Metal + 14K Gold)
	[[111, 111], 110, 'alloy'],		//14K Gold (9K Gold + 9K Gold)
	[[110, 110], 111, 'alloy'],		//18K Gold (14K Gold + 14K Gold)
	[[109, 109], 108, 'alloy'],		//22K Gold (18K Gold + 18K Gold)
	[[108, 108], 20, 'alloy'],		//Gold (22K Gold + 22K Gold)

	[[75, 75], 8, 'smelt'],			//Aluminium (Aluminium Food Wrapper + Aluminium Food Wrapper)
	[[122, 122, 122], 30, 'smelt'],	//Pure Steel (Bra Ring + Bra Ring + Bra Ring)

	[[113, 115], 123, 'press'],		//Wood Plastic Composite (Wood Powder + Plastic)
	[[127, 115], 124, 'smelt'],		//Plastic Cap (Rubber + Plastic)
	[[115, 115, 124], 125, 'smelt'],	//Plastic Bottle (Plastic + Plastic + Plastic Cap)
	[[115, 115, 115], 126, 'smelt'],		//Plastic Bag (Plastic + Plastic + Plastic)
	[[131, 134], 130, 'chem'],		//Nitric Acid (Nitrogen Dioxide + Water)
	[[132, 133], 131, 'chem'],		//Nitrogen Dioxide (Nitric Oxide + Oxygen)
	[[141, 133], 132, 'chem'],		//Nitrogen Oxide (Nitrogen + Oxygen)
	[[129, 130], 135, 'chem'],		//RDX (Hexamine Nitrate + Nitric Acid)
	[[135, 137, 127, 138], 136, 'craft'],	//C-4 (RDX + Dioctyl Sebacate + Rubber + Mineral Oil)

	[[116, 116, 116], 142, 'loom'],	//Cotton Fibre (Cotton + Cotton + Cotton)
	[[142, 142], 143, 'loom'],		//Denim (Cotton Fibre + Cotton Fibre)
	[[143, 143, 145], 144, 'loom'],	//Pair of Jeans (Denim + Denim + Zipper)
	[[118, 146], 148, 'loom'],		//Shirt (Cloth + Button)
	[[118, 147], 149, 'loom'],		//T-Shirt (Cloth + Thread)
	[[142, 118], 150, 'loom'],		//Socks (Cotton Fibre + Cloth)
	[[116, 116], 151, 'loom'],		//Cotton Ball (Cotton + Cotton)
	[[142, 147], 152, 'loom'],		//Boxer Shorts (Cotton Fibre + Thread)
	[[118, 151, 146, 146], 153, 'loom'],		//Plush (Cloth + Cotton Ball + Button + Button)
	[[118, 151], 154, 'loom'],		//Pillow (Cloth + Cotton Ball)
	[[147, 147], 118, 'loom'],		//Cloth (Thread + Thread)

	[[117, 117, 78, 156], 155, 'glue'],	//Cigarette (Tobacco + Tobacco + Cigarette Butt + Paper)
	[[158, 166], 167, 'glue'],          //Cardboard Chestplate (Cardboard Box + Cardboard)
	[[158, 158], 168, 'glue'],          //Cardboard Pants (Cardboard Box + Cardboard Box)
	[[159, 159], 169, 'craft'],			//Egg Sound Muffler (Egg Carton + Egg Carton)
	[[160, 166], 170, 'glue'],			//Cardboard Sword (Cardboard Tube + Cardboard)
	[[161, 166], 171, 'glue'],			//Cardboard Helmet (Paper Bag + Cardboard)
	[[156, 172], 176, 'glue'],			//Plastic Coated Paper (Paper + Adhesive Tape)
	[[174, 174, 174], 115, 'smelt'],		//Plastic (Straw + Straw + Straw)
	[[177, 177], 13, 'smelt'],			//Tin (Soda Can + Soda Can)
	[[178, 178], 11, 'smelt'],			//Copper (Scrap Copper Wire + Scrap Copper Wire)
	[[179, 179], 6, 'smelt'],			//Zinc (Scrap Zinc Wire + Scrap Zinc Wire)
	[[180, 180], 8, 'smelt'],			//Aluminium (Shotgun Shell Casing + Shotgun Shell Casing)
	[[181, 181], 4, 'smelt'],			//Scrap Steel (Bottle Cap + Bottle Cap)
	[[182, 182], 13, 'smelt'],			//Tin (Soda Can Ring + Soda Can Ring)
	[[183, 183], 5, 'smelt'],			//Stainless Steel (Broken Knife Blade + Broken Knife Blade)
	[[178, 127], 184, 'glue'],			//Copper Wire (Scrap Copper Wire + Rubber)
	[[179, 127], 185, 'glue'],			//Zinc Wire (Scrap Zinc Wire + Rubber)
	[[115, 183, 5], 186, 'glue'],		//Knife (Plastic + Broken Knife Blade + Stainless Steel)

	[[187, 187], 194, 'smash'],			//Glass Shard (Wine Bottle + Wine Bottle)
	[[190, 190], 194, 'smash'],			//Glass Shard (Glass Vase + Glass Vase)
	[[191, 191], 194, 'smash'],			//Glass Shard (Glass Jar + Glass Jar)
	[[188, 188], 195, 'smash'],			//Porcelain Shard (Dish + Dish)
	[[192, 192], 195, 'smash'],			//Porcelain Shard (Porcelain Vase + Porcelain Vase)
	[[193, 193], 195, 'smash'],			//Porcelain Shard (Porcelain Jar + Porcelain Jar)
	[[194, 194], 196, 'smash'],			//Glass Powder (Glass Shard + Glass Shard)
	[[195, 195], 197, 'smash'],			//Porcelain Powder (Porcelain Shard + Porcelain Shard)
];

floh.deCraftRecipes = [
	[null, [null, null], 'craft'],	//Unused recipe, do not change.
	[0, [113], 'smash'],				//Stick => Wood Powder
	[99, [113], 'smash'],			//Broken Walking Stick => Wood Powder
	[1, [114], 'smash'],				//Rock => Pebble
	[65, [115], 'cut'],			//Used Toothbrush => Plastic
	[96, [115, 118], 'cut'],		//Old Shoe => Plastic, Cloth
	[73, [116], 'cut'],			//Cotton Swab => Cotton
	[79, [117, 78], 'craft'],		//Almost Depleted Cigarette => Tobacco, Cigarette Butt
	[90, [118], 'cut'],			//Old T-Shirt => Cloth
	[91, [118, 66], 'cut'],		//Old Pants => Cloth, Defunct Zipper
	[92, [118], 'cut'],			//Old Underpants => Cloth
	[93, [118, 122, 122], 'cut'],	//Old Bra => Cloth, Bra Ring, Bra Ring
	[94, [118], 'cut'],			//Old Panties => Cloth
	[95, [118, 66], 'cut'],		//Old Skirt => Cloth, Defunct Zipper
	[139, [138, 140], 'distill'],		//Petroleum => Mineral Oil, Gasoline
	[144, [143, 145], 'cut'],		//Pair of Jeans => Denim, Zipper
	[145, [66], 'smash'],			//Zipper => Defunct Zipper
	[153, [151], 'cut'],			//Plush => Cotton Ball
	[154, [151], 'cut'],			//Pillow => Cotton Ball
	[155, [78, 117], 'craft'],		//Cigarette => Cigarette Butt, Tobacco
	[157, [165], 'craft'],			//Porn Magazine => Glossy Paper
	[158, [166], 'craft'],			//Cardboard Box => Cardboard
	[160, [166], 'craft'],			//Cardboard Tube => Cardboard
	[161, [156], 'craft'],			//Paper Bag => Paper
	[162, [156], 'craft'],			//Envelope => Paper
	[163, [156], 'craft'],			//Newspaper => Paper
	[164, [166, 156], 'craft'],		//Book => Cardboard, Paper
	[177, [182], 'craft'],			//Soda Can => Soda Can Ring
	[187, [198, 194], 'smash'],		//Wine Bottle => Cork, Glass Shard
];

upd.updateAll();

$(document).ready(function() {
	$('.window').hide();

	function showWindow(what) {
		$('.window').hide();
		$(what).show();
		inventory();
	}

	$('#b_invnt').click(function() {
		showWindow('#w_invnt');
	});

	$('#b_home').click(function() {
		showWindow('#w_home');
	});

	$('#b_markt').click(function() {
		showWindow('#w_markt');
	});

	$('#b_craft').click(function() {
		showWindow('#w_craft');
	});

	$('#b_changelog').click(function() {
		dumpAllItems();
		showWindow('#w_changelog');
	});

	$('#b_junk').click(function() {
		showWindow('#w_junk');
	});

	$('#button_sort0').click(function() {
		sortitems('inventory', 0);
	});

	$('#button_sort1').click(function() {
		sortitems('inventory', 1);
	});

	$('#button_sortm0').click(function() {
		sortitems('market', 0);
	});

	$('#button_sortm1').click(function() {
		sortitems('market', 1);
	});

	$('#button_sortq0').click(function() {
		sortitems('inventory', 0, 'Sort by Quality');
		sortitems('market', 0, 'Sort by Quality');
	});

	$('#button_sortq1').click(function() {
		sortitems('inventory', 1, 'Sort by Quality');
		sortitems('market', 1, 'Sort by Quality');
	});

});

function makeScrapList() {
	console.log('Loading scrap list...');
	var scrapListIndex = 0;
	for (var sc in SCRAP_CHANCES) {
		for (var scc = 0; scc < SCRAP_CHANCES[sc]; scc++) {
			scrapList[scrapListIndex] = parseInt(sc) + 3;
			scrapListIndex++;
		}
	}
	console.log('Finished loading scrap list.');
}
function makeFurnitureList() {

}
//$Functions (END)

//$Variables
var SCRAP_CHANCES = [
	57838, 16478, 2095, 3115, 2979, 8896,
	3952, 1218, 771, 386, 348, 10, 10, 4,
	2, 2, 1, 1, 1, 1306, 268, 163, 156
];
var scrapList = [];
makeScrapList();

var itemStatusModifiers = {
	'new': 1.1,
	'used': 0.5,
	'filled': 1.1,
	'empty': 0.1,
	'wet': 0.9,
	'broken': 0.5,
	'dirty': 0.5,
	'burned': 0.5,
	'destroyed': 0.1,
	'antique': 1.5,
	'unused': 1.5,
	'unique': 1.5,
	'old': 0.5,
	'expired': 0.5,
	'rotten': 0.1,
	'repaired': 1.1,
	'refilled': 1.1,
}
var itemStatuses = {
	//Item condition after find or buy
	'new': 1,		//Item is new or age is less than 255. 110% price.
	'used': 0,		//New item after reaching 256 age in inventory (2 hours 7 minutes and 48 seconds). 50% price.
	'filled': 0,    //The item is not depleted. 110% price.
	'empty': 0, 	//The item have been emptied. 10% price.
	
	//Fix-able conditions
	'wet': 0,		//Item is wet and may not work properly until dried. 90% price.
	'broken': 0,	//Used item that lost durability. Parts can be still salvaged. 50% price.
	'dirty': 0,		//This item may be cleaned before being sold. 50% price.

	//Non fix-able conditions
	'burned': 0,	//Item is burned and may not work. 50% price.
	'destroyed': 0,	//No parts can be salvaged. 10% price.

	//Collectionist related conditions
	'antique': 0,	//Used item after reaching 65536 age in inventory (22 days 18 hours and 8 minutes). 150% price.
	'unused': 0,	//Antique item that still haves all durability. 150% price.
	'unique': 0,	//The item can only be obtained by being lucky. 150% price.

	//Time related conditions
	'old': 0,		//Used item after reaching 4096 age in inventory (1 day 10 hours and 8 minutes). 50% price.
	'expired': 0,	//Food that stays more than 1 day in inventory. 50% price.
	'rotten': 0,	//Food that stays more than 1 week in inventory. 10% price.

	//Recycling and repairing related contidions
	'repaired': 0,	//The item have been fixed from a broken state. 110% price.
	'refilled': 0,	//The item have been filled from an empty state. 110% price.
};
var furniture = [
	//Furniture ID, Name, Description, Durability, Button Value, Button Action
	[1, 'Table', 'Useful for crafting.', 10000, 'Watch', ''],
	[2, 'Industrial Furnace', 'Needed for smelting alloys.', 1000, 'Watch', ''],
	[3, 'Oven', 'Smelt and cook everything.', 100, 'Watch', ''],
	[4, 'Press Machine', 'Used for pressing and flattening stuff.', 1000, 'Watch', ''],
	[5, 'Chemical Reactor', 'Reacts stuff into other stuff (Usually chemicals)', 1000, 'Watch', ''],
	[6, 'Loom', 'Can make clothing in combination with thread.', 1000, 'Watch', ''],
	[7, 'Guillotine', 'Cuts paper and various stuff.', 1000, 'Watch', ''],
	[8, 'Distiller', 'A must in home laboratories. Distills various liquids.', 1000, 'Watch', ''],
];
floh.furniture = [];
//$variables (end)