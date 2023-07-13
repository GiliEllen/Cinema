import React, { useState } from "react";
import Cinema from "../../assets/cinema.jpg"
import FilmList from "../../components/FilmList/FilmList";

const Home = () => {
  const [update, setUpdate] = useState<boolean>(false);
  return (
    <div className="home">
      <img
      src={Cinema}
        // src="https://open-stand.org/wp-content/uploads/2016/04/International-Union-of-Cinemas-Calls-for-Open-Standards-in-the-Cinema-Industry.jpg"
        className="home__pic"
      ></img>
      <FilmList setUpdate={setUpdate}/>
    </div>
  );
};

export default Home;
