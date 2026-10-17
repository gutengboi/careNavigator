import axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "../config/auth";

// Render free-tier backends spin down when idle and can take ~50s to wake up,
// during which requests fail with 502/503/504/520 instead of waiting.
const RETRYABLE_STATUS_CODES = [502, 503, 504, 520, 521, 522, 523, 524];
const RETRY_DELAY_MS = 5000;
const MAX_RETRY_DURATION_MS = 60000;

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

// Populated after login/signup (and restored from AsyncStorage on launch) so
// every request automatically authenticates as the current user.
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

// GetStream chat token for the logged-in user. Nothing initializes a chat
// client yet, but we hold onto it here instead of discarding it so that
// feature can read it once it exists.
let streamToken: string | null = null;

export function setStreamToken(token: string | null) {
  streamToken = token;
}

export function getStreamToken() {
  return streamToken;
}

apiClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryable = (error: any) =>
  !error.response || RETRYABLE_STATUS_CODES.includes(error.response.status);

export async function requestWithRetry<T = any>(config: AxiosRequestConfig): Promise<T> {
  const startedAt = Date.now();
  let lastError: any;

  while (Date.now() - startedAt < MAX_RETRY_DURATION_MS) {
    try {
      const response = await apiClient.request<T>(config);
      return response.data;
    } catch (error) {
      lastError = error;
      if (!isRetryable(error)) {
        throw error;
      }
      await sleep(RETRY_DELAY_MS);
    }
  }

  throw lastError;
}

export function getErrorMessage(error: any, fallback: string): string {
  if (!error.response) {
    return "Network error. Please check your connection and try again.";
  }
  if (RETRYABLE_STATUS_CODES.includes(error.response.status)) {
    return "The server is waking up after being idle. Please try again in a moment.";
  }
  return error.response?.data?.message || fallback;
}
