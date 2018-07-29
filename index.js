const fetch = require('node-fetch');
const starwarsURL = 'http://swapi.co/api/people/1';

fetchData(starwarsURL)
    .then(luke => {return {name:luke.name, films:luke.films}})
    .then(lukeObj => {
        console.log(lukeObj.name + " has been in ");
        getFilms(lukeObj.films);
    })
    .catch(e => console.log(e)) 
    

function fetchData(starwarsURL){
    return fetch(starwarsURL)
            .then(res => res.json())
            .catch(err => console.log(err))
}

function getFilms(films){

    Promise.all(films.map(film => 
        fetchData(film)
    ))
    .then(movies =>{ 
        for(movie of movies){
            console.log(movie.title)} 
        })
}


