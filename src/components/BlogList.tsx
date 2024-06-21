import React, { useEffect, useState } from "react";
// antd
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Modal, Pagination, Space } from "antd";
// react query
import { useQuery, useQueryClient } from "@tanstack/react-query";
// services
import { getAllBlogs } from "../services/blog";
import CommentList from "./CommentsList";
import BlogSkeleton from "./BLogsSkeleton";

const MAX_PAGE_SIZE = 5;

const BlogList: React.FC = () => {
  const queryClient = useQueryClient();

  const [selectedPostComment, setSelectedPostComment] = useState<null | number>(
    1
  );
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let nextPage = pageIndex + 1;
    if (nextPage > MAX_PAGE_SIZE) return;

    queryClient.prefetchQuery({
      queryKey: ["get-blogs", nextPage],
      queryFn: () => getAllBlogs(pageIndex),
      retry: false,
    });
  }, [pageIndex]);

  const handleSetPageIndex = (pageIndex: number) => setPageIndex(pageIndex);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    data: blogsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-blogs", pageIndex],
    queryFn: () => getAllBlogs(pageIndex),
    retry: false,
  });

  const data = blogsData?.map(
    (item: {
      id: number;
      title: string;
      avatar: string;
      description: string;
      href: string;
      content: string;
      body: string;
    }) => {
      return {
        ...item,
        id: item.id,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`,
        description: item.body + " " + item.title,
        content: item.body,
        href: "https://ant.design",
      };
    }
  );

  if (isLoading)
    return (
      <>
        {Array.from({ length: 10 }).map(() => (
          <BlogSkeleton />
        ))}
      </>
    );
  if (isError) return <>{error.toString()}</>;

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        footer={
          <div>
            Powered By <b>React-Query</b>
          </div>
        }
        renderItem={(item: {
          id: number;
          title: string;
          avatar: string;
          description: string;
          href: string;
          content: string;
        }) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                onClick={() => {
                  showModal();
                  setSelectedPostComment(item.id);
                }}
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
      <Pagination
        defaultCurrent={pageIndex}
        total={MAX_PAGE_SIZE * 10}
        onChange={(pageIndex: number) => handleSetPageIndex(pageIndex)}
      />
      {/* comments modal */}
      <Modal
        title="Comments "
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[]}
      >
        <CommentList selectedPostComment={selectedPostComment} />
      </Modal>
    </>
  );
};

export default BlogList;

// light components
const IconText = ({
  icon,
  text,
  onClick,
}: {
  icon: React.FC;
  text: string;
  onClick?: () => void;
}) => (
  <Space onClick={onClick} className="cursor-pointer">
    {React.createElement(icon)}
    {text}
  </Space>
);
