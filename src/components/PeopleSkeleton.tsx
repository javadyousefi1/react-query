import { Skeleton } from "antd";

const PeopleSkeleton = () => {
  return (
    <div className="w-[300px] md:w-[400px] lg:w-[500px] border border-gray-300 rounded-lg  px-8 py-5 my-10 flex items-center gap-x-4">
      <Skeleton.Avatar />
      <Skeleton.Button className="!w-[100px]" />

      <div className="flex justify-start flex-1 ">
        <Skeleton.Button className="!w-[4px] flex-1 ml-10 float-right" />
      </div>
    </div>
  );
};

export default PeopleSkeleton;
