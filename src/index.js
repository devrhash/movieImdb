import "./styles.css";

let flag = 0;

let page = 1;
let Name;
const result = () => {
  fetch(`https://omdbapi.com/?&s=${Name}&page=${page}&apikey=6559809a`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(typeof data);
      let array = [];
      array = data.Search;
      console.log(array);
      let html = ``;
      for (const x of array) {
        html += `
        <div class="movie">
        <div class="movieCard" id=${x.imdbID}>
        <img src=${x.Poster}></img>
        <div class="movieName">
        <p>${x.Title}</p>
        </div>
        </div>
        <div class="reaction">
        <div class="commentArea">
        <label>Rating:</label>
        <input class="select" id=${x.imdbID}>
       
        </input>

        </div>
        <div class="commentArea">
        <label>Comment</label>
        <textarea class="comment" id=${x.imdbID}></textarea>
        </div>
        <button class="save" id=${x.imdbID}>save</button>
        </div>
        </div>
      `;
      }
      document.getElementById("page").innerHTML = html;
      let ele = document.getElementsByClassName("movieCard");
      for (let itr of ele) {
        itr.addEventListener("click", function (e) {
          details(e);
        });
      }
      let saveBtn = document.getElementsByClassName("save");
      for (let itr of saveBtn) {
        itr.addEventListener("click", saveResponse);
      }
      let movies = JSON.parse(localStorage.getItem("movieList"));
      console.log(movies);
      let rating = document.getElementsByClassName("select");
      let comment = document.getElementsByClassName("comment");
      for (let itr of rating) {
        if (movies !== null) {
          for (const x of movies) {
            if (x.id === itr.id) {
              console.log(x.rating);
              itr.value = x.rating;
            }
          }
        }
      }
      for (let itr of comment) {
        if (movies !== null) {
          for (const x of movies) {
            if (x.id === itr.id) {
              itr.value = x.comment;
            }
          }
        }
      }
    });
};
const saveResponse = (e) => {
  let val = e.target.id;
  let movies = JSON.parse(localStorage.getItem("movieList"));
  console.log(movies);
  if (movies === null) {
    movies = [];
  }
  let newMovie = {};
  newMovie.id = val;
  let rating = document.getElementsByClassName("select");
  for (let itr of rating) {
    if (itr.id === val) {
      newMovie.rating = itr.value;
    }
  }
  let comment = document.getElementsByClassName("comment");
  for (let itr of comment) {
    console.log("jjjjjjjj");
    if (itr.id === val) {
      console.log(itr.value);
      newMovie.comment = itr.value;
    }
  }
  movies.push(newMovie);
  localStorage.setItem("movieList", JSON.stringify(movies));
};
const details = (e) => {
  let val = e.currentTarget.id;
  console.log(e);
  console.log(val);
  fetch(`https://omdbapi.com/?&i=${val}&apikey=6559809a`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      let html = ``;
      html += `<div class="details">
           <p>Title:${data.Title}</p>
           <p>Year:${data.Year}</p>
           <p>Released:${data.Released}</p>
           <p>Runtime:${data.Runtime}</p>
           </div>`;
      document.getElementById(val).innerHTML += html;
    });
};

document.getElementById("search").addEventListener("click", function () {
  page = 1;
  Name = document.getElementById("searchbar").value;

  result();
  let html = ` <button class="changePage" id="prevPage">previous</button>`;
  for (let i = 1; i <= 6; i++) {
    html += `<button class="changePage1" id=${i}>${i}</button>`;
  }
  html += `<button class="nextPage" id="nextPage">next</button>`;
  document.getElementById("bottom").innerHTML = html;
  let btn = document.getElementsByClassName("changePage1");
  for (let itr of btn) {
    itr.addEventListener("click", function (e) {
      page = e.target.id;
      result();
    });
  }
  document.getElementById("nextPage").addEventListener("click", function () {
    page += 1;
    result();
  });
  document.getElementById("prevPage").addEventListener("click", function () {
    page -= 1;
    result();
  });
});
