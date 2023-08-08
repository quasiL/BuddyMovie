import axiosClient from "@/axios-client.js";
import {useState, useEffect} from "react";
import FindMovies from "@/shared/FindMovies";
import Errors from "@/shared/Errors";
import {UpdateOfferRequest} from "@/shared/types";

const CreateOffer = () => {

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState("");

  useEffect(() => {
    document.title = "Create a new movie offer | BuddyMovie";
    return () => {
      document.title = "BuddyMovie";
    };
  }, []);

  useEffect(() => {
    axiosClient.get("/user/user-number")
      .then(({data}) => {
        setUser(data);
      })
      .catch(function () {
        setErrors({0: "Server didn't respond"});
      });
  }, []);

  return (
    <div className="my-20 pt-6 mx-auto md:w-3/6 xs:w-11/12">
      {errors && <Errors errors={errors}/>}
      <FindMovies isNew={true} requestPayload={{userNumber: user} as UpdateOfferRequest}/>
    </div>
  );
};

export default CreateOffer;