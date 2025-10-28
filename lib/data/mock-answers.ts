export const mockAnswers = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      reputation: 1250
    },
    content: `Here's a comprehensive solution for implementing authentication in Next.js 13:

1. First, install the required dependencies:
\`\`\`bash
npm install next-auth @supabase/supabase-js
\`\`\`

2. Set up your authentication configuration:`,
    code: `// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import SupabaseProvider from 'next-auth/providers/supabase'

export const authOptions = {
  providers: [
    SupabaseProvider({
      clientId: process.env.SUPABASE_CLIENT_ID,
      clientSecret: process.env.SUPABASE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }`,
    upvotes: 42,
    rewardAmount: 25,
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    isAccepted: true,
    comments: [
      {
        id: "c1",
        author: "Alex Kumar",
        content: "Great solution! Could you also explain how to handle protected routes?",
        createdAt: Date.now() - 1000 * 60 * 30
      },
      {
        id: "c2",
        author: "Sarah Chen",
        content: "Sure! You can use the middleware feature in Next.js for that. I'll add an example.",
        createdAt: Date.now() - 1000 * 60 * 25
      }
    ]
  },
  {
    id: "2",
    author: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?u=mike",
      reputation: 875
    },
    content: "Another approach is to use the App Router with client-side authentication:",
    code: `// app/providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}

// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}`,
    upvotes: 28,
    rewardAmount: 0,
    createdAt: Date.now() - 1000 * 60 * 45,
    comments: [
      {
        id: "c3",
        author: "Jane Smith",
        content: "This is much cleaner! Thanks for sharing.",
        createdAt: Date.now() - 1000 * 60 * 15
      }
    ]
  }
]