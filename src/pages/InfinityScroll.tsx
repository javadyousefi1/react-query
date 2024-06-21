import PeopleList from "../components/PeopleList";
import Header from "../shared/Header";

const InfinityScroll = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <Header decription="InfinityScroll"/>
      <PeopleList />
    </section>
  );
};

export default InfinityScroll;
