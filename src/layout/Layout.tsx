import { ReactNode } from "react";
import { LinkOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const items = [
    {
      label: "home page",
      key: "1",
      icon: <LinkOutlined />,
      href: "/",
    },
    {
      label: "infinity scroll",
      key: "2",
      icon: <OrderedListOutlined />,
      href: "/infinity-scroll",
    },
  ];

  const menuProps = {
    items,
    onClick: (menu) => {
      const href = items.find((item) => item.key === menu.key)?.href;
      navigate(href);
    },
  };
  return (
    <main>
      <Dropdown
        menu={menuProps}
        className="fixed shadow-lg md:top-5 md:left-5 top-2 left-2"
      >
        <Button>
          <LinkOutlined />
        </Button>
      </Dropdown>
      {children}
    </main>
  );
};

export default Layout;
