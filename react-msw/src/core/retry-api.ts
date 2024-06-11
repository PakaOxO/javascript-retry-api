import axios, { AxiosResponse } from 'axios';

type TFnconstantDelay = (url: string, retries: number, delay: number) => Promise<AxiosResponse<any, any>>;
type TFnFibonacciBackoff = (
  url: string,
  retries: number,
  delay: number,
  baseRetries?: number | undefined
) => Promise<AxiosResponse<any, any>>;
type TFnRandomRetry = (url: string, retries: number, maxDelay: number) => Promise<AxiosResponse<any, any>>;
type TFnImmediateRetry = (url: string, retries: number) => Promise<AxiosResponse<any, any>>;

const timeBuffer = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

const calculateFibonacci: (depth: number) => number = (depth: number) => {
  let previous = 0,
    current = 1,
    temp;

  for (let i = 0; i <= depth; i++) {
    temp = previous + current;
    previous = current;
    current = temp;
  }

  return current;
};

export const fetchWithConstantDelay: TFnconstantDelay = async (url: string, retries: number, delay: number) => {
  let result: AxiosResponse<any, any>;

  try {
    result = await axios.get(url);
  } catch (err) {
    if (retries === 0) throw Error('All retries failed');
    console.warn(`Contant delay: ${delay}ms 후 재요청`);
    await timeBuffer(delay);
    result = await fetchWithConstantDelay(url, retries - 1, delay);
  }

  return result;
};

export const fetchWithFibonacciBackoff: TFnFibonacciBackoff = async (
  url: string,
  retries: number,
  baseDelay: number,
  baseRetries?: number
) => {
  let result: AxiosResponse<any, any>;
  baseRetries = baseRetries || retries;

  try {
    result = await axios.get(url);
  } catch (err) {
    if (retries === 0) throw Error('All retries failed');
    // 재요청 횟수에 따른 depth를 계산해 depth번째 피보나치 수 반환
    const fibonacci = calculateFibonacci(baseRetries - retries);
    console.warn(`Fibonacci backoff: ${fibonacci * baseDelay}ms 후 재요청`);
    await timeBuffer(fibonacci * baseDelay);
    result = await fetchWithFibonacciBackoff(url, retries - 1, baseDelay, baseRetries);
  }

  return result;
};

export const fetchWithRandomRetry: TFnRandomRetry = async (url: string, retries: number, maxDelay: number) => {
  let result: AxiosResponse<any, any>;
  const baseDelay = 1000;

  try {
    result = await axios.get(url);
  } catch (err) {
    if (retries === 0) throw Error('All retries failed');
    // 랜덤한 재요청 시간
    const randomDelay = Math.floor(Math.random() * (maxDelay - baseDelay)) + baseDelay;
    console.warn(`Random delay: ${randomDelay}ms 후 재요청`);
    await timeBuffer(randomDelay);
    result = await fetchWithRandomRetry(url, retries - 1, maxDelay);
  }

  return result;
};

export const fetchWithImmediateRetry: TFnImmediateRetry = async (url: string, retries: number) => {
  let result: AxiosResponse<any, any>;

  try {
    result = await axios.get(url);
  } catch (err) {
    if (retries === 0) throw Error('All retries failed');
    // delay 없이 바로 재요청
    console.warn(`Immediate delay: 즉시 재요청`);
    result = await fetchWithImmediateRetry(url, retries - 1);
  }

  return result;
};

