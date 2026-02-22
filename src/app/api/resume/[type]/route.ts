import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const FILE_MAP: Record<string, string> = {
    sd: "software-developer.pdf",
    ml: "ml-engineer.pdf",
    fs: "fullstack-developer.pdf",
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    const { type } = await params;
    const filename = FILE_MAP[type];

    if (!filename) {
        return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    try {
        const filePath = path.join(process.cwd(), "public", "resumes", filename);
        const fileBuffer = await readFile(filePath);

        // Check if client wants base64 JSON (workaround for Turbopack 204 bug
        // where binary responses from API routes get stripped to 0 bytes)
        const format = request.nextUrl.searchParams.get("format");

        if (format === "base64") {
            // Return as JSON with base64 data — Turbopack passes text/json correctly
            const base64 = fileBuffer.toString("base64");
            return NextResponse.json({
                data: base64,
                filename,
                size: fileBuffer.length,
                contentType: "application/pdf",
            });
        }

        // Default: return raw binary (works for direct browser navigation, PowerShell, etc.)
        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Length": fileBuffer.length.toString(),
                "Content-Disposition": `inline; filename="${filename}"`,
                "Cache-Control": "public, max-age=3600",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch {
        return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
    }
}
