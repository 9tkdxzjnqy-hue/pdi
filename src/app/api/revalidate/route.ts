import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad request", { status: 400 });
    }

    switch (body._type) {
      case "inductee":
        revalidateTag("inductees");
        break;
      case "competition":
        revalidateTag("competitions");
        break;
      case "galleryItem":
        revalidateTag("gallery");
        break;
      case "era":
        revalidateTag("eras");
        break;
      case "storyThread":
        revalidateTag("storyThreads");
        break;
      case "story":
        revalidateTag("stories");
        break;
      case "siteSettings":
        revalidateTag("siteSettings");
        break;
      case "homePage":
        revalidateTag("homePage");
        break;
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Revalidation error:", err);
    return new NextResponse("Error", { status: 500 });
  }
}
