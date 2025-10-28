import axios, { AxiosResponse } from "axios";
import { CreateQuestionData } from "./dto/question/question.create";
import { ApiResponse } from "./dto/apiReponse";
import { QuestionResponse } from "./dto/question/question.response";


export const BASE_URL = "https://be-inquire-a.vercel.app/api";


export async function createQuestion(
  data: CreateQuestionData
): Promise<AxiosResponse<ApiResponse<QuestionResponse>>> {
  try {
    const response = await axios.post<ApiResponse<QuestionResponse>>(
      `${BASE_URL}/questions`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
}

export async function getQuestionById(
  questionId: string
): Promise<AxiosResponse<ApiResponse<QuestionResponse>>> {
  try {
    const response = await axios.get<ApiResponse<QuestionResponse>>(
      `${BASE_URL}/questions/${questionId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
}
