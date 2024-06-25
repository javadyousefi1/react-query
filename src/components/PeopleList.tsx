import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { getAllPeoples } from "../services/people";
import { Avatar, Button } from "antd";
import PeopleSkeleton from "../components/PeopleSkeleton";

const PeopleList = () => {
  const initalUrl = "https://swapi.dev/api/people/?page=1&format=json";

  const {
    data: peopleData,
    isLoading,
    isFetching,
    hasNextPage,
    isError,
    fetchNextPage,
    error,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = initalUrl }) => getAllPeoples(pageParam as string),
    queryKey: ["people"],
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
    refetchOnMount: false,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-[300px] md:w-[400px] lg:w-[500px]">
          {Array.from({ length: 10 }).map(() => (
            <PeopleSkeleton />
          ))}
        </div>
      </div>
    );

  if (isError) return <>{error.toString()}</>;
  return (
    <>
      <InfiniteScroll
        // pageStart={0}
        loadMore={() => {
          if (!isFetching && hasNextPage) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
        loader={
          <>
            <PeopleSkeleton />
            <PeopleSkeleton />
            <PeopleSkeleton />
          </>
        }
      >
        {peopleData?.pages?.map((item) => {
          return item?.results?.map((innerItem, index) => {
            return (
              <div className="w-[300px] md:w-[400px] lg:w-[500px] border border-gray-300 rounded-lg  px-8 py-5 my-10 flex items-center gap-x-4">
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
                <span className="whitespace-nowrap">{innerItem.name}</span>
                <div className="flex justify-end flex-1">
                  <Button>{innerItem.birth_year}</Button>
                </div>
              </div>
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
};

export default PeopleList;
