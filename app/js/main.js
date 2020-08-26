var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=9e56665dd12747d699700625112fe619';
var req = new Request(url);
fetch(req)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		appendData(data);
	})
	.catch(error => {
		console.log(error)
	});

function appendData(data) {
	const list_element = document.getElementById('list');
	const pagination_element = document.getElementById('pagination');

	let current_page = 1;
	let rows = 5;

	function DisplayList (data, wrapper, rows_per_page, page) {
		wrapper.innerHTML = "";
		page--;

		let start = rows_per_page * page;
		let end = start + rows_per_page;
		let items = data.articles;
		let paginatedItems = items.slice(start, end);

		for (let i = 0; i < paginatedItems.length; i++) {
			let item = paginatedItems[i];
			let item_element = document.createElement('div');
			
			item_element.classList.add('item');
			item_element.innerHTML = '<div style="background-image: url(' + item.urlToImage + ');" class="newsimg"></div><div class="info"><h1>' + item.title + '</h1><p>' + item.description + '</p></div>';
			
			wrapper.appendChild(item_element);
		}
	}

	function SetupPagination (data, wrapper, rows_per_page) {
		wrapper.innerHTML = "<div>";
		let items = data.articles;

		let page_count = Math.ceil(items.length / rows_per_page);
		console.log(items.length);
		console.log(page_count);
		for (let i = 1; i < page_count + 1; i++) {
			let btn = PaginationButton(i, items);
			wrapper.appendChild(btn);
		}
	}

	function PaginationButton (page, data) {
		let button = document.createElement('button');
		button.innerText = page;

		if (current_page == page) button.classList.add('active');

		button.addEventListener('click', function () {
			current_page = page;
			DisplayList(data, list_element, rows, current_page);

			let current_btn = document.querySelector('.pagenumbers button.active');
			current_btn.classList.remove('active');

			button.classList.add('active');
		});

		return button;
	}

	DisplayList(data, list_element, rows, current_page);
	SetupPagination(data, pagination_element, rows);
}


// const list_items = [
// 	"Item 1",
// 	"Item 2",
// 	"Item 3",
// 	"Item 4",
// 	"Item 5",
// 	"Item 6",
// 	"Item 7",
// 	"Item 8",
// 	"Item 9",
// 	"Item 10",
// 	"Item 11",
// 	"Item 12",
// 	"Item 13",
// 	"Item 14",
// 	"Item 15",
// 	"Item 16",
// 	"Item 17",
// 	"Item 18",
// 	"Item 19",
// 	"Item 20",
// 	"Item 21",
// 	"Item 22"
// ];

// const list_element = document.getElementById('list');
// const pagination_element = document.getElementById('pagination');

// let current_page = 1;
// let rows = 5;

// function DisplayList (items, wrapper, rows_per_page, page) {
// 	wrapper.innerHTML = "";
// 	page--;

// 	let start = rows_per_page * page;
// 	let end = start + rows_per_page;
// 	let paginatedItems = items.slice(start, end);

// 	for (let i = 0; i < paginatedItems.length; i++) {
// 		let item = paginatedItems[i];

// 		let item_element = document.createElement('div');
// 		item_element.classList.add('item');
// 		item_element.innerText = item;
		
// 		wrapper.appendChild(item_element);
// 	}
// }

// function SetupPagination (items, wrapper, rows_per_page) {
// 	wrapper.innerHTML = "";

// 	let page_count = Math.ceil(items.length / rows_per_page);
// 	for (let i = 1; i < page_count + 1; i++) {
// 		let btn = PaginationButton(i, items);
// 		wrapper.appendChild(btn);
// 	}
// }

// function PaginationButton (page, items) {
// 	let button = document.createElement('button');
// 	button.innerText = page;

// 	if (current_page == page) button.classList.add('active');

// 	button.addEventListener('click', function () {
// 		current_page = page;
// 		DisplayList(items, list_element, rows, current_page);

// 		let current_btn = document.querySelector('.pagenumbers button.active');
// 		current_btn.classList.remove('active');

// 		button.classList.add('active');
// 	});

// 	return button;
// }

// DisplayList(list_items, list_element, rows, current_page);
// SetupPagination(list_items, pagination_element, rows);