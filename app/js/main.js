var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=9e56665dd12747d699700625112fe619';
var req = new Request(url);
fetch(req)
// fetch('articles.json') //for offline use
	.then(response => response.json())
	.then(data => {
		console.log(data);
		appendData(data);
	})
	.catch(error => {
		console.log(error);
	});

function appendData(data) {
	const resultContainer = document.getElementById("result");
	const mainContainer = document.getElementById("list");
	const pageContainer = document.getElementById('pagination');
	const search = document.getElementById('search');
	const rows = 5;
	const newsItems = data.articles;

	//print article card
	function newsArticle(a) {
		for (let i = 0; i < a.length; i++) {
			let newsCard = a[i];
			let card = document.createElement("div");
			card.classList.add('item');

			// let rawDate = newsCard.publishedAt;
			// let formatDate = new Date.(rawDate);
			// let newsDate = formatDate.getFullYear();

			if (!newsCard.urlToImage) {
				newsImage = "https://via.placeholder.com/900x500?text=No+Image";
			} else { newsImage = newsCard.urlToImage; }
			if (!newsCard.description) {
				newsDesc = "";
			} else { newsDesc = newsCard.description; }
			if (!newsCard.author) {
				awtor = "";
			} else { awtor = `<div class="author">By ` + newsCard.author + `</div>`; }

			card.innerHTML = `
				<div class="source">` + newsCard.source.name + `</div>
				<a href="` + newsCard.url + `" target="_blank" rel="noopener noreferrer">
				<div style="background-image: url(` + newsImage + `);" class="newsimg">
				</div></a>
				<div class="info">
					<a href="` + newsCard.url + `" target="_blank" rel="noopener noreferrer">
						<h1>` + newsCard.title + `</h1>
					</a>
					<p>` + newsDesc + `</p>
					` + awtor + `
				</div>`;
			mainContainer.appendChild(card);
		}
	}

	//set pages	
	function pagination(container, articles, loc) {
		container.innerHTML = "";
		const pages = document.getElementById("pagination");
		
		let pageCount = Math.ceil(articles.length / rows);

		for (let x = 1; x < (pageCount + 1); x++) {
			let btn = loc(x, articles);
			pages.appendChild(btn);
		}
	}

	//search on type
	search.addEventListener("keyup", searching);
	//reset search and pages when x is clicked
	search.addEventListener("search", searching);
	function searching() {
		const searchString = search.value.toLowerCase();
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		let search_page = 1;
		resultContainer.innerHTML = "";

		const filteredNews = newsItems.filter((qry) => {
			return (
				qry.title.toLowerCase().includes(searchString) 
			);
		});

		if (filteredNews.length > 0) {
			if (searchString != "") {
				resultContainer.innerHTML = filteredNews.length + ` Results for "` + searchString + `"`;
			} else {
				resultContainer.innerHTML = "";
			}
			function searchResults(page) {
				mainContainer.innerHTML = "";
				page--;
				let start = rows * page;
				let end = start + rows;
				console.log('# of search results: ' + filteredNews.length);
				let pageNews = filteredNews.slice(start,end);

				newsArticle(pageNews);
			}

			function searchPages(page) {
				let button = document.createElement('button');
				button.innerText = page;
		
				if (search_page == page) {
					button.classList.add('active');
				}

				button.addEventListener('click', function() {
					document.body.scrollTop = 0;
					document.documentElement.scrollTop = 0;
		
					search_page = page;
					searchResults(search_page);
		
					let currentBtn = document.querySelector('.pagenumbers button.active');
					currentBtn.classList.remove('active');
		
					button.classList.add('active');
				});
				return button;
			}

			searchResults(search_page);
			pagination(pageContainer, filteredNews, searchPages);
		} else {
			console.log('no results');
			function searchResults() {
				resultContainer.innerHTML = "No results found :(";
				mainContainer.innerHTML = "";
			}
			searchResults();
			pageContainer.innerHTML = "";
		}
		// //clear search bar and return to first page
		// search.addEventListener('search', function(e) {
		// 	let search_page = 1;
		// 	resultContainer.innerHTML = "";
		// 	displayNews(search_page);
		// 	pagination(pageContainer, filteredNews, searchPages);
		// });
	}

	//display news feed
	function displayNews(page) {
		mainContainer.innerHTML = "";
		page--;
		let start = rows * page;
		let end = start + rows;

		let pageNews = newsItems.slice(start,end);
		console.log(pageNews);

		newsArticle(pageNews);
	}

	//display page buttons
	function pageButton (page) {
		let button = document.createElement('button');
		button.innerText = page;

		if (current_page == page) {
			button.classList.add('active');
		}

		button.addEventListener('click', function() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;

			current_page = page;
			displayNews(current_page);

			let currentBtn = document.querySelector('.pagenumbers button.active');
			currentBtn.classList.remove('active');

			button.classList.add('active');
		});
		return button;
	}

	// //clear search bar and return to first page
	// let pageSearch = searching();
	// search.addEventListener('search', function(e) {
	// 	let search_page = 1;
	// 	resultContainer.innerHTML = "";
	// 	displayNews(search_page);
	// 	// let pageSearch = searchPages();
	// 	pagination(pageContainer, pageSearch.filteredNews, pageSearch.searchPages);
	// 	// pagination(pageContainer, newsItems);
	// });

	let current_page = 1;
	displayNews(current_page);
	pagination(pageContainer, newsItems, pageButton);
}

