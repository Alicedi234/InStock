import "./WarehouseTable.scss";
import { Link } from "react-router-dom";

export default function WarehouseTable({
  warehouses,
  setIsOpen,
  setPage,
  setWarehouse,
}) {
  const sortSvg = (
    <svg className="warehouse-titles__sort" viewBox="0 0 24 24">
      <path d="M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z" />
    </svg>
  );
  return (
    <div className="warehouse-table">
      <div className="warehouse-titles">
        <div className="warehouse-titles__left">
          <h3 className="warehouse-titles__title">Warehouse {sortSvg}</h3>
          <h3 className="warehouse-titles__title warehouse-titles__title--address">
            Address {sortSvg}
          </h3>
        </div>
        <div className="warehouse-titles__right">
          <h3 className="warehouse-titles__title">Contact Name {sortSvg}</h3>
          <h3 className="warehouse-titles__title warehouse-titles__title--contact">
            {" "}
            Contact Information {sortSvg}
          </h3>
        </div>
        <h3 className="warehouse-titles__title warehouse-titles__title--actions">
          {" "}
          Actions{" "}
        </h3>
      </div>

      {warehouses.map((warehouse) => (
        <div key={warehouse.id}>
          <div className="warehouse-table__block">
            <div className="warehouse-table__content">
              <div className="warehouse-table__left">
                <div className="warehouse-table__warehouse">
                  <h3 className="warehouse-table__title">Warehouse</h3>
                  <Link to={`/warehouses/${warehouse.id}`}>
                    <p className="warehouse-table__name">
                      {warehouse.warehouse_name}{" "}
                      <svg
                        className="warehouse-table__arrow"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.99997 6L8.58997 7.41L13.17 12L8.58997 16.59L9.99997 18L16 12L9.99997 6Z"
                          fill="#2E66E6"
                        />
                      </svg>
                    </p>
                  </Link>
                </div>
                <div className="warehouse-table__location">
                  <h3 className="warehouse-table__title">Address</h3>
                  <p className="warehouse-table__text warehouse-table__text--address">
                    {warehouse.address}, {warehouse.city}, {warehouse.country}
                  </p>
                </div>
              </div>
              <div className="warehouse-table__right">
                <div className="warehouse-table__info">
                  <h3 className="warehouse-table__title">Contact Name</h3>
                  <p className="warehouse-table__text">
                    {warehouse.contact_name}
                  </p>
                </div>
                <div className="warehouse-table__contact">
                  <h3 className="warehouse-table__title warehouse-table__title--spacing">
                    Contact Information
                  </h3>
                  <p className="warehouse-table__text warehouse-table__text--contact">
                    {warehouse.contact_phone}
                  </p>
                  <p className="warehouse-table__text warehouse-table__text--contact">
                    {warehouse.contact_email}
                  </p>
                </div>
              </div>
            </div>
            <div className="warehouse-table__buttons">
              <svg
                className="warehouse-table__delete"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  setPage("warehouse");
                  setWarehouse(warehouse);
                }}
                viewBox="0 0 24 24"
              >
                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" />
              </svg>
              <Link
                className="warehouse-table__link"
                to={`/warehouses/${warehouse.id}/edit`}
              >
                <svg className="warehouse-table__edit " viewBox="0 0 24 24">
                  <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
