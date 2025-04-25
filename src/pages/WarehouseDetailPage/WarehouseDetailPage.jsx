import "./WarehouseDetailPage.scss";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";

export default function WarehouseDetailPage({
  isOpen,
  setIsOpen,
  setPage,
  setInventory,
}) {
  return (
    <WarehouseDetails
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setPage={setPage}
      setInventory={setInventory}
    />
  );
}
