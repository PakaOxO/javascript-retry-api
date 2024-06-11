import axios, { AxiosResponse } from 'axios';

type TFnconstantDelay = (url: string, retries: number, delay: number) => Promise<AxiosResponse<any, any>>;
type TFnFibonacciBackoff = (
  url: string,
  retries: number,
  delay: number,
  baseRetries?: number | undefined
) => Promise<AxiosResponse<any, any>>;

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
    const fibonacci = calculateFibonacci(baseRetries - retries);
    await timeBuffer(fibonacci * baseDelay);
    result = await fetchWithFibonacciBackoff(url, retries - 1, baseDelay, baseRetries);
  }

  return result;
};

export const fetchWithRandomRetry = () => {};

export const fetchWithInstantRetry = () => {};

