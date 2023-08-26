import React,{useState} from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';



const MoviePage = ({ movie, onClose }) => {


  
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  

  const movieID = doc(db, 'users', `${user?.email}`);


  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert('Please log in to save a movie');
    }
  };
  return (
    <div className='fixed inset-0  flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div className='bg-black shadow-xl drop-shadow-xl shadow-blue-900/50 text-white pb-10 p-4 max-w-7xl rounded-md min-h-[75vh]'>
      <div className="flex justify-between items-center mb-3">
      <p onClick={saveShow}>
          {like ? (
            <FaHeart className=' top-4 left-4 text-gray-300' />
          ) : (
            <FaRegHeart className='top-4 left-4 text-gray-300' />
          )}
        </p>
        <button
          className='flex-end text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          X
        </button>
        </div>
        <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" autoPlay controls  className=' mb-5 w-full object-fit max-h-[70vh]'></video>
        <div className='flex-col'>
        <h2 className='mx-6 text-xl font-semibold mb-2'>{movie.title}</h2>
        <p className='mx-6 font-light text-sm'>{movie.overview}</p>
        </div>
        {/* You can display more movie details here */}
      </div>
    </div>
  );
};

export default MoviePage;
