import axios from "axios";

export async function getAllPeoples(url: string) {
  const { data } = await axios.get(url);
  return data;
}
