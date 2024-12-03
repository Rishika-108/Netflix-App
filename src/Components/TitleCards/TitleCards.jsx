import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ( {title, category}) => {
  const[apiData, setApiData] = useState ([]);
  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzM4YzQyNWRjNmNkN2Q1YmJjOGM5YjlkNDRiYThhOCIsIm5iZiI6MTcxOTgwODkwOS44MDY0NDgsInN1YiI6IjY2ODIzMWU4Y2IxOWNiODM4NzY1YTliMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6B6yKOQv_1Gf6DkkwJztmWb3Q3HFZkzMO_6tGufx2SM'
    }
  };
  
  

  const handleWheel = (event)=> {
   event.preventDefault();
   cardsRef.current.scrollLeft += event.deltaY;
}

useEffect (()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  cardsRef.current.addEventListener ('wheel',handleWheel);
},[])

  return (
    <div className='titlecards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list"ref={cardsRef}>
           {apiData.map ((card, index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src= {`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p> {card.original_title}</p>
            </Link>
           })}
        </div>
    </div>
  )
}

export default TitleCards
