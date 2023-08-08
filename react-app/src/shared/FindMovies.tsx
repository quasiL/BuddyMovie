import axios from 'axios';
import axiosClient from "@/axios-client";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Movie from "@/shared/Movie";
import {CreateOfferRequest, UpdateOfferRequest} from "@/shared/types";
import {XMarkIcon} from "@heroicons/react/24/solid";

const apiUrl = import.meta.env.VITE_APP_O_MDB_API_URL;
const apiKey = import.meta.env.VITE_APP_O_MDB_API_KEY;

type Props = {
  isNew: boolean;
  requestPayload: UpdateOfferRequest;
}

const FindMovies = ({isNew, requestPayload}: Props) => {

  const [dropdownOptions, setDropdownOptions] = useState({});
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [chosenMovies, setChosenMovies] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (currentInputValue === "") {
      setDropdownOptions({});
    }
  }, [currentInputValue]);

  const handleChange = (event) => {
    event.preventDefault();
    setCurrentInputValue(event.target.value);
    sendApiRequest(event.target.value);
  };

  const handleOptionClick = (option) => {
    Object.keys(dropdownOptions).forEach((key) => {
      if (dropdownOptions[key].Title + " " + dropdownOptions[key].Year === option.target.innerHTML) {
        chosenMovies[key] = dropdownOptions[key];
        setChosenMovies(chosenMovies);
        setCurrentInputValue("");
        return;
      }
    })
  };

  const sendApiRequest = (value) => {
    if (value === "" || Object.keys(chosenMovies).length === 3) {
      setDropdownOptions({});
      return;
    }
    axios.get(apiUrl + "/?t=" + value + "&apikey=" + apiKey, {
      params: {
        search: value
      }
    })
      .then(response => {
        if (response.data.Response === "False") {
          return;
        }
        let id = response.data.imdbID;
        dropdownOptions[id] = response.data;
        setDropdownOptions(dropdownOptions);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    if (isNew) {
      const payload: CreateOfferRequest = {
        userNumber: requestPayload.userNumber,
        movies: Object.keys(chosenMovies)
      };
      axiosClient.post("/user/create", payload)
        .then(({data}) => {
          navigate(`/offers/${data}`);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      const payload = {
        userNumber: requestPayload.userNumber,
        offerNumber: requestPayload.offerNumber,
        movies: Object.keys(chosenMovies)
      };
      axiosClient.put("/user/apply", payload)
        .then(() => {
          location.reload();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const inputStyle = "border-2 border-gray-500 w-full h-10 pl-2 focus:outline-none focus:border-red-600";
  const flexBetween = "flex gap-4";
  const flex = "flex flex-col";

  return (
    <div className="border-2 border-gray-500 py-6">
      <div className={`${flex} px-6 gap-4`}>
        <h1 className="text-2xl">
          {isNew ? "Create new offer" : "Add your movies"}
          <p className="xs:text-xs md:text-sm">
            If the movie you want doesn't appear in the dropdown menu, try entering the name of the movie
            and adding a space at the end
          </p>
        </h1>
        <div className={`${flex} items-center justify-between gap-2`}>
          {Object.keys(chosenMovies).map((key) => (
            <div className={`${flexBetween}`}>
              <Movie key={key} movieInfo={{
                poster: chosenMovies[key].Poster,
                title: chosenMovies[key].Title,
                year: chosenMovies[key].Year,
                director: chosenMovies[key].Director,
                genre: chosenMovies[key].Genre,
                plot: chosenMovies[key].Plot
              }}
              />
              <p>
                <button onClick={() => {
                  setChosenMovies(prevMovies => {
                    const updatedMovies = {...prevMovies};
                    delete updatedMovies[key];
                    return updatedMovies;
                  });
                }}><XMarkIcon className="h-6 w-6 text-black hover:text-red-400"/>
                </button>
              </p>
            </div>
          ))}
        </div>
        {/* INPUT WITH DROPDOWN MOVIES MENU */}
        {Object.keys(chosenMovies).length < 3 &&
          <div>
            <input value={currentInputValue}
                   onChange={handleChange}
                   type="text"
                   placeholder="Type movie title"
                   className={inputStyle}
            />
            <div className="absolute z-30 bg-red-200 w-auto">
              <ul className="divide-y divide-light-blue-400">
                {Object.keys(dropdownOptions).map((key) => (
                  <li
                    className="hover:bg-red-400 cursor-pointer pt-2 px-3 h-10"
                    onClick={handleOptionClick}
                    key={key}
                    dangerouslySetInnerHTML={{__html: `${dropdownOptions[key].Title} ${dropdownOptions[key].Year}`}}
                  />
                ))}
              </ul>
            </div>
          </div>
        }
        {/* SUBMIT BUTTON */}
        {Object.keys(chosenMovies).length === 3 &&
          <div className="pt-2">
            <button onClick={handleSubmit}
                    className="border-2 border-gray-500 w-48 h-10 hover:bg-red-400">Send
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default FindMovies;