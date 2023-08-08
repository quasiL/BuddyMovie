import {useEffect, useState} from "react";
import axiosClient from "@/axios-client";
import Errors from "@/shared/Errors";
import {OfferResponse} from "@/shared/types";
import {Link} from "react-router-dom";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";

const Main = () => {

  const [errors, setErrors] = useState({});
  const [offers, setOffers] = useState<OfferResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPageSize, setMaxPageSize] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    fetchOffers();
  }, [currentPage, pageSize]);

  const fetchOffers = () => {
    axiosClient.get(`/user/active-offers?page=${currentPage}&size=${pageSize}`)
      .then(({data}) => {
        setOffers(data.content);
        setMaxPageSize(data.totalPages);
      })
      .catch(function () {
        setErrors({0: "Server didn't respond"});
      });
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="my-20 pt-6 mx-auto md:w-3/6 xs:w-11/12">
      {errors && <Errors errors={errors}/>}
      {/* LIST OF ACTIVE OFFERS */}
      <ul className="flex flex-col gap-6">
        {Object.keys(offers).map((key) => {
          return (
            <Link key={key} to={`/offers/${offers[key].offerNumber}`}>
              <li
                className="border-2 border-gray-500 flex justify-center items-center h-12 hover:border-red-600
                hover:w-11/12"
              >
                <p>Offer {offers[key].offerNumber}</p>
              </li>
            </Link>
          );
        })}
      </ul>
      {/* SELECTING PAGES */}
      <div className="flex justify-center pt-5">
        {currentPage > 0 &&
          //@ts-ignore
          <ChevronLeftIcon className="h-6 w-6 cursor-pointer" onClick={goToPrevPage} disabled={currentPage === 0}/>
        }
        {currentPage + 1 < maxPageSize &&
          <ChevronRightIcon className="h-6 w-6 cursor-pointer" onClick={goToNextPage}
            //@ts-ignore
                            disabled={offers.length < pageSize}/>
        }
      </div>
    </div>
  );
};

export default Main;