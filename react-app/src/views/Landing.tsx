import {motion} from "framer-motion";
import {Link} from "react-router-dom";

const Landing = () => {

  return (
    <div className="my-20 pt-24 mx-auto md:w-3/6 xs:w-11/12 flex flex-col gap-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.5}}
        transition={{duration: 0.5}}
        variants={{
          hidden: {opacity: 0, x: -50},
          visible: {opacity: 1, x: 0},
        }}
        className="p-6"
      >
        <h1 className="text-3xl text-black text-center font-bold">Introducing BuddyMovie</h1>
        <h1 className="text-3xl text-black text-center font-bold">Your Gateway to Cinematic Connections</h1>
        <p className="text-xl text-justify pt-4">
          Welcome to BuddyMovie, the platform that bridges the gap between movie lovers, creating
          an avenue for unforgettable movie nights and lasting friendships. Are you ready to embark
          on a cinematic journey unlike any other? Dive into a world where movies are not just a form
          of entertainment, but a medium to forge connections, kindle conversations, and foster
          lifelong bonds.
        </p>
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
        className="p-6"
      >
        <h1 className="text-3xl text-black text-center font-bold">🎬 Lights, Camera, Action: Create Offers</h1>
        <p className="text-xl text-justify pt-4">
          Imagine having the power to curate your movie marathon, right from the comfort of your own
          virtual theater. BuddyMovie empowers you to create offers, inviting fellow enthusiasts to join
          your cinematic escapade. Craft an intriguing invitation and select three of your favorite films,
          setting the stage for an immersive movie-watching experience.
        </p>
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
        className="p-6"
      >
        <h1 className="text-3xl text-black text-center font-bold">🍿 Anonymity Unleashes Curiosity</h1>
        <p className="text-xl text-justify pt-4">
          Unveil the art of mystery! When you reply to an offer, you'll begin your journey incognito. The
          excitement of not knowing your fellow cinephile's identity adds an air of mystery, making the
          experience all the more exhilarating.
        </p>
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
        className="p-6"
      >
        <h1 className="text-3xl text-black text-center font-bold">🎟️ Accept the Challenge</h1>
        <p className="text-xl text-justify pt-4">
          Once an offer has piqued your interest, you have the chance to step into the spotlight. Select
          three movies that resonate with you, capturing your cinematic preferences. Close the offer
          and let the countdown commence. An exciting adventure awaits as you embark on a shared
          cinematic voyage.
        </p>
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
        className="p-6"
      >
        <h1 className="text-3xl text-black text-center font-bold">⏳ Time to Watch and Rate</h1>
        <p className="text-xl text-justify pt-4">
          As the countdown ticks away, you'll immerse yourself in the movies chosen by your Buddy.
          Watch and appreciate each film, casting your vote with ratings that reflect your thoughts.
          The shared film-viewing experience becomes a catalyst for conversation, sparking
          discussions and connections that go beyond the screen.
        </p>
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
        className="p-6 flex flex-col items-center"
      >
        <h1 className="text-3xl text-black text-center font-bold">🤝 Unveil the Magic</h1>
        <p className="text-xl text-justify pt-4">
          When the timer reaches its finale and all movies have been watched and rated, the curtains
          rise to reveal the creators behind the offers. An enriching experience awaits as you explore
          each other's profiles, learning more about your Buddy's interests and passions. Connect on a
          deeper level and add each other to your circle of friends.
        </p>
        <button
          className="mt-6 border-2 border-gray-500 w-1/3 h-10 hover:bg-red-400 mt-2"
        ><Link to="/signup">Sign up</Link></button>
      </motion.div>
    </div>
  );
};

export default Landing;