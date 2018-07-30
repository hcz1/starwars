const fetch = require('node-fetch');
const starwarsURL = 'https://swapi.co/api/people/';

function starwars(url,i){
    fetchData(url+i)
        .then(character => {return {name:character.name, films:character.films}})
        .then(characterObj => {
            let charName = characterObj.name;
            console.log(charName + " has been in ");
            let createDiv =  document.createElement('div');
            createDiv.setAttribute("id", "list"+i);
            document.body.appendChild(createDiv)
            let divs = document.getElementById("list"+i)

            divs.innerHTML = `${charName}: has been in     `;
            getFilms(characterObj.films, i);
            
            if(i<=10){
                i++;
                starwars(url,i);
            }
            else return
        })
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


