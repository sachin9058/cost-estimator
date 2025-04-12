"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  originalCost: number;
  optimizedCost: number;
}

export default function EstimationPie({ originalCost, optimizedCost }: Props) {
  const data = {
    labels: ["Original Cost", "Optimized Cost"],
    datasets: [
      {
        label: "Cost Comparison",
        data: [originalCost, optimizedCost],
        backgroundColor: ["#FB923C", "#4ADE80"],
        borderColor: ["#F97316", "#22C55E"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow-md border">
      <h3 className="text-center text-lg font-bold mb-4 text-orange-700">
        Cost Comparison
      </h3>
      <Pie data={data} />
    </div>
  );
}
