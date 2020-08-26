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
	const mainContainer = document.getElementById("list");
	const pageContainer = document.getElementById('pagination');
	const rows = 5;
	const newsItems = data.articles;

	function displayNews(page) {
		mainContainer.innerHTML = "";
		page--;
		let start = rows * page;
		let end = start + rows;
		let pageNews = newsItems.slice(start,end);
		console.log(pageNews);

		for (let i = 0; i < rows; i++) {
			let newsCard = pageNews[i];
			let card = document.createElement("div");
			card.classList.add('item');

			if (newsCard.author == "") {
				awtor = "";
			} else { awtor = `<div class="author">By ` + newsCard.author + `</div>`; }

			card.innerHTML = `
				<div style="background-image: url(` + newsCard.urlToImage + `);" class="newsimg">
					<div class="source">` + newsCard.source.name + `</div>
				</div>
				<div class="info">
					<h1>` + newsCard.title + `</h1>
					<p>` + newsCard.description + `</p>
					` + awtor + `
				</div>`;
			mainContainer.appendChild(card);
		}
	}

	function pagination() {
		pageContainer.innerHTML = "";
		const pages = document.getElementById("pagination");
		let pageCount = Math.ceil(newsItems.length / rows);
		console.log(pageCount);
		for (let x = 1; x < (pageCount + 1); x++) {
			let btn = pageButton(x, newsItems);
			pages.appendChild(btn);
		}
	}

	function pageButton (page) {
		let button = document.createElement('button');
		button.innerText = page;

		if (current_page == page) {
			button.classList.add('active');
		}

		button.addEventListener('click', function() {
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
			
			current_page = page;
			displayNews(current_page);

			let currentBtn = document.querySelector('.pagenumbers button.active');
			currentBtn.classList.remove('active');

			button.classList.add('active');
		});
		return button;
	}

	let current_page = 1;
	displayNews(current_page);
	pagination();
}

