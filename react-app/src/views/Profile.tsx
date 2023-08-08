import {MutableRefObject, useEffect, useRef, useState} from "react";
import axiosClient from "@/axios-client";
import {UserAbout} from "@/shared/types";
import {PencilSquareIcon, AtSymbolIcon} from "@heroicons/react/24/solid";
//@ts-ignore
import User from "@/assets/User.png";
//@ts-ignore
import FacebookIcon from "@/assets/FacebookIcon.svg";
//@ts-ignore
import TwitterIcon from "@/assets/TwitterIcon.svg";
//@ts-ignore
import DiscordIcon from "@/assets/DiscordIcon.svg";
import Errors from "@/shared/Errors";
import {motion} from "framer-motion";

const Profile = () => {

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState<string>("");
  const [about, setAbout] = useState<UserAbout>(Object);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [friends, setFriends] = useState<string[]>([]);

  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const textAreaRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const facebookRef = useRef() as MutableRefObject<HTMLInputElement>;
  const twitterRef = useRef() as MutableRefObject<HTMLInputElement>;
  const discordRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    document.title = "Your profile | BuddyMovie";
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

  useEffect(() => {
    if (user != "") {
      axiosClient.get(`/user/get-about/${user}`)
        .then(({data}) => {
          setAbout(data);
        })
        .catch(function () {
          setErrors({0: "Server didn't respond"});
        });
      axiosClient.get(`/user/friends/${user}`)
        .then(({data}) => {
          setFriends(data);
        })
        .catch(function () {
          setErrors({0: "Server didn't respond"});
        });
    }
  }, [user, about]);

  const handleAboutUpdate = () => {
    const payload = {
      userNumber: user,
      about: textAreaRef.current?.value ? textAreaRef.current?.value : null,
      publicEmail: emailRef.current?.value ? emailRef.current?.value : null,
      discord: discordRef.current?.value ? discordRef.current?.value : null,
      facebook: facebookRef.current?.value ? facebookRef.current?.value : null,
      twitter: twitterRef.current?.value ? twitterRef.current?.value : null
    } as UserAbout;
    axiosClient.put("/user/update-about", payload)
      .then(({data}) => {
        console.log(data);
      })
      .catch(function (error) {
        if ("response" in error) {
          setErrors(error.response.data);
        } else {
          setErrors({0: "Server didn't respond"});
        }
      });
    setEditMode(false);
  };

  return (
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
        <h1 className="text-2xl pt-6">Your profile</h1>
        <div className="flex py-4">
          <img alt="avatar" src={about.avatar ? about.avatar : User} className="w-1/3"/>
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
          <PencilSquareIcon className="h-6 w-6 hover:text-red-400 cursor-pointer"
                            onClick={() => setEditMode(true)}/>
        </div>
        <p className="xs:text-xs md:text-sm">Your friends can see this information</p>

        <div className="flex flex-col gap-3 py-4">
          <div className="flex items-center gap-3">
            {editMode ? <textarea ref={textAreaRef} placeholder="Tell your friends about yourself"
                               defaultValue={about.about ? about.about : ""}
                               className="border-2 border-gray-500 w-3/4 h-24 pl-2
                               focus:outline-none focus:border-red-600"/>
              : <p>{about.about ? about.about : "Tell your friends about yourself"}</p>}
          </div>
          {(about.publicEmail || editMode) &&
            <div className="flex items-center gap-3">
              <AtSymbolIcon className="w-8 h-8"/>
              {editMode ? <input ref={emailRef} type="email" placeholder="Email" defaultValue={about.publicEmail}
                                 className="border-2 border-gray-500 w-2/3 h-8 pl-2
                               focus:outline-none focus:border-red-600"/>
                : <a className="hover:text-red-400 text-blue-600" href={`mailto:${about.publicEmail}`}>
                  {about.publicEmail}</a>}
            </div>
          }
          {(about.facebook || editMode) &&
            <div className="flex items-center gap-3">
              <img alt="facebook" src={FacebookIcon} className="w-8 h-8"/>
              {editMode ? <input ref={facebookRef} type="text" placeholder="Facebook" defaultValue={about.facebook}
                                 className="border-2 border-gray-500 w-2/3 h-8 pl-2
                               focus:outline-none focus:border-red-600"/>
              : <a className="hover:text-red-400 text-blue-600" href={about.facebook}>{about.facebook}</a>}
            </div>
          }
          {(about.twitter || editMode) &&
            <div className="flex items-center gap-3">
              <img alt="twitter" src={TwitterIcon} className="w-8 h-8"/>
              {editMode ? <input ref={twitterRef} type="text" placeholder="Twitter" defaultValue={about.twitter}
                                 className="border-2 border-gray-500 w-2/3 h-8 pl-2
                               focus:outline-none focus:border-red-600"/>
              : <a className="hover:text-red-400 text-blue-600" href={about.twitter}>{about.twitter}</a>}
            </div>
          }
          {(about.discord || editMode) &&
            <div className="flex items-center gap-3">
              <img alt="discord" src={DiscordIcon} className="w-8 h-8"/>
              {editMode ? <input ref={discordRef} type="text" placeholder="Discord" defaultValue={about.discord}
                                 className="border-2 border-gray-500 w-2/3 h-8 pl-2
                               focus:outline-none focus:border-red-600"/>
              : <a className="hover:text-red-400 text-blue-600" href={about.discord}>{about.discord}</a>}
            </div>
          }
          {editMode &&
            <button onClick={handleAboutUpdate}
                    className="border-2 border-gray-500 w-1/3 h-10 hover:bg-red-400 mt-2">
              Update
            </button>
          }
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
        <h1 className="text-2xl pt-6">Your friends</h1>
        <div className="flex flex-col py-4">
          {friends.map((friend) => (
            <a className="hover:text-red-400 text-blue-600" key={friend} href={`/user/${friend}`}>{friend}</a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;