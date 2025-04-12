"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";;
import { PDFReport } from "@/components/Report";

interface Estimation {
  _id: string;
  area:string
  material: string;
  laborHours: string;
  materialCost: number;
  laborCost: number;
  overhead: number;
  total: number;
  suggestions?: string[];

}


const COLORS = ["#FFA726", "#66BB6A", "#42A5F5"];

export default function EstimationDetailPage() {
  const { id } = useParams();
  const [estimation, setEstimation] = useState<Estimation | null>(null);
  const [previousEstimations, setPreviousEstimations] = useState<Estimation[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/estimations/${id}`);
        const data = await res.json();
        setEstimation(data);

        const prevRes = await fetch("/api/estimations");
        const prevData = await prevRes.json();
        setPreviousEstimations(prevData.filter((e: Estimation) => e._id !== id));
      } catch {
        toast.error("Failed to load estimation data");
      }
    };
    fetchData();
  }, [id]);

  const pieData = [
    { name: "Material", value: estimation?.materialCost },
    { name: "Labor", value: estimation?.laborCost },
    { name: "Overhead", value: estimation?.overhead },
  ];

  const optimizedTotal =
    (estimation?.materialCost ?? 0) * 0.95 +
    (estimation?.laborCost ?? 0) * 0.95 +
    (estimation?.overhead ?? 0) * 0.9;

  const optimizedPieData = [
    { name: "Original Cost", value: estimation?.total },
    { name: "Optimized Cost", value: optimizedTotal },
  ];

  const barData = previousEstimations.slice(-5).map((item: Estimation, index: number) => ({
    name: `Est ${index + 1}`,
    Total: item.total,
  }));
  if (!estimation)
    return <p className="text-center p-10">Loading estimation data...</p>;

  return (
    <main className="min-h-screen py-20 px-6 bg-gradient-to-tr from-orange-50 to-yellow-100">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-10 shadow-2xl border border-orange-200">
        <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center">
          Estimation Summary
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Detailed breakdown and comparisons
        </p>

        <div ref={chartRef}>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-500">
                Estimation Breakdown
              </h2>
              <ul className="text-gray-700 space-y-2">
                <li>
                  <strong>Area:</strong> {estimation.area} sq ft
                </li>
                <li>
                  <strong>Material:</strong> {estimation.material}
                </li>
                <li>
                  <strong>Labor Hours:</strong> {estimation.laborHours}
                </li>
                <li>
                  <strong>Material Cost:</strong> ₹
                  {estimation.materialCost.toLocaleString()}
                </li>
                <li>
                  <strong>Labor Cost:</strong> ₹
                  {estimation.laborCost.toLocaleString()}
                </li>
                <li>
                  <strong>Overhead:</strong> ₹
                  {estimation.overhead.toLocaleString()}
                </li>
                <li className="font-bold text-lg mt-2">
                  Total Cost: ₹{estimation.total.toLocaleString()}
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-orange-500 mb-4">
                Cost Breakdown (Pie Chart)
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-orange-500 mb-4">
              Cost Comparison (Original vs Optimized)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={optimizedPieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                  dataKey="value"
                >
                  <Cell fill="#42A5F5" />
                  <Cell fill="#66BB6A" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-orange-500 mb-4">
              Previous Estimates Comparison
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total" fill="#FFA726" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <PDFReport
            data={{
              materialCost: estimation.materialCost,
              laborCost: estimation.laborCost,
              overhead: estimation.overhead,
              total: estimation.total,
              area: estimation.area,
              material: estimation.material,
              laborHours: estimation.laborHours,
              suggestions: estimation.suggestions ?? [],
            }}
          />

        </div>
      </div>
    </main>
  );
}
