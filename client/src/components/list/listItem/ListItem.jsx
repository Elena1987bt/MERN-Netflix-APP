import { useState, useEffect } from 'react';
import { API } from '../../../auth/apiCalls';
import { Link } from 'react-router-dom';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import './listItem.scss';

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await API.get(`/movie/find/${item}`, {
          headers: {
            authorization:
              'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to={{ pathname: '/watch', movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.img} alt="" />
        {isHovered && (
          <>
            <video src={movie?.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayCircleFilledWhiteOutlinedIcon className="icon" />
                <AddCircleOutlineOutlinedIcon className="icon" />
                <ThumbUpAltOutlinedIcon className="icon" />
                <ThumbDownAltOutlinedIcon className="icon" />
              </div>
              <p>{movie?.title}</p>
              <div className="itemInfoTop">
                <span>{movie?.duration} hours</span>
                <span className="limit">+{movie?.limit}</span>
                <span>{movie?.year}</span>
              </div>
              <div className="desc">{`${movie?.desc.substring(
                0,
                180
              )}...`}</div>
              <div className="genre">{movie?.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
