//api key 95fae4b0b59a3caea9d5ba5cd603ae26//


const fetchMovies = (page = 1, popularity = 'day') => {
  let url;

  if (popularity === 'day') {
    url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=f673b4c51255192622a586f74ec1f251`;
  } else if (popularity === 'week') {
    if (page >= 1 && page <= 5) {
      const startPage = page + 9;
      const endPage = startPage + 4;
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${startPage}&api_key=f673b4c51255192622a586f74ec1f251`;
    } else {
  
      console.log('nope');
      return;
    }
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      moviesPresentation.innerHTML = '';
      data.results.forEach((movieResult) => {
        moviesPresentation.innerHTML += `
          <h3 ><small><small>title: </small></small>${movieResult.title}</h3>
          <img  style="width:20%; height:auto;" src="https://image.tmdb.org/t/p/original${movieResult.poster_path}" />
        `;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

searchPopularDayOrWeek.addEventListener('click', () => {
  homePagePopularInputVal = homePagePopularInput.value;

  currentPage = 1;

  switch (homePagePopularInputVal) {
    case 'day':
      fetchMovies(1, 'day');
      break;
    case 'week':
      fetchMovies(1, 'week');
      break;
    default:
      console.log('nope');
  }
});

const pagination = document.querySelector('.pagination');
const totalPages = 5;
let currentPage = 1;

pagination.addEventListener('click', (event) => {
  const targetTagName = event.target.tagName;

  if (targetTagName === 'A' && !event.target.parentElement.classList.contains('disabled')) {
    event.preventDefault();
    const pageNumber = parseInt(event.target.textContent);

    if (pageNumber === currentPage) {
      return;
    }

    if (event.target.textContent === 'Previous') {
      currentPage--;
    } else if (event.target.textContent === 'Next') {
      currentPage++;
    } else {
      currentPage = pageNumber;
    }

    updatePagination();
    fetchMovies(currentPage, homePagePopularInputVal);
  }
});

const updatePagination = () => {
  const pageItems = pagination.querySelectorAll('.page-item');
  pageItems.forEach((item) => item.classList.remove('active'));

  const pageLinks = pagination.querySelectorAll('.page-link');

  if (currentPage === 1) {
    pageItems[0].classList.add('disabled');
  } else {
    pageItems[0].classList.remove('disabled');
  }

  if (currentPage === totalPages) {
    pageItems[6].classList.add('disabled');
  } else {
    pageItems[6].classList.remove('disabled');
  }

  pageLinks[1 + currentPage - 1].parentElement.classList.add('active');
};


updatePagination();
// const fetchMovies = (page=1) => {
//   const url = `
//   https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=f673b4c51255192622a586f74ec1f251`;
 
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       const printVar = document.getElementById("mainSection");
//       console.log(data);
//       printVar.innerHTML = "";
//       data.results.map((movieResults) => {

// printVar.innerHTML += `<h2>${movieResults.title}</h2>
// <img src=https://image.tmdb.org/t/p/original${movieResults.poster_path} style="width:20%; height:auto;" >`
//     }).join("") })
//     .catch((error) => {
//       console.log(error);
//     });
// };      


// searchPopularDayOrWeek.addEventListener('click' , () => {
//   homePagePopularInputVal = homePagePopularInput.value 
// switch(homePagePopularInputVal)  {
//   case "day" : fetchMovies(1)
//   break;
//   case "week" : fetchMovies(2)
//   break;
//   default: console.log("nope")
// }

// })
/**/ 


// const fetchMovies = (movie, page=1) => {
//   const url = `
//   https://api.themoviedb.org/3/search/movie?language=en-US&query=${movie}&page=${page}&api_key=95fae4b0b59a3caea9d5ba5cd603ae26`;
 
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);

//     })  
//     .catch((error) => {
//       console.log(error);
//     });
// };      



// fetchMovies("batman",4)



