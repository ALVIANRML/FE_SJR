import { Divider } from "antd";

export default function DividerComponent({Teks}) {
  return (
    <div>
      <Divider
        titlePlacement="left"
        style={{ fontSize: "30px", border: "10px" }}
      >
        <p className="font-mono">{Teks}</p>
      </Divider>
    </div>
  );
}
