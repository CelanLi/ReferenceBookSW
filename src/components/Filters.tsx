import React from "react";
import {
  UserOutlined,
  EyeOutlined,
  RedditOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Radio, Checkbox } from "antd";

const menuFliters = [
  { icon: UserOutlined, name: "Gender", type: "radio" },
  { icon: EyeOutlined, name: "Eye color", type: "checkbox" },
  { icon: RedditOutlined, name: "Species", type: "checkbox" },
  { icon: PlaySquareOutlined, name: "Film", type: "radio" },
];

const genderOptions = ["male", "female", "n/a"];
const eyeColorOptions = ["blue", "yellow", "red"];
const speciesOptions = ["Human", "Droid", "Wookie"];
const filmOptions = [
  "A New Hope",
  "The Empire Strikes Back",
  "Return of the Jedi",
];

const filters: MenuProps["items"] = menuFliters.map((fliter, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(fliter.icon),
    label: fliter.name,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

function Filters() {
  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1", "sub2", "sub3", "sub4"]}
        style={{ height: "100%" }}
        items={filters}
      />
    </>
  );
}

export default Filters;
