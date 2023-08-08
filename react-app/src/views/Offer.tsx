import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "@/axios-client";
import {ApiResponse, MovieInfo, OfferResponse, UpdateOfferRequest} from "@/shared/types";
import axios from "axios";
import Movie from "@/shared/Movie";
import FindMovies from "@/shared/FindMovies";
import Errors from "@/shared/Errors";
import Rate from "@/shared/Rate";
import CountdownTimer from "@/shared/CountdownTimer";

const apiUrl = import.meta.env.VITE_APP_O_MDB_API_URL;
const apiKey = import.meta.env.VITE_APP_O_MDB_API_KEY;

const Offer = () => {

  const {number} = useParams();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState<string>("");
  const [offer, setOffer] = useState<OfferResponse>(Object);
  const [movies, setMovies] = useState({});

  useEffect(() => {
    axiosClient.get(`/user/offers/${number}`)
      .then(({data}) => {
        setOffer(data);
        data.movies.map((movie) => {
          axios.get(apiUrl + "/?i=" + movie.apiLink + "&apikey=" + apiKey)
            .then((response) => {
              let apiData = response.data as ApiResponse;
              setMovies(prevMovies => {
                const updatedMovies = {...prevMovies};
                updatedMovies[movie.movieNumber] = {
                  poster: apiData.Poster,
                  title: apiData.Title,
                  year: apiData.Year,
                  director: apiData.Director,
                  genre: apiData.Genre,
                  plot: apiData.Plot,
                  rating: movie.rating,
                  isViewed: movie.isViewed,
                  isCreatorMovie: movie.isCreatorMovie,
                  movieNumber: movie.movieNumber
                } as MovieInfo;
                return updatedMovies;
              });
            })
            .catch(error => {
              console.error(error);
            });
        })
      })
      .catch(function () {
        setErrors({0: "Server didn't respond"});
      });

    axiosClient.get("/user/user-number")
      .then(({data}) => {
        setUser(data);
      })
      .catch(function () {
        setErrors({0: "Server didn't respond"});
      });
  }, []);

  const addFriend = () => {
    axiosClient.post("/user/add-friend", {
      userNumber: user,
      friendNumber: offer.creator != user ? offer.creator : offer.applicant
    })
      .then(({data}) => {
        console.log(data);
      })
      .catch(function () {
        setErrors({0: "Server didn't respond"});
      });
  }

  const flex = "flex flex-col";

  return (
    <div className="flex flex-col gap-4 my-20 mx-auto xs:w-11/12 md:w-3/6 pt-6">
      <div>{errors && <Errors errors={errors}/>}</div>
      {/* OFFER INFO */}
      <div className="border-2 border-gray-500 py-6">
        <div className={`${flex} px-6 gap-4`}>
          <h1 className="text-2xl">Offer {number}</h1>
          {offer.endTime && <CountdownTimer targetDate={offer.endTime}/>}
          {!offer.endTime && <h2>When someone responds to this offer, the timer will start counting down</h2>}
          {!offer.isOpened && <button onClick={addFriend}
                                      className="border-2 border-gray-500 w-48 h-10 hover:bg-red-400">Add as Friend
          </button>}
        </div>
      </div>
      {/* CREATOR MOVIES */}
      <div className="border-2 border-gray-500 py-6 px-6">
        {Object.keys(movies).map((key) => {
          if (movies[key].isCreatorMovie) {
            return (
              <div className="pb-6">
                <Movie key={key} movieInfo={movies[key]}/>
                {!offer.isActive && offer.creator != user &&
                  <Rate movieNumber={movies[key].movieNumber} isViewed={movies[key].isViewed}
                        currentRating={movies[key].rating}/>
                }
              </div>
            )
          }
        })}
      </div>
      {/* APPLICANT MOVIES */}
      {!offer.isActive &&
        <div className="border-2 border-gray-500 py-6 px-6">
          {Object.keys(movies).map((key) => {
            if (!movies[key].isCreatorMovie) {
              return (
                <div>
                  <Movie key={key} movieInfo={movies[key]}/>
                  {!offer.isActive && offer.creator == user &&
                    <Rate movieNumber={movies[key].movieNumber} isViewed={movies[key].isViewed}
                          currentRating={movies[key].rating}/>
                  }
                </div>
              )
            }
          })}
        </div>
      }
      {/* ADD MOVIES */}
      {offer.isActive && offer.creator != user &&
        <div className="w-full mb-12">
          <FindMovies
            isNew={false}
            requestPayload={{userNumber: user, offerNumber: offer.offerNumber} as UpdateOfferRequest}
          />
        </div>
      }
    </div>
  );
};

export default Offer;