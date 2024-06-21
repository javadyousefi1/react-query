import { Skeleton } from "antd";

const BlogSkeleton = () => {
  return (
    <div className="flex flex-col items-center w-full px-4 py-5 border-b border-gray-200 gap-x-4 md:flex-row gap-y-4">
      <Skeleton avatar paragraph={{ rows: 3 }} />
      <Skeleton.Image className="!h-[200px] !w-[300px]" />
    </div>
  );
};

export default BlogSkeleton;
