const fetch = require('node-fetch');
const starwarsURL = 'https://swapi.co/api/people/?page1';

function starwars(url,i){
    fetchData(url+i)
    .then(console.log)
   
    .catch(e => console.log(e)) 
}

//call function
starwars(starwarsURL,1)

function fetchData(starwarsURL){
    return fetch(starwarsURL)
            .then(res => res.json())
            .catch(err => console.log(err))
}

function getFilms(films, i){

    Promise.all(films.map(film => 
        fetchData(film)
    ))
    .then(movies =>{ 
        for(movie of movies){
            console.log(movie.title)
            var movieTitle = movie.title;
            let divs = document.getElementById("list"+i)
            divs.innerHTML += `${movieTitle}, `;
        } 
        })
}


