import "./App.css";
// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// pages
import Home from "./pages/home";
import InfinityScroll from "./pages/InfinityScroll";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import Layout from "./layout/Layout";
function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/infinity-scroll",
      element: (
        <Layout>
          <InfinityScroll />
        </Layout>
      ),
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
