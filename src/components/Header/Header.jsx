import "./Header.scss";
import logo from "./../../assets/Logo/InStock-Logo_1x.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Footer({ activeButton, setActiveButton }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/inventories")) {
      setActiveButton("inventory");
    } else if (location.pathname.startsWith("/warehouses")) {
      setActiveButton("warehouses");
    }
  }, [location, setActiveButton]);

  const switchRoute = (button) => {
    setActiveButton(button);
    navigate(button === "warehouses" ? "/warehouses" : "/inventories");
  };

  return (
    <header className="header">
      <div className="header__container">
        <img src={logo} className="header__logo" />
        <div className="header__buttons">
          <button
            className={`header__button ${
              activeButton === "warehouses" ? "header__button--active" : ""
            } `}
            onClick={() => switchRoute("warehouses")}
          >
            Warehouses
          </button>
          <button
            className={`header__button ${
              activeButton === "inventory" ? "header__button--active" : ""
            } `}
            onClick={() => switchRoute("inventory")}
          >
            Inventory
          </button>
        </div>
      </div>
    </header>
  );
}
