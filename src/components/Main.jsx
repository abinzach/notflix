import axios from 'axios';
import React, { useEffect, useState } from 'react';
import requests from '../Requests';
import MoviePage from './MoviePage';

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];
  const [selectedMovie, setSelectedMovie] = useState(null);
    const openMoviePage = (movie) => {
      console.log(movie)
      console.log("clicked movie")
    setSelectedMovie(movie);
  };

  const closeMoviePage = () => {
    setSelectedMovie(null);
  };

  /*useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);*/
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(requests.requestPopular);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMovies();
  }, []);
    console.log(movie);
    

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  return (
    <div className='w-full h-[600px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[600px] bg-gradient-to-t from-black '></div>
        <img
          className='-z-10 w-full h-full object-cover'
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className='z-10 absolute w-full top-[40%] p-4 md:p-8'>
          <h1 className='text-4xl md:text-5xl font-bold'>{movie?.title}</h1>
          <div className='my-4'>
            <button onClick={() => openMoviePage(movie)} className='border bg-gray-300 text-black rounded-lg hover:bg-blue-700 hover:text-white hover:border-blue-700 py-2 px-5 transition-all duration-500'>
              Play
            </button>
            <button className='border rounded-lg text-white border-gray-300 py-2 px-5 ml-4  hover:text-blue-700 hover:border-blue-700 transition-all duration-400' >
              Watch Later
            </button>
          </div>
          <p className='text-gray-400 text-sm'>
            Released: {movie?.release_date}
          </p>
          <p className='font-light w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
            {truncateString(movie?.overview, 150)}
          </p>
          
        </div>
        
      </div>
      {selectedMovie && (
        <MoviePage movie={selectedMovie} onClose={closeMoviePage} />
      )}
    
      
    </div>
    
  );
};

export default Main;
