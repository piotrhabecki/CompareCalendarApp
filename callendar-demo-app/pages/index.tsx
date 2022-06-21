import type { NextPage } from "next";
import Head from "next/head";
import CallendarApp from "../src/components/CallendarApp/CallendarApp";

import { getMonth } from "../src/utilities/utils";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Callendar app</title>
        <meta
          name="description"
          content="Callendar app - add hours of your availibility and share it with others"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CallendarApp />
    </div>
  );
};

export default Home;
