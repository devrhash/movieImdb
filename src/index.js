import "./styles.css";

let flag = 0;
let movie = [];
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
        <label>Rating:</label>
        <select id=${x.imdbID}>
        <option value=1>1</options>
        <option value=2>2</options>
        <option value=3>2</options>
        <option value=4>4</options>
        <option value=5>5</options>
        <option value=6>6</options>
        <option value=7>7</options>
        <option value=8>8</options>
        <option value=9>9</options>
        <option value=10>10</options>
        </select>
        <div class="comment">
        <label>Comment</label>
        <textarea id=${x.imbID}></textarea>
        </div>
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
    });
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
