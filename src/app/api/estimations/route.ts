import { connectDB } from "@/lib/db";
import EstimationData from "@/models/EstimationData";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    const {userId} = await auth()
    
    if(!userId){
        return NextResponse.json({error : "Unauthorized"},{status:401})

    }
    try {
        await connectDB()
        const data = await req.json()
        const newEstimation = await EstimationData.create({
            ...data,
            userId
        })
        return NextResponse.json(newEstimation,{status:201})
    } catch (err) {
        console.error(err)
        return NextResponse.json({error:"Failed to Store Estimations"},{status:500})
    }
}

export async function GET() {
    const { userId } = await auth();
  
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      await connectDB();
      const estimations = await EstimationData.find({ userId }).sort({ createdAt: -1 });
      return NextResponse.json(estimations);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Failed to fetch estimations" }, { status: 500 });
    }
  }