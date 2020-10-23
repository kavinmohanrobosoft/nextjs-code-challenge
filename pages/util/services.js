import * as api from "./constants";

export async function getAllNewsData(newstitle) {
  let getData = await fetch(
    `${api.BASE_URL}everything${api.URL_PARAM}${api.KEY}`
  );
  let jsonData = await getData.json();
  let newsList = await jsonData.articles;

  if (newstitle === "All") return newsList;
}
