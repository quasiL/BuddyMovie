import {useEffect, useState} from "react";
import {EyeIcon, StarIcon} from "@heroicons/react/24/solid";
import axiosClient from "@/axios-client";

type Props = {
  movieNumber: string;
  isViewed: boolean;
  currentRating: number | null;
}

const Rate = ({movieNumber, isViewed, currentRating}: Props) => {

  const [rating, setRating] = useState<number | null>(currentRating);
  const [viewed, setViewed] = useState<boolean>(isViewed);

  useEffect(() => {
    if (rating != null) {
      const payload = {
        movieNumber: movieNumber,
        rating: rating
      };
      axiosClient.put("/user/movie/rate", payload)
        .then(({data}) => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [rating]);

  const handleView = () => {
    const payload = {
      movieNumber: movieNumber
    };
    axiosClient.put("/user/movie/view", payload)
      .then(({data}) => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const coloredStar = "text-gray-300 peer peer-hover:text-red-400 hover:text-red-400 h-7 w-7 cursor-pointer";
  const plainStar = "text-red-400 peer peer-hover:text-red-400 hover:text-red-400 h-7 w-7 cursor-pointer";
  const coloredEye = "h-6 w-6 text-red-400 cursor-pointer";
  const plainEye = "h-6 w-6 hover:text-red-400 cursor-pointer";

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <p>Viewed</p>
        <EyeIcon className={viewed ? coloredEye : plainEye} onClick={() => {
          if (!viewed) {
            setViewed(true);
            handleView();
          }
        }}/>
      </div>

      {viewed &&
        <div className="flex gap-2 items-center">
          <p>Rating</p>
          <div className="flex flex-row-reverse justify-center">
            <StarIcon
              className={rating < 5 ? coloredStar : plainStar}
              onClick={() => {
                setRating(5);
              }}
            />
            <StarIcon
              className={rating < 4 ? coloredStar : plainStar}
              onClick={() => {
                setRating(4);
              }}
            />
            <StarIcon
              className={rating < 3 ? coloredStar : plainStar}
              onClick={() => {
                setRating(3);
              }}
            />
            <StarIcon
              className={rating < 2 ? coloredStar : plainStar}
              onClick={() => {
                setRating(2);
              }}
            />
            <StarIcon
              className={rating < 1 ? coloredStar : plainStar}
              onClick={() => {
                setRating(1);
              }}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default Rate;