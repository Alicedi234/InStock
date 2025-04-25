import "./styles/partials/_global.scss";
import "./App.scss";
import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./Components/Footer/Footer";

import InventoryHomePage from "./pages/InventoryHomePage/InventoryHomePage";
import InventoryAddNewPage from "./pages/InventoryAddNewPage/InventoryAddNewPage";
import InventoryDetailPage from "./pages/InventoryDetailPage/InventoryDetailPage";
import InventoryEditPage from "./pages/InventoryEditPage/InventoryEditPage";

import WarehouseHomePage from "./pages/WarehouseHomePage/WarehouseHomePage";
import WarehouseAddNewPage from "./pages/WarehouseAddNewPage/WarehouseAddNewPage";
import WarehouseDetailPage from "./pages/WarehouseDetailPage/WarehouseDetailPage";
import WarehouseEditPage from "./pages/WarehouseEditpage/WarehouseEditPage";
import DeleteModal from "./components/DeleteModal/DeleteModal";

function App() {
  const [activeButton, setActiveButton] = useState("warehouses");
  const [isOpen, setIsOpen] = useState(false);
  const [inventory, setInventory] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [page, setPage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <BrowserRouter>
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        page={page}
        inventory={inventory}
        warehouse={warehouse}
      />{" "}
      <Header activeButton={activeButton} setActiveButton={setActiveButton} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/warehouses" />} />
          <Route
            path="/warehouses"
            element={
              <WarehouseHomePage
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setPage={setPage}
                setWarehouse={setWarehouse}
              />
            }
          />
          <Route path="/warehouses/new" element={<WarehouseAddNewPage />} />
          <Route
            path="/warehouses/:warehouseId"
            element={
              <WarehouseDetailPage
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setPage={setPage}
                setInventory={setInventory}
              />
            }
          />
          <Route
            path="/warehouses/:warehouseId/edit"
            element={<WarehouseEditPage />}
          />
          <Route
            path="/inventories"
            element={
              <InventoryHomePage
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setPage={setPage}
                setInventory={setInventory}
              />
            }
          />
          <Route path="/inventories/new" element={<InventoryAddNewPage />} />
          <Route
            path="/inventories/:itemId"
            element={<InventoryDetailPage />}
          />
          <Route
            path="/inventories/:itemId/edit"
            element={<InventoryEditPage />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
