"use client";

import { useUser } from "@clerk/nextjs";
import { PDFReport } from "@/components/Report";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface CostData {
    materialCost: number;
    laborCost: number;
    overhead: number;
    total: number;
    suggestions: string[];
  }
  interface Estimation extends CostData {
    area: string;
    material: string;
    laborHours: string;
    createdAt: string;
  }
    

const materialRates: Record<string, number> = {
    budget: 100,
    standard: 150,
    premium: 250,
};

const laborRate = 500;
const overheadRate = 0.1;

export default function EstimatorPage() {
    const { isSignedIn } = useUser();
    const isToastShown = useRef(false);

    useEffect(() => {
        if (!isToastShown.current && !isSignedIn) {
            toast("Please Login Before to Save Your Estimations");
            isToastShown.current = true;
        }
    }, [isSignedIn]);

    const [form, setForm] = useState({
        area: "",
        material: "standard",
        laborHours: "",
    });

    const [cost, setCost] = useState<CostData | null>(null);
    const [loading, setLoading] = useState(false);
    const [savedEstimations, setSavedEstimations] = useState<Estimation[]>([]);
    const [loadingEstimations, setLoadingEstimations] = useState(false);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const calculateEstimate = (formData: typeof form): CostData | null => {
        const area = parseFloat(formData.area);
        const labor = parseFloat(formData.laborHours);
        const rate = materialRates[formData.material];
      
        if (isNaN(area) || isNaN(labor)) {
          setCost(null);
          return null;
        }
      
        const materialCost = area * rate;
        const laborCost = labor * laborRate;
        const subtotal = materialCost + laborCost;
        const overhead = subtotal * overheadRate;
        const total = subtotal + overhead;
      
        const suggestions: string[] = [];
      
        if (labor > 120) {
          suggestions.push("💡 Consider breaking work into shifts to reduce overtime and fatigue.");
        }
        if (area > 2000 && formData.material !== "budget") {
          suggestions.push("🏗️ Bulk buying budget materials for large areas could reduce cost significantly.");
        }
        if (formData.material === "premium") {
          suggestions.push("🧱 Using premium materials increases cost. Evaluate if standard material could meet the requirements.");
        }
        if (overhead > 0.15 * subtotal) {
          suggestions.push("📊 High overhead detected. Consider optimizing logistics or management overhead.");
        }
        if (total > 300000) {
          suggestions.push("🔍 Explore alternate suppliers or reuse existing materials to cut down on costs.");
        }
      
        const result: CostData = {
          materialCost,
          laborCost,
          overhead,
          total,
          suggestions,
        };
      
        setCost(result);
        return result;
      };
      

    const saveToDatabase = async (costData: CostData) => {
        setLoading(true);
        try {
            const res = await fetch("/api/estimations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    area: form.area,
                    material: form.material,
                    laborHours: form.laborHours,
                    ...costData,
                }),
            });
            if (!res.ok) throw new Error("Failed to save");
            toast.success("Estimation saved!");
        } catch {
            toast.error("You are not Logged In. Data Will not be Saved");
        } finally {
            setLoading(false);
        }
    };

    const loadMyEstimations = async () => {
        setLoadingEstimations(true);
        try {
            const res = await fetch("/api/estimations");
            const data = await res.json();
            setSavedEstimations(data);
        } catch {
            toast.error("Failed to load your estimations");
        } finally {
            setLoadingEstimations(false);
        }
    };
    const handleClickCalculate = () => {
        const newCost = calculateEstimate(form);
        if (newCost && isSignedIn) {
          saveToDatabase(newCost);
        }
      };
    return (
        <main className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-20 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-orange-200">
                <h1 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
                    Construction Cost Estimator
                </h1>
                <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                    Enter project details and get a smart, optimized cost estimate with suggestions.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div>
                        <label className="block mb-1 font-medium">Total Area (sq ft)</label>
                        <input
                            type="number"
                            name="area"
                            value={form.area}
                            onChange={handleChange}
                            className="w-full rounded-md border border-orange-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-orange-500"
                            placeholder="e.g. 1200"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Material Quality</label>
                        <select
                            name="material"
                            value={form.material}
                            onChange={handleChange}
                            className="w-full rounded-md border border-orange-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="budget">Budget</option>
                            <option value="standard">Standard</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Labor Hours</label>
                        <input
                            type="number"
                            name="laborHours"
                            value={form.laborHours}
                            onChange={handleChange}
                            className="w-full rounded-md border border-orange-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-orange-500"
                            placeholder="e.g. 80"
                        />
                    </div>
                </div>

                <div className="text-center mb-10">
                    <button
                        onClick={handleClickCalculate}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Calculate & Save Estimate"}
                    </button>
                </div>

                {cost && (
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-orange-700 mb-4">Cost Breakdown</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li>Material Cost: ₹{cost.materialCost.toLocaleString()}</li>
                                <li>Labor Cost: ₹{cost.laborCost.toLocaleString()}</li>
                                <li>Overhead (10%): ₹{cost.overhead.toLocaleString()}</li>
                                <li className="font-bold text-lg mt-2">Total Estimated Cost: ₹{cost.total.toLocaleString()}</li>
                            </ul>

                            {cost.suggestions.length > 0 && (
                                <>
                                    <h3 className="mt-6 mb-2 font-semibold text-orange-600">Cost Optimization Tips:</h3>
                                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                        {cost.suggestions.map((tip: string, idx: number) => (
                                            <li key={idx}>{tip}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <PDFReport
                                data={{
                                    ...cost,
                                    area: form.area,
                                    material: form.material,
                                    laborHours: form.laborHours,
                                }}
                            />
                        </div>
                    </div>
                )}

                <div className="mt-10 text-center">
                   {!isSignedIn ? "" : <button
                        onClick={loadMyEstimations}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
                    >
                        {loadingEstimations ? "Loading..." : "Load My Estimations"}
                    </button> }
                </div> 


                {savedEstimations.length > 0 && (
                    <div className="mt-8 bg-white rounded-xl border border-orange-200 p-6 shadow">
                        <h2 className="text-xl font-bold text-orange-700 mb-4">My Previous Estimations</h2>
                        <ul className="space-y-4 max-h-96 overflow-y-auto">
                            {savedEstimations.map((estimation, index) => (
                                <li key={index} className="border border-orange-100 rounded-lg p-4 text-left bg-orange-50">
                                    <p><strong>Area:</strong> {estimation.area} sq ft</p>
                                    <p><strong>Material:</strong> {estimation.material}</p>
                                    <p><strong>Labor Hours:</strong> {estimation.laborHours}</p>
                                    <p><strong>Total Cost:</strong> ₹{estimation.total.toLocaleString()}</p>

                                    <div className="mt-3">
                                        <PDFReport
                                            data={{
                                                area: estimation.area,
                                                material: estimation.material,
                                                laborHours: estimation.laborHours,
                                                materialCost: estimation.materialCost,
                                                laborCost: estimation.laborCost,
                                                overhead: estimation.overhead,
                                                total: estimation.total,
                                                suggestions: estimation.suggestions,
                                            }}
                                        />
                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">Saved on: {new Date(estimation.createdAt).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </main>
    );
}
