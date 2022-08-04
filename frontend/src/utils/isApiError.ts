import { ApiError } from "@/interfaces/api/ApiError";

export function isApiError(data: any | ApiError): data is ApiError {
  return 'status' in data
}