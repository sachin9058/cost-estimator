import { Schema, Document, models, model } from "mongoose";

export interface EstimationData extends Document {
  userId: string;
  area: string;
  material: string;
  laborHours: string;
  materialCost: number;
  laborCost: number;
  overhead: number;
  total: number;
  suggestions: string[];
  createdAt: Date;
}

const EstimationSchema = new Schema<EstimationData>(
  {
    userId: { type: String, required: true },
    area: { type: String, required: true },
    material: { type: String, required: true },
    laborHours: { type: String, required: true },
    materialCost: { type: Number, required: true },
    laborCost: { type: Number, required: true },
    overhead: { type: Number, required: true },
    total: { type: Number, required: true },
    suggestions: [String],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Estimation || model<EstimationData>("Estimation", EstimationSchema);
