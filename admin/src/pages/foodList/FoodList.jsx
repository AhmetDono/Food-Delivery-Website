import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import FoodTable from "../../components/foodTable/FoodTable"

const FoodList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <FoodTable/>
      </div>
    </div>
  )
}

export default FoodList