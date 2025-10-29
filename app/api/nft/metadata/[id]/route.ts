import { NextResponse } from "next/server";
import { mockCourses } from "@/lib/data/mock-courses";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const courseId = params.id;
  const course = mockCourses.find((c) => String(c.id) === String(courseId));
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const attributes = [
    { trait_type: "Instructor", value: course.instructor?.name ?? "Unknown" },
    { trait_type: "Level", value: course.level ?? "N/A" },
    { trait_type: "Duration", value: `${course.duration ?? 0}h` },
    { trait_type: "Category", value: course.category ?? "General" },
  ];

  const metadata = {
    name: course.title,
    symbol: "",
    description: course.description ?? "Course completion NFT",
    image: course.thumbnail,
    attributes,
    properties: {
      creators: [
        {
          address: "11111111111111111111111111111111",
          share: 100,
        },
      ],
    },
  };

  return NextResponse.json(metadata);
}
