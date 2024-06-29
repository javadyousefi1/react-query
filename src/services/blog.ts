import axios from "axios";

export async function getAllBlogs(currentPage: number) {
  // await new Promise((resolve, _) => setTimeout(resolve, 1000));
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`
  );
  return data;
}

export async function getAllCommentsByPostId(postId: number) {
  // await new Promise((resolve, _) => setTimeout(resolve, 1000));
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/comments/${postId}`
  );
  return data;
}
