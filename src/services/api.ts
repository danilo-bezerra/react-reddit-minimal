import axios from "axios";

export const redditApi = axios.create({
  baseURL: "https://www.reddit.com/",
});
