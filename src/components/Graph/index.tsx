import { format, fromUnixTime } from "date-fns";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./styles.css";

interface GraphProps {
  investedAmount: string;
  historicalData: any[] | null;
}

export function Graph({ investedAmount, historicalData }: GraphProps) {
  const dataArray = [];

  if (!historicalData) {
    historicalData = [];
  }

  for (const iterator of historicalData) {
    const coinPrice = iterator["close"];
    const date = format(new Date(fromUnixTime(iterator["time"])), "dd/MM/yyyy");

    dataArray.push({
      coinPrice,
      date,
    });
  }

  return (
    <div>
      <ResponsiveContainer height={250}>
        <AreaChart data={dataArray} className="graph">
          <XAxis dataKey={"date"} />
          <YAxis orientation={"left"} />
          <Tooltip
            contentStyle={styles.tooltipWrapper}
            itemStyle={styles.itemStyle}
            labelStyle={styles.labelStyle}
            formatter={(value: any) => `$${value}`}
          />
          <Area
            cursor={"pointer"}
            dataKey="coinPrice"
            stroke="#083d16"
            fillOpacity={0.3}
            fill="#17f753"
            type="natural"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "0 auto",
  },
  tooltipWrapper: {
    background: "#444444",
    border: "none",
  },
  tooltip: {
    color: "#ebebeb",
  },
  itemStyle: {
    color: "#ebebeb",
  },
  labelStyle: {
    color: "#ebebeb",
  },
};
