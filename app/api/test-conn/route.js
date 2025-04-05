import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    await conn.query("SELECT 1");
    return Response.json({ success: true, message: "Connessione riuscita!" });
  } catch (error) {
    console.error("Errore connessione DB:", error);
    return Response.json(
      {
        success: false,
        message: "Errore nella connessione",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
