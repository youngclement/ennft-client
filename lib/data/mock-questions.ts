export interface MockQuestion {
  id: string;
  asker: string;
  questionText: string;
  questionContent: string;
  category: string;
  rewardAmount: number;
  createdAt: number;
  isClosed: boolean;
  chosenAnswerId: number;
  deadline: string;
  tags: string[];
}

export interface MockAnswer {
  id: string;
  responder: string;
  answerText: string;
  answerContent: string;
  upvotes: number;
  rewardAmount: number;
  author: string;
  createdAt: number;
  isAccepted?: boolean;
}

export const questions: MockQuestion[] = [
  {
    id: "1",
    asker: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    questionText: "How to create a Solana program using Anchor framework?",
    questionContent: `I'm new to Solana development and want to create a simple program that stores user data on-chain. I've been looking at the Anchor framework but I'm confused about the project structure and basic setup.

I've tried following the official documentation but I keep getting errors when trying to build my program. Specifically, I'm getting issues with the Cargo.toml configuration and the Anchor workspace setup.

Can someone provide a step-by-step guide for:
1. Setting up a new Anchor project
2. Creating a basic program that stores user information
3. Testing the program with Anchor's test framework
4. Deploying to devnet

Any code examples or best practices would be greatly appreciated!`,
    category: "Solana,Rust,Anchor,Blockchain",
    rewardAmount: 50,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 2, // 2 days ago
    isClosed: false,
    chosenAnswerId: -1,
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    tags: ["solana", "rust", "anchor", "smart-contract", "blockchain"],
  },
  {
    id: "2",
    asker: "0x8ba1f109551bD43280301264526176D9",
    questionText: "Best practices for Rust error handling in Solana programs",
    questionContent: `I'm working on a Solana program and I'm struggling with error handling patterns. Currently, I'm using basic Result types but I want to implement more robust error handling that follows Solana/Rust best practices.

Questions:
1. Should I use custom error types or stick with Solana's built-in errors?
2. How do I handle different types of errors (validation, insufficient funds, etc.)?
3. What's the best way to propagate errors up the call stack?
4. How do I test error conditions properly?

I've seen some programs use macros for error handling. Is that recommended?`,
    category: "Rust,Solana,Error Handling",
    rewardAmount: 75,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 5, // 5 days ago
    isClosed: true,
    chosenAnswerId: 1,
    deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    tags: ["rust", "solana", "error-handling", "best-practices"],
  },
  {
    id: "3",
    asker: "0x4a2d8f7c3b9e15684d2c8f5a1b3e9d2c",
    questionText:
      "How to implement PDAs (Program Derived Addresses) in Solana?",
    questionContent: `I'm building a decentralized exchange on Solana and need to understand how to properly implement PDAs for user accounts and escrow functionality.

I understand that PDAs allow programs to sign transactions, but I'm confused about:
- How to derive PDAs from seeds
- Best practices for PDA security
- How to create associated token accounts using PDAs
- Managing multiple PDAs per user

Can someone explain the concept with practical examples? I want to avoid common pitfalls.`,
    category: "Solana,PDAs,Security,Rust",
    rewardAmount: 100,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 1, // 1 day ago
    isClosed: false,
    chosenAnswerId: -1,
    deadline: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    tags: ["solana", "pdas", "security", "rust", "blockchain"],
  },
  {
    id: "4",
    asker: "0x9c8b7a6d5e4f3g2h1i0j9k8l7m6n5o",
    questionText: "Rust ownership and borrowing patterns for Solana programs",
    questionContent: `I'm coming from JavaScript/TypeScript background and Rust's ownership system is blowing my mind. I'm trying to write efficient Solana programs but keep running into borrow checker issues.

Specific issues I'm facing:
1. How to properly handle account data borrowing in instruction handlers
2. When to use references vs. owned values
3. Managing lifetimes in complex data structures
4. Performance implications of different ownership patterns

Can someone explain how ownership works in the context of Solana programs with concrete examples?`,
    category: "Rust,Solana,Ownership,Borrowing",
    rewardAmount: 60,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 3, // 3 days ago
    isClosed: false,
    chosenAnswerId: -1,
    deadline: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
    tags: ["rust", "solana", "ownership", "borrowing", "performance"],
  },
  {
    id: "5",
    asker: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    questionText: "Implementing cross-program invocation (CPI) in Anchor",
    questionContent: `I need to call the SPL Token program from my Anchor program to transfer tokens. I've read the documentation but the examples seem incomplete.

Questions:
1. How do I properly set up CPI calls in Anchor?
2. What's the correct way to handle accounts for CPI?
3. How do I pass data between programs?
4. Error handling for failed CPI calls
5. Gas/compute budget considerations

I want to implement a token swap function that calls the token program. Any detailed examples would help!`,
    category: "Solana,Anchor,CPI,SPL Token",
    rewardAmount: 85,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 4, // 4 days ago
    isClosed: false,
    chosenAnswerId: -1,
    deadline: new Date(Date.now() + 60 * 60 * 60 * 1000).toISOString(),
    tags: ["solana", "anchor", "cpi", "spl-token", "rust"],
  },
  {
    id: "6",
    asker: "0x7q8w9e0r1t2y3u4i5o6p7a8s9d0f1g2h",
    questionText:
      "Optimizing compute units and transaction fees in Solana programs",
    questionContent: `My Solana program is exceeding compute unit limits and users are complaining about high fees. I need to optimize both performance and cost.

Current issues:
- Complex calculations causing compute unit exhaustion
- Large account data structures
- Inefficient data serialization
- Multiple account accesses per instruction

What techniques should I use to:
1. Reduce compute unit usage
2. Minimize account data size
3. Optimize instruction execution
4. Balance between security and performance

Are there any benchmarking tools or best practices for measuring and optimizing Solana programs?`,
    category: "Solana,Performance,Optimization,Rust",
    rewardAmount: 90,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 6, // 6 days ago
    isClosed: false,
    chosenAnswerId: -1,
    deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    tags: ["solana", "performance", "optimization", "rust", "compute-units"],
  },
  {
    id: "7",
    asker: "0x3z4x5c6v7b8n9m0l1k2j3h4g5f6d7s8a",
    questionText:
      "Building a React frontend for Solana dApps with wallet integration",
    questionContent: `I'm building a React application that interacts with Solana programs. I'm using @solana/wallet-adapter-react but having issues with state management and transaction handling.

Challenges:
1. Managing wallet connection state across components
2. Handling transaction confirmations and errors
3. Real-time updates when account data changes
4. TypeScript integration with Solana types
5. Optimizing re-renders when wallet state changes

What's the best architecture for a Solana dApp frontend? Should I use Redux, Zustand, or just React context? Any recommended patterns or libraries?`,
    category: "React,Solana,Wallet,Frontend",
    rewardAmount: 65,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 2, // 2 days ago
    isClosed: false,
    chosenAnswerId: -1,
    deadline: new Date(Date.now() + 30 * 60 * 60 * 1000).toISOString(),
    tags: ["react", "solana", "wallet-adapter", "frontend", "typescript"],
  },
  {
    id: "8",
    asker: "0x2w3e4r5t6y7u8i9o0p1a2s3d4f5g6h7j",
    questionText: "Rust macros and procedural macros for Solana development",
    questionContent: `I want to create reusable code patterns for my Solana programs using Rust macros. I've seen some crates use derive macros for account validation and instruction handling.

Questions:
1. When should I use declarative macros vs. procedural macros?
2. How to create derive macros for account structs?
3. Best practices for macro hygiene and error handling
4. Performance impact of macro usage
5. Examples of useful macros in Solana development

Can someone show me how to implement a derive macro that automatically generates account validation logic?`,
    category: "Rust,Macros,Solana,Procedural Macros",
    rewardAmount: 80,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 7, // 7 days ago
    isClosed: false,
    chosenAnswerId: -1,
    deadline: new Date(Date.now() + 84 * 60 * 60 * 1000).toISOString(),
    tags: ["rust", "macros", "solana", "procedural-macros", "metaprogramming"],
  },
  {
    id: "9",
    asker: "0x9i8u7y6t5r4e3w2q1a0s9d8f7g6h5j4k",
    questionText: "Solana NFT marketplace development with Metaplex",
    questionContent: `I'm building an NFT marketplace on Solana using Metaplex. I need to understand the complete flow from minting to trading.

Key areas I need help with:
1. Setting up Metaplex SDK with React
2. Creating NFT collections with metadata
3. Implementing buy/sell functionality
4. Royalty management and secondary sales
5. Auction house integration
6. Gas fee optimization

Are there any security considerations I should be aware of? What's the recommended architecture for a production NFT marketplace?`,
    category: "Solana,NFT,Metaplex,Marketplace",
    rewardAmount: 120,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 3, // 3 days ago
    isClosed: false,
    chosenAnswerId: -1,
    deadline: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString(),
    tags: ["solana", "nft", "metaplex", "marketplace", "blockchain"],
  },
  {
    id: "10",
    asker: "0x5k4j3h2g1f0d9s8a7z6x5c4v3b2n1m0l",
    questionText: "Rust async programming patterns in Solana programs",
    questionContent: `Solana programs run synchronously, but I need to handle async operations in my client applications. How do I properly structure async code when interacting with Solana?

Issues I'm facing:
1. Handling multiple concurrent transactions
2. Managing connection pools to RPC endpoints
3. Implementing retry logic for failed transactions
4. Coordinating multiple instruction calls
5. Real-time subscription to account changes

What's the best way to structure async Rust code for Solana clients? Are there any patterns or crates that help with this?`,
    category: "Rust,Async,Solana,Client,Concurrency",
    rewardAmount: 70,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 5, // 5 days ago
    isClosed: false,
    chosenAnswerId: -1,
    deadline: new Date(Date.now() + 42 * 60 * 60 * 1000).toISOString(),
    tags: ["rust", "async", "solana", "client", "concurrency"],
  },
];

