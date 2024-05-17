import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Table from "./Table";

export default {
  title: "components/Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  searchConfig: [
    {
      id: "name",
      type: "text",
      label: "Họ và tên",
    },
    {
      id: "birthday",
      type: "date",
      label: "Ngày sinh",
    },
    {
      id: "position",
      type: "select",
      label: "Chức vụ",
      options: [
        { value: "PROJECT_MANAGER", label: "Quản lý dự án" },
        { value: "DEVELOPER", label: "Lập trình viên" },
      ],
    },
  ],
  config: [
    { key: "avatar", type: "image", name: "Ảnh đại diện" },
    { key: "name", type: "markdown", name: "Họ và tên" },
    { key: "birthday", type: "date", name: "Ngày sinh" },
    { key: "link", type: "link", name: "Tài liệu" },
    {
      key: "position",
      type: "map",
      name: "Chức vụ",
      options: [
        { value: "PROJECT_MANAGER", label: "Quản lý dự án" },
        { value: "DEVELOPER", label: "Lập trình viên" },
      ],
    },
    { key: "salary", type: "currency", name: "Lương" },
    { key: "lastUpdate", type: "datetime", name: "Cập nhật lần cuối lúc" },
  ],
  data: [
    {
      name: "<b>123123123</b>",
      birthday: "1994-07-26T00:00:00.000Z",
      salary: 30000000,
      position: "DEVELOPER",
      link: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
      avatar:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
      lastUpdate: new Date().toISOString(),
    },
    {
      name: "Phan Thanh Tùng2",
      birthday: "1994-07-26T00:00:00.000Z",
      salary: 30000000,
      position: "DEVELOPER",
      link: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
      avatar:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    },
    {
      name: "Phan Thanh Tùng3",
      birthday: "1994-07-26T00:00:00.000Z",
      salary: 30000000,
      position: "DEVELOPER",
      link: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
      avatar:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    },
    {
      name: "Phan Thanh Tùng4",
      birthday: "1994-07-26T00:00:00.000Z",
      salary: 30000000,
      position: "DEVELOPER",
      avatar:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    },
    {
      name: "Phan Thanh Tùng5",
      birthday: "1994-07-26T00:00:00.000Z",
      salary: 30000000,
      position: "DEVELOPER",
    },
    {
      name: "Phan Thanh Tùng1",
      birthday: "1994-07-26T00:00:00.000Z",
      salary: 30000000,
      position: "DEVELOPER",
      link: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
      avatar:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
      lastUpdate: new Date().toISOString(),
    },
    {
      name: "Phan Thanh Tùng2",
      birthday: "1994-07-26T00:00:00.000Z",
      salary: 30000000,
      position: "DEVELOPER",
      link: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
      avatar:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    },
    {
      name: "Phan Thanh Tùng3",
      birthday: "1994-07-26T00:00:00.000Z",
      salary: 30000000,
      position: "DEVELOPER",
      link: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
      avatar:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    },
    {
      name: "Phan Thanh Tùng4",
      birthday: "1994-07-26T00:00:00.000Z",
      salary: 30000000,
      position: "DEVELOPER",
      avatar:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    },
    {
      name: "Phan Thanh Tùng5",
      birthday: "1994-07-26T00:00:00.000Z",
      salary: 30000000,
      position: "DEVELOPER",
    },
  ],
  actions: ["VIEW", "EDIT", "REMOVE", { code: "TEST", name: "test" }],
  server: false,
  rowsTotal: 100,
  rowsPerPageOptions: [5, 20, 40, 80, 100, { label: "All", value: -1 }],
  onRowsPerPage: (rowsPerPage, newPage) => {
    console.log(newPage);
    console.log(rowsPerPage);
  },
  onAction: (action: any, data: any) => {
    console.log(action);
    console.log(data);
  },
  onAdd: () => {
    console.log("add");
  },
  onSearch: (data: any) => {
    console.log(data);
  },
  onPage: (newPage, rowsPerPage) => {
    console.log(newPage);
    console.log(rowsPerPage);
  },
  loading: false,
};
