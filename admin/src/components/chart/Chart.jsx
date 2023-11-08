import { useEffect } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { publicRequest } from "../../requestMethods";
import { useState } from "react";

const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

const Chart = ({ aspect, title }) => {
  const [monthlyIncomeAggregation, setMonthlyIncomeAggregation] = useState([]);
  
  //! Total Count
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicRequest.get("order/getMonthlyTotalIncome");
        setMonthlyIncomeAggregation(response.data);
      } catch (error) {
        console.error("API hatası:", error);
      }
    };
    fetchData();
  }, []);

  const today = new Date();
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);
    return date;
  });

  const formattedData = lastSixMonths.map(month => {
    const monthName = monthNames[month.getMonth()];
    const monthData = monthlyIncomeAggregation.find(data => data._id === month.getMonth() + 1);
    const total = monthData ? monthData.total : 0;
    return { _id: monthName, total };
  });
  formattedData.sort((a, b) => monthNames.indexOf(a._id) - monthNames.indexOf(b._id));

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="_id" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
