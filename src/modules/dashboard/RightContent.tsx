import { styled } from "@mui/material";
import DatePickerSimple from "../../components/common/DatePickerSimple";
import InputSimple from "../../components/common/InputSimple";
import SelectSimple from "../../components/common/SelectSimple";
import LayoutMenu from "../layout/LayoutMenu";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const menuItems = [
  {
    label: "Thông tin tai nạn",
    path: "/dashboard",
  },
  {
    label: "Phân công giám định",
    path: "/2",
  },
  {
    label: "Đánh giá báo cáo giám định",
    path: "/3",
  },
  {
    label: "Tài liệu hình ảnh hồ sơ",
    path: "/4",
  },
  {
    label: "Kết quả giám định",
    path: "/5",
  },
];

const Group = styled("div")({
  display: "grid",
  gridGap: "20px",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
});

const RightContent = () => {
  return (
    <LayoutMenu menuItems={menuItems}>
      <div>
        <br></br>
        <DatePickerSimple label="Thời gian xảy ra" />
        <br></br>
        <InputSimple
          label="Địa điểm xảy ra"
          placeholder="Nhập..."
          icon={<LocationOnOutlinedIcon />}
        />
        <br></br>
        <Group>
          <SelectSimple
            label="Tỉnh thành"
            options={[{ label: "Hà Nội", value: "hanoi" }]}
            placeholder="Chọn"
          />
          <SelectSimple label="Quận / Huyện" options={[]} placeholder="Chọn" />
          <SelectSimple label="Phường / Xã" options={[]} placeholder="Chọn" />
          <SelectSimple
            label="Nhóm nguyên nhân"
            options={[]}
            placeholder="Chọn"
          />
        </Group>
        <br></br>
        <InputSimple label="Nhóm sự kiện bảo hiểm" placeholder="Nhập..." />
        <br></br>
        <Group>
          <InputSimple label="Nguyên nhân" placeholder="Nhập..." />
          <InputSimple label="Hậu quả" placeholder="Nhập..." />
        </Group>
        <br></br>
        <Group>
          <InputSimple label="Họ và tên lái xe" placeholder="Nhập..." />
          <InputSimple label="Điện thoại" placeholder="Nhập..." />
          <InputSimple label="Email" placeholder="Nhập..." />
        </Group>
        <br></br>
        <Group>
          <InputSimple label="Họ và tên lái xe" placeholder="Nhập..." />
          <InputSimple label="Điện thoại" placeholder="Nhập..." />
        </Group>
        <br></br>
        <Group>
          <InputSimple label="Họ và tên lái xe" placeholder="Nhập..." />
          <InputSimple label="Điện thoại" placeholder="Nhập..." />
        </Group>
        <br></br>
        <Group>
          <InputSimple label="Họ và tên lái xe" placeholder="Nhập..." />
          <InputSimple label="Điện thoại" placeholder="Nhập..." />
          <InputSimple label="Email" placeholder="Nhập..." />
        </Group>
      </div>
    </LayoutMenu>
  );
};

export default RightContent;
