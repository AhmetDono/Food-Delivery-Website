import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import {publicRequest} from "../../requestMethods"
import { Link } from "react-router-dom";

const Home = () => {
  const [aggregationResult, setAggregationResult] = useState([]);
  const [count,setCount] = useState("");
  const [prevCount,setPrevCount] = useState("");

  //! user Count Info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicRequest.get("user/getMonthlyUserInfo"); // API rotasının yolunu buraya ekleyin
        setAggregationResult(response.data); // Gelen verileri bileşen durumuna kaydedin
      } catch (error) {
        console.error("API hatası:", error);
      }
    };

    fetchData(); // Verileri çekmek için fetchData fonksiyonunu çağırın
  }, []); // Bu etkileşim yalnızca bileşenin monte edilmesi sırasında çalışır

  //! user Count Info
  // Veri geldiğinde durum güncellemelerini yap
  useEffect(() => {
    if (aggregationResult.length > 0) {
      const latestData = aggregationResult[aggregationResult.length - 1];
      setCount(latestData.data[0].count);
      const prev = (latestData.data[0].prevCount);
      if (prev === 0) {
        if (count === 0) {
          setPrevCount(0); // Her ikisi de 0 ise büyüme yüzdesi 0'dır.
        } else {
          setPrevCount(100);// Önceki ay kayıt yoksa ve bu ay kayıt varsa, büyüme yüzdesi 100'dür.
        }
      } else {
        setPrevCount((count / prev - 1) * 100);
      }
    }
  }, [aggregationResult]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Link to={"/users"} style={{ textDecoration: "none" }}>
            <Widget type="user" amount={count} diff={prevCount} />
          </Link>
          <Link to={"/orders"} style={{ textDecoration: "none" }}>
            <Widget type="order" amount={200} diff={20}/>
          </Link>
          <Link to={"/orders"} style={{ textDecoration: "none" }}>
            <Widget type="earning" amount={300} diff={30}/>
          </Link>
          <Link to={"/orders"} style={{ textDecoration: "none" }}>
            <Widget type="balance" amount={400} diff={40}/>
          </Link>
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
