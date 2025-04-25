import "./WarehouseHomePage.scss";
import "../../components/WarehouseTable/WarehouseTable.jsx";
import WarehouseTable from "../../components/WarehouseTable/WarehouseTable.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WarehouseHomePage({
  isOpen,
  setIsOpen,
  setWarehouse,
  setPage,
}) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const getWarehouses = async () => {
      const response = await axios.get(`${baseUrl}/warehouses`);
      setWarehouses(response.data);
    };
    getWarehouses();
  }, [isOpen]);

  if (!warehouses.length) {
    return <>Loading Warehouses....</>;
  }

  return (
    <div className="warehouses">
      <div className="warehouses__top">
        <h1 className="warehouses__title">Warehouses</h1>
        <div className="warehouses__actions">
          <div className="warehouses-searchbar">
            <input
              className="warehouses-searchbar__input"
              type="text"
              placeholder="Search..."
            />
            <svg className="warehouses-searchbar__icon" viewBox="0 0 24 24">
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14V14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="#5C667E"
              />
            </svg>
          </div>
          <Link to="/warehouses/new" className="warehouses__add-new">
            + Add New Warehouse
          </Link>
        </div>
      </div>
      <div className="warehouses__list">
        <WarehouseTable
          warehouses={warehouses}
          setIsOpen={setIsOpen}
          setWarehouse={setWarehouse}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
