export const questions = [
  {
    id: "1",
    asker: "0x1234...5678",
    questionText: "How to implement authentication in Next.js 13?",
    rewardAmount: 50,
    createdAt: Math.floor(Date.now() / 1000),
    isClosed: false,
    chosenAnswerId: -1,
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    asker: "0x8765...4321",
    questionText: "What are the best practices for smart contract development?",
    rewardAmount: 100,
    createdAt: Math.floor(Date.now() / 1000),
    isClosed: false,
    chosenAnswerId: -1,
    deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
  }
]

export const mockAnswers = {
  "1": [
    {
      id: "1",
      responder: "0x8765...4321",
      answerText: "You can implement authentication in Next.js 13 using NextAuth.js...",
      upvotes: 5,
      rewardAmount: 0,
      author: "John Doe"
    },
    {
      id: "2",
      responder: "0x9876...5432",
      answerText: "Here's a step-by-step guide to implement authentication...",
      upvotes: 3,
      rewardAmount: 0,
      author: "Jane Smith"
    }
  ],
  "2": []
}