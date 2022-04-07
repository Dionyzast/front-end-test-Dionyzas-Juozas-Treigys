//By Dionyzas Juozas Treigys

document.getElementById('loadMore').addEventListener('click', loadMore);
document.getElementById('lowHigh').addEventListener('click', sort);

var price = [];
var counter = 0;
var output = "";
var sorted = false;
const productUrl = 'products/products.json';

//Function initiated that fetches the json file and uses a for loop to load the product page in incriments of 12 (using a variable counter).
//If the boolean 'sorted' is false, then it prints the default order of the product list, which it does firstly when the window is loaded.
async function loadMore(){

	if(sorted == false){
		const res = await fetch(productUrl);
		const data = await res.json();

		//console.log(data);

		for(var i = counter ; i <counter+12 && i<data.length; i++){
			output += `
				<ul>
					<a href="http://www.matchesfashion.com${data[i].url}">
						<img class="images" src=${data[i].images[0]} onmouseover="this.src='${data[i].images[1]}'" onmouseout="this.src='${data[i].images[0]}'" alt="">
					</a>
					<h4>${data[i].designer}</h4>
					<p>${data[i].name}</p>
					<p>${data[i].price}</p>
				</ul>
			`;

			document.getElementById('productList').innerHTML = output;

			//console.log(i);
		};
		counter += 12;

	} else {
		sort().then((data)=> {

			//console.log(data);

			output = "";

				for(var i = 0 ; i <counter+12 && i<data.length; i++){
					output += `
						<ul>
							<a href="http://www.matchesfashion.com${data[i].url}">
						    	<img class="images" src=${data[i].images[0]} onmouseover="this.src='${data[i].images[1]}'" onmouseout="this.src='${data[i].images[0]}'" alt="">
						    </a>
						    <h4>${data[i].designer}</h4>
							<p>${data[i].name}</p>
							<p>${data[i].price}</p>
						</ul>
					`;

					document.getElementById('productList').innerHTML = output;
						
					//console.log(i);
				};

			counter += 12;

			})
	}
};

//Function initiated that sorts the product list by ascending price. 
//An array (price) is populated by parsing the price string from the json file into a float to be sorted alongside the products using a for loop.
//Then the default product order is cleared and reprinted with the ascending order into the innerHTML.
//The sorted local array data is returned to be used in the loadMore function if the boolean does not pass (if the page is sorted).
async function sort(){

	var output = "";
	document.getElementById('productList').innerHTML = "";

	const res = await fetch(productUrl);
	const data = await res.json();

	for(var i = 0 ; i<data.length; i++){
		price[i] = parseFloat(data[i].price.replace('£','').replace(',',''));
	};
	
	//console.log(price);

	for(var i = 0 ; i<data.length; i++){
		if (price[i] > price[i+1]){
			var temp1 = data[i];
            data[i] = data[i+1];
           	data[i+1] = temp1;

           	var temp2 = price[i];
            price[i] = price[i+1];
           	price[i+1] = temp2;

           	i=-1;
		};
	};

	//console.log(price);
	//console.log(data);

	for(var i = 0 ; i <counter && i<data.length; i++){
		output += `
			<ul>
				<a href="http://www.matchesfashion.com${data[i].url}">
					<img class="images" src=${data[i].images[0]} onmouseover="this.src='${data[i].images[1]}'" onmouseout="this.src='${data[i].images[0]}'" alt="">
				</a>
				<h4>${data[i].designer}</h4>
				<p>${data[i].name}</p>
				<p>${data[i].price}</p>
			</ul>
		`;

		document.getElementById('productList').innerHTML = output;

		//console.log(i);
	};

	sorted = true;
	return data;

};

window.onload=loadMore();
