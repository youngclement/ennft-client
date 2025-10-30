import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock success response
    const successResponse = {
      success: true,
      results: [
        {
          success: true,
          instruction: "deposit",
          compute_units_consumed: 1850,
          execution_time: 12,
          program_logs: [
            "Program 22222222222222222222222222222222222222222222 invoke [1]",
            "Program log: Instruction: Deposit",
            "Program log: Depositing 1000000000 lamports to vault",
            "Program log: Vault balance updated successfully",
            "Program 22222222222222222222222222222222222222222222 consumed 1850 of 1400000 compute units",
            "Program 22222222222222222222222222222222222222222222 success"
          ],
          message: "Deposit successful"
        },
        {
          success: true,
          instruction: "withdraw",
          compute_units_consumed: 1920,
          execution_time: 15,
          program_logs: [
            "Program 22222222222222222222222222222222222222222222 invoke [1]",
            "Program log: Instruction: Withdraw",
            "Program log: Withdrawing 500000000 lamports from vault",
            "Program log: Vault balance updated successfully",
            "Program log: Transfer completed",
            "Program 22222222222222222222222222222222222222222222 consumed 1920 of 1400000 compute units",
            "Program 22222222222222222222222222222222222222222222 success"
          ],
          message: "Withdrawal successful"
        }
      ]
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    console.error("Challenge test error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}