export const mockAnswers: Record<string, MockAnswer[]> = {
  "1": [
    {
      id: "1",
      responder: "0x8ba1f109551bD43280301264526176D9",
      answerText:
        "Setting up an Anchor project is straightforward. Here's a complete guide:",
      answerContent: `Here's a step-by-step guide to create your first Solana program with Anchor:

## 1. Install Dependencies
\`\`\`bash
npm i -g @project-serum/anchor-cli
avm install latest && avm use latest
\`\`\`

## 2. Create New Project
\`\`\`bash
anchor init my-solana-program
cd my-solana-program
\`\`\`

## 3. Project Structure
Your project will have:
- \`programs/\` - Rust program code
- \`tests/\` - TypeScript tests
- \`app/\` - React frontend (optional)

## 4. Basic Program Structure
\`\`\`rust
use anchor_lang::prelude::*;

declare_id!("YourProgramIdHere");

#[program]
pub mod my_solana_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        user_account.authority = ctx.accounts.user.key();
        user_account.data = String::new();
        Ok(())
    }

    pub fn update_data(ctx: Context<UpdateData>, data: String) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        user_account.data = data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 4 + 200 // discriminator + pubkey + string len + data
    )]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateData<'info> {
    #[account(
        mut,
        has_one = authority @ ErrorCode::Unauthorized
    )]
    pub user_account: Account<'info, UserAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct UserAccount {
    pub authority: Pubkey,
    pub data: String,
}
\`\`\`

## 5. Testing
\`\`\`typescript
import * as anchor from "@project-serum/anchor";

describe("my-solana-program", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  it("Initializes the program", async () => {
    const program = anchor.workspace.MySolanaProgram;
    const userAccount = anchor.web3.Keypair.generate();

    await program.methods
      .initialize()
      .accounts({
        userAccount: userAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([userAccount])
      .rpc();
  });
});
\`\`\`

## 6. Deployment
\`\`\`bash
anchor build
anchor deploy --provider.cluster devnet
\`\`\`

This should get you started! Make sure to read the Anchor documentation for advanced features.`,
      upvotes: 15,
      rewardAmount: 0,
      author: "SolanaDev",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 1,
      isAccepted: false,
    },
    {
      id: "2",
      responder: "0x4a2d8f7c3b9e15684d2c8f5a1b3e9d2c",
      answerText:
        "Don't forget about proper error handling and security considerations!",
      answerContent: `Great answer! I'd like to add some important security and error handling considerations:

## Security Best Practices:
1. **Validate all inputs** - Never trust user-provided data
2. **Use proper constraints** - Add account constraints to prevent unauthorized access
3. **Handle edge cases** - What happens if accounts don't exist?

## Error Handling:
\`\`\`rust
#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("Invalid data length")]
    InvalidDataLength,
    #[msg("Account already initialized")]
    AlreadyInitialized,
}
\`\`\`

## Account Validation:
\`\`\`rust
#[derive(Accounts)]
#[instruction(data: String)]
pub struct UpdateData<'info> {
    #[account(
        mut,
        has_one = authority @ ErrorCode::Unauthorized,
        constraint = data.len() <= 200 @ ErrorCode::InvalidDataLength
    )]
    pub user_account: Account<'info, UserAccount>,
    pub authority: Signer<'info>,
}
\`\`\`

Also, make sure to test with different account states and edge cases before deploying to mainnet.`,
      upvotes: 8,
      rewardAmount: 0,
      author: "SecurityFirst",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 1,
      isAccepted: false,
    },
  ],
  "2": [
    {
      id: "1",
      responder: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      answerText:
        "For Solana programs, I recommend using custom error types with Anchor's error_code macro.",
      answerContent: `Here's how I structure error handling in my Solana programs:

## Custom Error Types
\`\`\`rust
#[error_code]
pub enum MyError {
    #[msg("Account is not authorized to perform this action")]
    Unauthorized,
    #[msg("Insufficient funds for transaction")]
    InsufficientFunds,
    #[msg("Invalid input parameters")]
    InvalidInput,
    #[msg("Arithmetic overflow occurred")]
    Overflow,
    #[msg("Account constraint violation")]
    ConstraintViolation,
}
\`\`\`

## Error Propagation Pattern
\`\`\`rust
pub fn transfer_tokens(ctx: Context<TransferTokens>, amount: u64) -> Result<()> {
    // Validate inputs first
    require!(amount > 0, MyError::InvalidInput);

    let source_account = &mut ctx.accounts.source_account;
    let destination_account = &mut ctx.accounts.destination_account;

    // Check balance
    require!(source_account.balance >= amount, MyError::InsufficientFunds);

    // Perform transfer with overflow check
    source_account.balance = source_account.balance
        .checked_sub(amount)
        .ok_or(MyError::Overflow)?;

    destination_account.balance = destination_account.balance
        .checked_add(amount)
        .ok_or(MyError::Overflow)?;

    Ok(())
}
\`\`\`

## Testing Error Conditions
\`\`\`rust
it("should fail with insufficient funds", async () => {
  try {
    await program.methods
      .transferTokens(new anchor.BN(1000)) // More than available
      .accounts({ ... })
      .rpc();
    assert.fail("Should have thrown error");
  } catch (error) {
    assert.equal(error.error.errorCode.code, "InsufficientFunds");
  }
});
\`\`\`

## Best Practices
1. Use descriptive error messages
2. Validate inputs early
3. Use checked arithmetic operations
4. Test all error paths
5. Consider gas costs of error messages

This approach makes your program more robust and user-friendly.`,
      upvotes: 12,
      rewardAmount: 75,
      author: "RustExpert",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 4,
      isAccepted: true,
    },
    {
      id: "2",
      responder: "0x9c8b7a6d5e4f3g2h1i0j9k8l7m6n5o",
      answerText:
        "I prefer using the thiserror crate for more flexible error handling.",
      answerContent: `While Anchor's error_code is convenient, sometimes you need more flexibility. Here's how to use thiserror with Solana:

## Using thiserror
\`\`\`rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ProgramError {
    #[error("Unauthorized access")]
    Unauthorized,
    #[error("Insufficient balance: needed {needed}, got {available}")]
    InsufficientBalance { needed: u64, available: u64 },
    #[error("Invalid amount: {0}")]
    InvalidAmount(u64),
}

impl From<ProgramError> for ProgramError {
    fn from(e: ProgramError) -> Self {
        // Convert to Solana-compatible error
        match e {
            ProgramError::Unauthorized => ProgramError::Custom(1),
            ProgramError::InsufficientBalance { .. } => ProgramError::Custom(2),
            ProgramError::InvalidAmount(_) => ProgramError::Custom(3),
        }
    }
}
\`\`\`

## Advantages of thiserror:
- Rich error context
- Better debugging information
- More flexible error types
- Integration with logging

However, keep in mind that Solana programs have limited space, so balance between functionality and bytecode size.`,
      upvotes: 6,
      rewardAmount: 0,
      author: "ErrorHandler",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 3,
      isAccepted: false,
    },
  ],
  "3": [
    {
      id: "1",
      responder: "0x8ba1f109551bD43280301264526176D9",
      answerText:
        "PDAs are crucial for Solana programs. Let me explain with examples:",
      answerContent: `Program Derived Addresses (PDAs) are addresses derived from a program ID and optional seeds. They allow programs to sign transactions.

## Basic PDA Derivation
\`\`\`rust
// Derive PDA for user data
let (user_pda, bump) = Pubkey::find_program_address(
    &[
        b"user_data",
        user.key().as_ref(),
    ],
    program_id,
);

// Derive PDA for escrow
let (escrow_pda, bump) = Pubkey::find_program_address(
    &[
        b"escrow",
        maker.key().as_ref(),
        taker.key().as_ref(),
        mint.key().as_ref(),
    ],
    program_id,
);
\`\`\`

## Associated Token Account PDAs
\`\`\`rust
use spl_associated_token_account::get_associated_token_address;

// Get ATA for user's token account
let user_token_account = get_associated_token_address(
    user.key,
    mint.key,
);

// Or derive manually
let (ata, _) = Pubkey::find_program_address(
    &[
        user.key().as_ref(),
        spl_token::id().as_ref(),
        mint.key().as_ref(),
    ],
    &spl_associated_token_account::id(),
);
\`\`\`

## Security Considerations
1. **Bump seed management** - Store bump seeds securely
2. **Seed validation** - Ensure seeds are properly validated
3. **Access control** - Use PDA constraints in account validation
4. **Collision resistance** - Use unique seed combinations

## Common Patterns
- User-specific accounts: \`[b"user", user_pubkey]\`
- Escrow accounts: \`[b"escrow", maker, taker, mint]\`
- Program state: \`[b"state"]\`

Always validate PDA ownership and derivation in your account constraints!`,
      upvotes: 18,
      rewardAmount: 0,
      author: "PDAMaster",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 1,
      isAccepted: false,
    },
  ],
  "4": [
    {
      id: "1",
      responder: "0x7q8w9e0r1t2y3u4i5o6p7a8s9d0f1g2h",
      answerText:
        "Rust ownership in Solana is different from traditional apps. Let me explain:",
      answerContent: `In Solana programs, ownership works differently due to the runtime constraints. Here's how to think about it:

## Account Data Ownership
When you receive account data, you're borrowing it:
\`\`\`rust
#[derive(Accounts)]
pub struct MyInstruction<'info> {
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
}

pub fn my_instruction(ctx: Context<MyInstruction>) -> Result<()> {
    let account = &mut ctx.accounts.user_account;
    // account is a mutable reference to the data on-chain
    account.some_field = new_value;
    Ok(())
}
\`\`\`

## Key Ownership Concepts in Solana:
1. **Accounts own their data** - You borrow it during instruction execution
2. **No heap allocation** - Everything must be sized at compile time
3. **References are temporary** - They only live for the instruction duration
4. **Zero-copy deserialization** - Data stays in account buffer

## Common Patterns:
\`\`\`rust
// Pattern 1: Direct field access
account.balance += amount;

// Pattern 2: Working with nested data
{
    let mut user_data = &mut account.user_data;
    user_data.last_login = Clock::get()?.unix_timestamp;
}

// Pattern 3: Collection operations
account.items.push(Item { ... }); // Vec must have capacity
\`\`\`

## Memory Management Tips:
- Pre-allocate vectors with known capacity
- Use arrays when possible instead of Vec
- Avoid complex nested borrowing
- Keep data structures simple and flat

The borrow checker is your friend - it prevents runtime errors!`,
      upvotes: 9,
      rewardAmount: 0,
      author: "RustOwnership",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 2,
      isAccepted: false,
    },
  ],
  "5": [
    {
      id: "1",
      responder: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
      answerText:
        "CPI in Anchor is straightforward but requires careful account management:",
      answerContent: `Cross-Program Invocation (CPI) allows Solana programs to call other programs. Here's how to do it properly in Anchor:

## Basic CPI Structure
\`\`\`rust
use anchor_lang::solana_program::program::invoke;

#[derive(Accounts)]
pub struct TokenTransfer<'info> {
    #[account(mut)]
    pub from: AccountInfo<'info>,
    #[account(mut)]
    pub to: AccountInfo<'info>,
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

pub fn transfer_tokens(ctx: Context<TokenTransfer>, amount: u64) -> Result<()> {
    let transfer_ix = spl_token::instruction::transfer(
        &ctx.accounts.token_program.key(),
        &ctx.accounts.from.key(),
        &ctx.accounts.to.key(),
        &ctx.accounts.authority.key(),
        &[],
        amount,
    )?;

    invoke(
        &transfer_ix,
        &[
            ctx.accounts.from.clone(),
            ctx.accounts.to.clone(),
            ctx.accounts.authority.clone(),
        ],
    )?;
    Ok(())
}
\`\`\`

## Using Anchor's CPI Helpers
Anchor provides better CPI helpers:
\`\`\`rust
use anchor_spl::token::{self, Transfer};

#[derive(Accounts)]
pub struct TokenTransfer<'info> {
    #[account(mut)]
    pub from: Account<'info, TokenAccount>,
    #[account(mut)]
    pub to: Account<'info, TokenAccount>,
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

pub fn transfer_tokens(ctx: Context<TokenTransfer>, amount: u64) -> Result<()> {
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.from.to_account_info(),
                to: ctx.accounts.to.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            },
        ),
        amount,
    )
}
\`\`\`

## Error Handling
\`\`\`rust
pub fn safe_transfer(ctx: Context<TokenTransfer>, amount: u64) -> Result<()> {
    let result = token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer { ... },
        ),
        amount,
    );

    match result {
        Ok(_) => Ok(()),
        Err(error) => {
            msg!("Transfer failed: {:?}", error);
            return err!(MyError::TransferFailed);
        }
    }
}
\`\`\`

## Compute Budget Considerations
- CPI calls consume compute units
- Each CPI has a base cost plus instruction cost
- Test your program's compute usage: \`solana program show --buffers\``,
      upvotes: 14,
      rewardAmount: 0,
      author: "CPIExpert",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 3,
      isAccepted: false,
    },
  ],
  "6": [
    {
      id: "1",
      responder: "0x2w3e4r5t6y7u8i9o0p1a2s3d4f5g6h7j",
      answerText:
        "Optimizing Solana programs requires understanding compute limits and data structures:",
      answerContent: `Solana has a compute budget limit of 200,000 compute units per transaction. Here are optimization strategies:

## Compute Unit Optimization
1. **Minimize account accesses** - Each account access costs ~100 CU
2. **Use efficient loops** - Prefer iterators over manual loops
3. **Avoid expensive operations** - String operations, logging
4. **Batch operations** - Process multiple items in one instruction

## Data Structure Optimization
\`\`\`rust
// Instead of Vec (expensive resizing)
#[account]
pub struct OptimizedData {
    pub items: [Item; 10], // Fixed-size array
    pub count: u8,         // Track actual items
}

// Instead of String (expensive)
#[account]
pub struct UserData {
    pub name: [u8; 32],    // Fixed-size byte array
    pub name_len: u8,      // Track actual length
}
\`\`\`

## Instruction Optimization
\`\`\`rust
// Bad: Multiple account accesses in loop
for account in accounts.iter() {
    let mut data = &mut account.data;
    data.value += 1;
}

// Good: Single pass with collected data
let mut updates = Vec::new();
for account in accounts.iter() {
    updates.push(account.data.value + 1);
}
for (account, new_value) in accounts.iter_mut().zip(updates) {
    account.data.value = new_value;
}
\`\`\`

## Benchmarking Tools
\`\`\`bash
# Use solana-program-test for unit tests
# Check compute units in test output
solana program show --buffers

# Use log to measure compute usage
msg!("Compute units used: {}", compute_budget);
\`\`\`

## Key Metrics to Track:
- Total compute units per instruction
- Account data size
- Number of account accesses
- Memory allocation patterns

Remember: Security > Performance. Don't sacrifice security for minor performance gains.`,
      upvotes: 11,
      rewardAmount: 0,
      author: "PerformanceGuru",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 5,
      isAccepted: false,
    },
  ],
  "7": [
    {
      id: "1",
      responder: "0x3z4x5c6v7b8n9m0l1k2j3h4g5f6d7s8a",
      answerText:
        "For Solana dApps, I recommend Zustand for state management with wallet-adapter:",
      answerContent: `Here's my recommended architecture for Solana React dApps:

## State Management Setup
\`\`\`tsx
// store/wallet.ts
import { create } from 'zustand';
import { WalletContextState } from '@solana/wallet-adapter-react';

interface WalletStore {
  wallet: WalletContextState | null;
  connection: Connection | null;
  setWallet: (wallet: WalletContextState) => void;
  setConnection: (connection: Connection) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallet: null,
  connection: null,
  setWallet: (wallet) => set({ wallet }),
  setConnection: (connection) => set({ connection }),
}));
\`\`\`

## Transaction Handler Hook
\`\`\`tsx
export const useTransaction = () => {
  const { connection } = useWalletStore();
  const { publicKey, sendTransaction } = useWallet();

  const sendTransaction = useCallback(async (
    instructions: TransactionInstruction[],
    signers: Signer[] = []
  ) => {
    if (!connection || !publicKey) throw new Error('Wallet not connected');

    try {
      const transaction = new Transaction().add(...instructions);
      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      return signature;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }, [connection, publicKey, sendTransaction]);

  return { sendTransaction };
};
\`\`\`

## Real-time Account Subscription
\`\`\`tsx
export const useAccountSubscription = (accountPubkey: PublicKey) => {
  const { connection } = useWalletStore();
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    if (!connection) return;

    const subscriptionId = connection.onAccountChange(
      accountPubkey,
      (accountInfo) => {
        setAccountData(accountInfo);
      }
    );

    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [connection, accountPubkey]);

  return accountData;
};
\`\`\`

## Error Boundary for Wallet Errors
\`\`\`tsx
export const WalletErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error) => {
      if (error.name === 'WalletSignTransactionError') {
        setError('Transaction rejected by user');
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return children;
};
\`\`\`

This architecture provides good separation of concerns and handles common Solana dApp challenges.`,
      upvotes: 16,
      rewardAmount: 0,
      author: "ReactSolana",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 1,
      isAccepted: false,
    },
  ],
  "8": [
    {
      id: "1",
      responder: "0x9i8u7y6t5r4e3w2q1a0s9d8f7g6h5j4k",
      answerText:
        "Procedural macros are powerful but complex. Here's a practical example:",
      answerContent: `Creating derive macros for Solana accounts can save a lot of boilerplate. Here's a complete example:

## Derive Macro for Account Validation
\`\`\`rust
// In your macro crate (separate from program)
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(AccountValidation)]
pub fn account_validation_derive(input: TokenStream) -> TokenStream {
    let input = parse_macro_input!(input as DeriveInput);
    let name = &input.ident;

    let expanded = quote! {
        impl #name {
            pub fn validate(&self, ctx: &Context<Self::Accounts>) -> Result<()> {
                // Auto-generated validation logic
                if self.authority != ctx.accounts.authority.key() {
                    return err!(ErrorCode::Unauthorized);
                }
                Ok(())
            }
        }
    };

    TokenStream::from(expanded)
}
\`\`\`

## Usage in Program
\`\`\`rust
use my_macro_crate::AccountValidation;

#[derive(Accounts, AccountValidation)]
pub struct MyAccounts<'info> {
    #[account(
        mut,
        has_one = authority,
        constraint = user_account.validate(&ctx).is_ok()
    )]
    pub user_account: Account<'info, UserAccount>,
    pub authority: Signer<'info>,
}

#[account]
#[derive(AccountValidation)]
pub struct UserAccount {
    pub authority: Pubkey,
    pub balance: u64,
}
\`\`\`

## Declarative Macros for Common Patterns
\`\`\`rust
macro_rules! check_authority {
    ($account:expr, $authority:expr) => {
        require!(
            $account.authority == $authority.key(),
            ErrorCode::Unauthorized
        );
    };
}

macro_rules! validate_amount {
    ($amount:expr) => {
        require!($amount > 0, ErrorCode::InvalidAmount);
        require!($amount <= MAX_AMOUNT, ErrorCode::AmountTooLarge);
    };
}

// Usage
pub fn transfer(ctx: Context<Transfer>, amount: u64) -> Result<()> {
    check_authority!(ctx.accounts.from, ctx.accounts.authority);
    validate_amount!(amount);

    // Transfer logic...
    Ok(())
}
\`\`\`

## Best Practices:
1. Keep macros simple and focused
2. Provide clear error messages
3. Test macros thoroughly
4. Document macro behavior
5. Consider performance impact

Macros can greatly reduce boilerplate but add complexity to debugging.`,
      upvotes: 7,
      rewardAmount: 0,
      author: "MacroMaster",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 6,
      isAccepted: false,
    },
  ],
  "9": [
    {
      id: "1",
      responder: "0x5k4j3h2g1f0d9s8a7z6x5c4v3b2n1m0l",
      answerText:
        "Building an NFT marketplace on Solana requires understanding Metaplex standards:",
      answerContent: `Here's a comprehensive guide for building an NFT marketplace:

## Metaplex SDK Setup
\`\`\`tsx
import { Metaplex, keypairIdentity, bundlrStorage } from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));
const wallet = Keypair.generate();

const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());
\`\`\`

## Creating NFT Collections
\`\`\`tsx
const { nft } = await metaplex.nfts().create({
  name: 'My NFT',
  description: 'An awesome NFT',
  sellerFeeBasisPoints: 500, // 5% royalty
  symbol: 'MNFT',
  creators: [
    {
      address: creatorWallet.publicKey,
      share: 100,
    },
  ],
  properties: {
    files: [
      {
        type: 'image/png',
        uri: 'https://example.com/image.png',
      },
    ],
  },
});
\`\`\`

## Marketplace Implementation
\`\`\`tsx
// List NFT for sale
const { listing } = await metaplex.auctionHouse().list({
  auctionHouse: auctionHouse.address,
  mintAccount: nft.mint.address,
  price: sol(1), // 1 SOL
});

// Buy NFT
const { purchase } = await metaplex.auctionHouse().buy({
  auctionHouse: auctionHouse.address,
  listing: listing.address,
});
\`\`\`

## Security Considerations:
1. **Verify NFT ownership** before transactions
2. **Check creator royalties** are properly set
3. **Validate metadata** integrity
4. **Use trusted RPC endpoints**
5. **Implement rate limiting** for API calls

## Recommended Architecture:
- **Frontend**: Next.js with wallet integration
- **Backend**: Node.js API for off-chain data
- **Database**: MongoDB for listings and metadata
- **File Storage**: Arweave/IPFS for NFT assets
- **Indexer**: Helius or custom indexer for real-time data

## Performance Optimizations:
- Cache frequently accessed data
- Use CDN for images
- Implement lazy loading
- Batch API calls where possible

This is a complex project requiring expertise in multiple areas. Consider starting with a simpler MVP first.`,
      upvotes: 13,
      rewardAmount: 0,
      author: "NFTArchitect",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 2,
      isAccepted: false,
    },
  ],
  "10": [
    {
      id: "1",
      responder: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      answerText:
        "For async Solana clients, I recommend using tokio with connection pooling:",
      answerContent: `Async programming in Solana clients is different from programs. Here's how to structure it:

## Async Client Architecture
\`\`\`rust
use solana_client::nonblocking::rpc_client::RpcClient;
use solana_sdk::commitment_config::CommitmentConfig;
use std::sync::Arc;
use tokio::sync::Semaphore;

#[derive(Clone)]
pub struct SolanaClient {
    client: Arc<RpcClient>,
    rate_limiter: Arc<Semaphore>,
}

impl SolanaClient {
    pub fn new(rpc_url: &str) -> Self {
        let client = Arc::new(RpcClient::new_with_commitment(
            rpc_url.to_string(),
            CommitmentConfig::confirmed(),
        ));
        let rate_limiter = Arc::new(Semaphore::new(10)); // Max 10 concurrent requests

        Self { client, rate_limiter }
    }

    pub async fn get_balance(&self, pubkey: &Pubkey) -> Result<u64> {
        let _permit = self.rate_limiter.acquire().await?;
        self.client.get_balance(pubkey).await
    }
}
\`\`\`

## Concurrent Transaction Processing
\`\`\`rust
pub async fn process_transactions(
    client: &SolanaClient,
    transactions: Vec<Transaction>
) -> Result<Vec<Signature>> {
    let mut handles = vec![];

    for tx in transactions.into_iter() {
        let client = client.clone();
        let handle = tokio::spawn(async move {
            client.send_and_confirm_transaction(&tx).await
        });
        handles.push(handle);
    }

    let results = futures::future::join_all(handles).await;
    results.into_iter().collect::<Result<Vec<_>, _>>()
}
\`\`\`

## Real-time Account Monitoring
\`\`\`rust
use solana_client::pubsub_client::PubsubClient;

pub async fn monitor_account(
    ws_url: &str,
    account_pubkey: Pubkey
) -> Result<()> {
    let pubsub_client = PubsubClient::new(ws_url).await?;

    let (mut stream, unsubscriber) = pubsub_client
        .account_subscribe(&account_pubkey, None)?;

    while let Some(response) = stream.next().await {
        println!("Account changed: {:?}", response);
        // Handle account changes
    }

    Ok(())
}
\`\`\`

## Error Handling and Retries
\`\`\`rust
use backoff::{retry, ExponentialBackoff};

pub async fn send_with_retry(
    client: &SolanaClient,
    tx: &Transaction
) -> Result<Signature> {
    retry(ExponentialBackoff::default(), || async {
        client.send_and_confirm_transaction(tx).await
            .map_err(|e| backoff::Error::transient(e))
    }).await
}
\`\`\`

## Recommended Crates:
- \`tokio\` - Async runtime
- \`solana-client\` - RPC client
- \`solana-sdk\` - Core SDK
- \`backoff\` - Retry logic
- \`futures\` - Stream utilities
- \`rayon\` - Parallel processing

This architecture handles the complexities of async Solana interactions while maintaining performance and reliability.`,
      upvotes: 10,
      rewardAmount: 0,
      author: "AsyncSolana",
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 4,
      isAccepted: false,
    },
  ],
};
