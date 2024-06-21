import { useQuery } from "@tanstack/react-query";
import { getAllCommentsByPostId } from "../services/blog";
import { Spin } from "antd";

const CommentList: React.FC<{ selectedPostComment: null | number }> = ({
  selectedPostComment,
}) => {
  const { data: commentData, isLoading } = useQuery({
    queryKey: ["comments", selectedPostComment],
    queryFn: () => getAllCommentsByPostId(selectedPostComment as number),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10 flex-col gap-y-5">
        <Spin />
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-y-2 mt-5 text-lg">
      <div>
        <span className="font-bold">Email :</span>{" "}
        <span>{commentData?.email}</span>
      </div>
      <div>
        <span className="font-bold">Name :</span>{" "}
        <span>{commentData?.name}</span>
      </div>
      <div>
        <span className="font-bold">Comment :</span>{" "}
        <span>{commentData?.body}</span>
      </div>
    </div>
  );
};

export default CommentList;
