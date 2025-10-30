import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock error response
    const errorResponse = {
      success: false,
      results: [
        {
          success: false,
          instruction: "deposit",
          compute_units_consumed: 2541,
          execution_time: 0,
          program_logs: [
            "Program 22222222222222222222222222222222222222222222 invoke [1]",
            "Program log: AnchorError occurred. Error Code: DeclaredProgramIdMismatch. Error Number: 4100. Error Message: The declared program id does not match the actual program id.",
            "Program 22222222222222222222222222222222222222222222 consumed 2541 of 1400000 compute units",
            "Program 22222222222222222222222222222222222222222222 failed: custom program error: 0x1004"
          ],
          message: "Custom program error: 0x1004"
        },
        {
          success: false,
          instruction: "withdraw",
          compute_units_consumed: 2541,
          execution_time: 0,
          program_logs: [
            "Program 22222222222222222222222222222222222222222222 invoke [1]",
            "Program log: AnchorError occurred. Error Code: DeclaredProgramIdMismatch. Error Number: 4100. Error Message: The declared program id does not match the actual program id.",
            "Program 22222222222222222222222222222222222222222222 consumed 2541 of 1400000 compute units",
            "Program 22222222222222222222222222222222222222222222 failed: custom program error: 0x1004"
          ],
          message: "Custom program error: 0x1004"
        }
      ]
    };

    return NextResponse.json(errorResponse);
  } catch (error) {
    console.error("Challenge test error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}