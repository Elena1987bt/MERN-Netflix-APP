import { Link, useLocation } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import './watch.scss';

const Watch = () => {
  const location = useLocation();
  const movie = location?.movie;
  console.log(movie);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlinedIcon />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress controls src={movie?.video} />
    </div>
  );
};

export default Watch;
