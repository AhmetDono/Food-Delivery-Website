import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import {publicRequest} from "../../requestMethods"
import { Link } from "react-router-dom";

const Home = () => {
  const [aggregationResult, setAggregationResult] = useState([]);
  const [count,setCount] = useState("");
  const [prevCount,setPrevCount] = useState("");

  const [monthlyOrderAggregation, setMonthlyOrderAggregation] = useState([]);
  const [monthlyOrder,setMonthlyOrder]= useState("");
  const [prevMonthlyOrder,setPrevMonthlyOrder]= useState("");

  const [monthlyIncomeAggregation, setMonthlyIncomeAggregation] = useState([]);
  const [monthlyIncome,setMonthlyIncome]= useState("");
  const [prevMonthlyIncome,setPrevMonthlyIncome]= useState("");

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

  //! Order Count
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicRequest.get("order/getMonthlyOrderCount"); // API rotasının yolunu buraya ekleyin
        setMonthlyOrderAggregation(response.data); // Gelen verileri bileşen durumuna kaydedin
      } catch (error) {
        console.error("API hatası:", error);
      }
    };
    fetchData(); // Verileri çekmek için fetchData fonksiyonunu çağırın
  }, []);

  //! Total Count
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicRequest.get("order/getMonthlyTotalIncome"); // API rotasının yolunu buraya ekleyin
        setMonthlyIncomeAggregation(response.data); // Gelen verileri bileşen durumuna kaydedin
      } catch (error) {
        console.error("API hatası:", error);
      }
    };
    fetchData(); // Verileri çekmek için fetchData fonksiyonunu çağırın
  }, []);

  //! user count duzenleme
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
  }, [aggregationResult,count]);

  //! Total Income Count Düzenleme
  useEffect(() => {
    if (monthlyIncomeAggregation.length >= 2) {
      const currentMonth = monthlyIncomeAggregation[0].total;
      const prevMonth = monthlyIncomeAggregation[1].total;
      const totalPrev = prevMonth === 0 ? 0 : parseFloat(((currentMonth / prevMonth - 1) * 100).toFixed(1));

      setMonthlyIncome(currentMonth);
      setPrevMonthlyIncome(totalPrev);
    }
  }, [monthlyIncomeAggregation]);

  //! Monthly Order Count Düzenleme
  useEffect(() => {
    if (monthlyOrderAggregation.length >= 2) {
      const currentMonth = monthlyOrderAggregation[0].orderCount;
      const prevMonth = monthlyOrderAggregation[1].orderCount;
      const orderPrev = prevMonth === 0 ? 0 : parseFloat(((currentMonth / prevMonth - 1) * 100).toFixed(1));

      setMonthlyOrder(currentMonth);
      setPrevMonthlyOrder(orderPrev);
    }
  }, [monthlyOrderAggregation]);


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
            <Widget type="order" amount={monthlyOrder} diff={prevMonthlyOrder}/>
          </Link>
          <Link to={"/orders"} style={{ textDecoration: "none" }}>
            <Widget type="earning" amount={monthlyIncome} diff={prevMonthlyIncome}/>
          </Link>
        </div>
        <div className="charts">
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
