import axios, { AxiosInstance } from "axios";

const apiKey: string =
  "6e6c9454cf6c9496a6e9e013b262578c998ba7b6dad99c3807185bc23ae1fee7";

export const api: AxiosInstance = axios.create({
  baseURL: "https://min-api.cryptocompare.com/data/v2/",
  headers: { authorization: apiKey },
});
