import axios, { AxiosResponse } from 'axios';
import { CreateAnswerData } from './dto/answer/answer.create';
import { ApiResponse } from './dto/apiReponse';
import { AnswerResponse } from './dto/answer/answer.response';
import { BASE_URL } from './question.service';

export async function createAnswer(
  data: CreateAnswerData
): Promise<AxiosResponse<ApiResponse<AnswerResponse>>> {
  try {
    const response = await axios.post<ApiResponse<AnswerResponse>>(
      `${BASE_URL}/answers`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error creating answer:', error);
    throw error;
  }
}

export async function getAnswerById(
  answerId: string
): Promise<AxiosResponse<ApiResponse<AnswerResponse>>> {
  try {
    const response = await axios.get<ApiResponse<AnswerResponse>>(
      `${BASE_URL}/answers/${answerId}`
    );
    return response;
  } catch (error) {
    console.error('Error fetching answer:', error);
    throw error;
  }
}
