import React, { FC, useState, useEffect } from "react";
import { FilmsType } from "../../types/films";
import CloseIcon from "@mui/icons-material/Close";
import { FilmsToOrderType } from "../../types/filmToOrder";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface OrderProps {
  orderType: string;
  orderDisp: string;
  setOrderDisp: CallableFunction;
}

const Order: FC<OrderProps> = ({ orderType, orderDisp, setOrderDisp }) => {
  const [daySelected, setDaySeleted] = useState<string>();
  const [films, setFilms] = useState<FilmsType[]>();
  const [filmsList, setFilmsList] = useState<any[]>([]);
  const [filterdFilms, setFilterdFilms] = useState<FilmsType[]>();
  const [filmsByDay, setFilmsByDay] = useState<FilmsType>();
  const [option, setOption] = useState<string>();
  const navigate = useNavigate();

  const handleClick = async (ev: any) => {
    try {
      navigate(`/order/${ev.target.value}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDay = async () => {
    try {
      const { data } = await axios.get(`/api/screening/${daySelected}`);
      console.log(data);
      setFilmsList(data.screeningsDB);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleDay();
  }, [daySelected]);

  return (
    <div className={orderType} style={{ display: orderDisp }}>
      {orderType == "navBarOrder" ? (
        <CloseIcon
          className={`${orderType}__close`}
          onClick={() => setOrderDisp("none")}
        />
      ) : (
        <></>
      )}
      <form className={`${orderType}__form`}>
        <div className="form__select">
          {orderType == "homeOrder" ? <h1>Order a ticket</h1> : <></>}
          <select
            value={daySelected}
            onChange={(ev) => {
              setDaySeleted(ev.target.value);
            }}
            className="form__dayOption__select"
          >
            <option value={""}>Day</option>
            <option value={"Sunday"}>sunday</option>
            <option value={"Monday"}>monday</option>
            <option value={"Tuesday"}>Tuesday</option>
            <option value={"Wednesday"}>Wednesday</option>
            <option value={"Thursday"}>Thursday</option>
            <option value={"Friday"}>Friday</option>
            <option value={"Saturday"}>Saturday</option>
          </select>
          <div>
            <h3>Select film:</h3>
            {filmsList.length > 0 ? (
              <div style={{ overflowY: "scroll" }}>
                {filmsList.map((screening) => {
                  return (
                    <div>
                      <h3>{screening.filmId.title}</h3>
                      <h5>time: {screening.time}</h5>
                      <button onClick={handleClick} value={screening._id}>
                        ORDER NOW
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>Nope</div>
            )}
          </div>
        </div>
        <div className="form__films">
          <div className="form__films__list"></div>
          <div className="form__films__pic"></div>
        </div>
      </form>
    </div>
  );
};

export default Order;
