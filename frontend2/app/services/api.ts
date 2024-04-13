import axios from "axios";

export const api = axios.create({
  baseURL: `https://${process.env.NEXT_PROD_URL}`,
});
