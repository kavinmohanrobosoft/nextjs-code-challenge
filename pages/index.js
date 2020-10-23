import Head from "next/head";
import Link from "next/link";
import { getAllNewsData } from "./util/services";

export default function AllNews({ newsList }) {
  //All the page in this app are qualifies for Automatic Static Optimization 
  return (
    <div className={"mainContainer"}>
      <Head>
        <title>Next News App</title>
        <link ref="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to Next - News App</h1>
      </main>
      {newsList.map((items) => {
        const {
          urlToImage,
          title,
          publishedAt,
          source,
          description,
          author,
        } = items;

        return (
          <div key={title} className={"container"}>
            <div className={"imageContainer"}>
              <img src={urlToImage}></img>
            </div>
            <div className={"textContainer"}>
              <p>Title: {title}</p>
              <p>
                <b>Source:</b> {source.name}
              </p>
              <p>
                <b>Description:</b> {description}
              </p>
              <p>
                <b>Author:</b> {author}
              </p>
              <Link
                href={{
                  pathname: `/news/${title.split(/[^A-Za-z0-9]+/g).join("-")}`,
                }}
              >
                <a>Read more...</a>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  let newsList = await getAllNewsData("All");

  return {
    props: {
      newsList,
    },
  };
}
