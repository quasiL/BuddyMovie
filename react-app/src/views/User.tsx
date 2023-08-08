import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "@/axios-client";
import {motion} from "framer-motion";
import Errors from "@/shared/Errors";
import {AtSymbolIcon} from "@heroicons/react/24/solid";
//@ts-ignore
import DefaultAvatar from "@/assets/User.png";
//@ts-ignore
import FacebookIcon from "@/assets/FacebookIcon.svg";
//@ts-ignore
import TwitterIcon from "@/assets/TwitterIcon.svg";
//@ts-ignore
import DiscordIcon from "@/assets/DiscordIcon.svg";
import {UserAbout} from "@/shared/types";

const User = () => {

  const {number} = useParams();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState<string>("");
  const [about, setAbout] = useState<UserAbout>(Object);
  const [isFriend, setIsFriend] = useState<boolean>(false);

  useEffect(() => {
    axiosClient.get("/user/user-number")
      .then(({data}) => {
        setUser(data);
      })
      .catch(function () {
        setErrors({0: "Server didn't respond"});
      });
  }, []);

  useEffect(() => {
    if (user != "") {
      axiosClient.get(`/user/friends/${user}`)
        .then(({data}) => {
          if (data.indexOf(number) !== -1) {
            setIsFriend(true);
          }
        })
        .catch(function () {
          setErrors({0: "Server didn't respond"});
        });
    }
  }, [user]);

  useEffect(() => {
    axiosClient.get(`/user/get-about/${number}`)
      .then(({data}) => {
        setAbout(data);
      })
      .catch(function () {
        setErrors({0: "Server didn't respond"});
      });
  }, [isFriend]);

  return (isFriend &&
    <div className="my-20 pt-6 mx-auto md:w-3/6 xs:w-11/12">
      {errors && <Errors errors={errors}/>}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.5}}
        transition={{duration: 0.5}}
        variants={{
          hidden: {opacity: 0, x: -50},
          visible: {opacity: 1, x: 0},
        }}
        className="border-2 border-gray-500 px-6"
      >
        <h1 className="text-2xl pt-6">User</h1>
        <div className="flex py-4">
          <img alt="avatar" src={about.avatar ? about.avatar : DefaultAvatar} className="w-1/3"/>
          <h3 className="w-2/3 text-2xl">{about.firstName} {about.lastName}</h3>
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.5}}
        transition={{duration: 0.5}}
        variants={{
          hidden: {opacity: 0, x: -50},
          visible: {opacity: 1, x: 0},
        }}
        className="border-2 border-gray-500 px-6 mt-6"
      >
        <div className="flex items-center gap-2">
          <h1 className="text-2xl pt-4">Contacts</h1>
        </div>
        <div className="flex flex-col gap-3 py-4">
          <div className="flex items-center gap-3">
            <p>{about.about ? about.about : "..."}</p>
          </div>
          {about.publicEmail &&
            <div className="flex items-center gap-3">
              <AtSymbolIcon className="w-8 h-8"/>
              <a className="hover:text-red-400 text-blue-600" href={`mailto:${about.publicEmail}`}>
                {about.publicEmail}</a>
            </div>
          }
          {about.facebook &&
            <div className="flex items-center gap-3">
              <img alt="facebook" src={FacebookIcon} className="w-8 h-8"/>
              <a className="hover:text-red-400 text-blue-600" href={about.facebook}>{about.facebook}</a>
            </div>
          }
          {about.twitter &&
            <div className="flex items-center gap-3">
              <img alt="twitter" src={TwitterIcon} className="w-8 h-8"/>
              <a className="hover:text-red-400 text-blue-600" href={about.twitter}>{about.twitter}</a>
            </div>
          }
          {about.discord &&
            <div className="flex items-center gap-3">
              <img alt="discord" src={DiscordIcon} className="w-8 h-8"/>
              <a className="hover:text-red-400 text-blue-600" href={about.discord}>{about.discord}</a>
            </div>
          }
        </div>
      </motion.div>
    </div>
  );
};

export default User;