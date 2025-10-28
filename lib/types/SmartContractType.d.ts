import { Address } from "viem";

enum DeadlinePeriod {
  OneWeek,
  TwoWeeks,
  OneMonth,
}

export interface User {
  userAddress: Address;
  reputation: bigint;
  answerCount: bigint;
  questionCount: bigint;
  bestSolutionCount: bigint;
}

interface Question {
  asker: address;
  questionText: string;
  category: string;
  rewardAmount: uint256;
  createdAt: uint256;
  deadline: uint256;
  isClosed: boolean;
  chosenAnswerId: uint256;
}

interface Answer {
  responder: Address;
  answerText: string;
  upvotes: bigint;
  rewardAmount: bigint;
  createdAt: bigint;
  questionId: bigint; // new
  parentAnswerId: bigint; //new
}

interface Comment {
  id: bigint;
  content: string;
  author: Address;
  createdAt: bigint;
  parentId: bigint | null;
  replies: Comment[];
}

interface PaginationParams {
  pageIndex: uint256;
  pageSize: uint256;
}

interface AskQuestionParams {
  questionText: string;
  category: string;
  deadlinePeriod: DeadlinePeriod;
}

interface SubmitAnswerParams {
  questionId: bigint;
  answerText: string;
  parentAnswerId: bigint;
}

interface VoteParams {
  questionId: uint256;
  answerId: uint256;
}

interface CloseQuestionParams {
  questionId: uint256;
  answerId: uint256;
}

interface QuestionAskedEvent {
  questionId: uint256;
  asker: address;
  questionText: string;
  rewardAmount: uint256;
  category: string;
}

interface AnswerSubmittedEvent {
  questionId: uint256;
  answerId: uint256;
  responder: address;
  answerText: string;
}

interface VotedEvent {
  questionId: uint256;
  answerId: uint256;
  voter: address;
}

interface QuestionClosedEvent {
  questionId: uint256;
  chosenAnswerId: uint256;
}
