const fetch = require('node-fetch');
const starwarsURL = 'https://swapi.co/api/people/';
const gify = 'https://api.giphy.com/v1/gifs/search?api_key=nKEBs8jp1zxIOUHpWeqqll5oSvtdCOBK&limit=3&offset=0&rating=G&lang=en&q='

function starwars(url,i){
    fetchData(url+i)
        .then(character => {return {name:character.name, films:character.films}})
        .then(characterObj => {
            let charName = characterObj.name;
            getImage(charName,i);
            console.log(charName + " has been in ");
            
            createDiv(i);          
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

function createDiv(i){
    let createDiv =  document.createElement('div');
    createDiv.setAttribute("id", "list"+i);
    document.body.appendChild(createDiv) 
}

function fetchData(url){
    return fetch(url)
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

function getImage(character, i){
    fetchData(gify+character)
    .then(result=> {

        let divs = document.getElementById("list"+i);
        let picURl = result.data[2].images.downsized.url;
        return divs.innerHTML += `<img src="${picURl}"> ${character} has been in: `;
    })
    .catch(err=>console.log(err))
}

