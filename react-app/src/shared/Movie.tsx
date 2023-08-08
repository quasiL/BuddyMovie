import {MovieInfo} from "@/shared/types";
import {motion} from "framer-motion";

type Props = {
  movieInfo: MovieInfo
}

const Movie = ({movieInfo}: Props) => {

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.5}}
      transition={{duration: 0.3}}
      variants={{
        hidden: {opacity: 0, x: -20},
        visible: {opacity: 1, x: 0},
      }}
      className="flex gap-4 pb-2"
    >
      <img
        className="xs:min-h-48 xs:h-48 xs:w-48 xs:min-w-48 md:w-48 md:min-w-48 md:h-auto md:min-h-h-auto object-cover"
        src={movieInfo.poster} alt="poster"/>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl">{movieInfo.title} ({movieInfo.year})</h1>
        <p>Director: {movieInfo.director}</p>
        <p>Genre: {movieInfo.genre}</p>
        <p>{movieInfo.plot}</p>
      </div>
    </motion.div>
  );
};

export default Movie;