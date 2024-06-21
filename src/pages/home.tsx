import React from "react";
import BlogList from "../components/BlogList";
import Header from "../shared/Header";

const Home: React.FC = () => {
  return (
    <section className="container flex flex-col items-center justify-center max-w-6xl mx-auto mb-20">
      <Header decription="get data"/>
      <BlogList />
    </section>
  );
};

export default Home;
