import { useRouter } from "next/router";
import { getAllNewsData } from "../util/services";

export default function slugPage({ allNews }) {
  const router = useRouter();

  let getIndData = allNews.filter(
    (news) =>
      news.title.split(/[^A-Za-z0-9]+/g).join("-") ===
      router.asPath
        .replace("/news/", "")
        .split(/[^A-Za-z0-9]+/g)
        .join("-")
  );
  console.log(router.asPath.replace("/news/", ""));

  return (
    <>
      <div className={"individualPageContainer"}>
        <div>
          <img src={getIndData[0].urlToImage} />
        </div>
        <h1>Title: {getIndData[0].title}</h1>
        <p>Content: {getIndData[0].content}</p>
      </div>
    </>
  );
}

export async function getStaticProps() {
  let allNews = await getAllNewsData("All");
  return {
    props: {
      allNews,
    },
  };
}

export async function getStaticPaths() {
  let getData = await getAllNewsData("All");

  return {
    paths:
      getData?.map(
        (news) => `/news/${news.title.split(/[^A-Za-z0-9]+/g).join("-")}`
      ) || [],
    fallback: true,
  };
}
