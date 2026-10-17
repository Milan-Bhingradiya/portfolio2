import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/db";
import SiteContent from "@/models/SiteContent";
import { getContent } from "@/lib/content";

export async function GET() {
  const content = await getContent();
  return Response.json(content);
}

function authorized(req: Request) {
  const password = req.headers.get("x-admin-password");
  return (
    !!process.env.ADMIN_PASSWORD &&
    !!password &&
    password === process.env.ADMIN_PASSWORD
  );
}

export async function PUT(req: Request) {
  if (!authorized(req)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body = await req.json();
  delete body._id;
  delete body.key;
  await dbConnect();
  await SiteContent.findOneAndUpdate({ key: "main" }, { $set: body }, { upsert: true });
  revalidatePath("/");
  return Response.json({ ok: true });
}
