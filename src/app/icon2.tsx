import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

const cream = "#fff7ed";
const ink = "#3f302f";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f47c57",
          borderRadius: 16,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: cream,
            borderRadius: 4,
            display: "flex",
            height: 20,
            left: 12,
            position: "absolute",
            top: 12,
            transform: "rotate(45deg)",
            width: 20,
          }}
        />
        <div
          style={{
            background: cream,
            borderRadius: 4,
            display: "flex",
            height: 20,
            position: "absolute",
            right: 12,
            top: 12,
            transform: "rotate(45deg)",
            width: 20,
          }}
        />
        <div
          style={{
            background: cream,
            borderRadius: "48% 48% 44% 44%",
            display: "flex",
            height: 39,
            left: 10,
            position: "absolute",
            top: 17,
            width: 44,
          }}
        />
        <div
          style={{
            background: ink,
            borderRadius: "50%",
            display: "flex",
            height: 6,
            left: 20,
            position: "absolute",
            top: 32,
            width: 5,
          }}
        />
        <div
          style={{
            background: ink,
            borderRadius: "50%",
            display: "flex",
            height: 6,
            position: "absolute",
            right: 20,
            top: 32,
            width: 5,
          }}
        />
        <div
          style={{
            background: "#d9675d",
            borderRadius: "50% 50% 60% 60%",
            display: "flex",
            height: 5,
            left: 29,
            position: "absolute",
            top: 41,
            width: 6,
          }}
        />
        <div
          style={{
            background: ink,
            borderRadius: 2,
            display: "flex",
            height: 2,
            left: 25,
            position: "absolute",
            top: 48,
            transform: "rotate(-28deg)",
            width: 8,
          }}
        />
        <div
          style={{
            background: ink,
            borderRadius: 2,
            display: "flex",
            height: 2,
            position: "absolute",
            right: 25,
            top: 48,
            transform: "rotate(28deg)",
            width: 8,
          }}
        />
        <div
          style={{
            background: ink,
            borderRadius: 2,
            display: "flex",
            height: 2,
            left: 3,
            position: "absolute",
            top: 40,
            transform: "rotate(8deg)",
            width: 13,
          }}
        />
        <div
          style={{
            background: ink,
            borderRadius: 2,
            display: "flex",
            height: 2,
            left: 3,
            position: "absolute",
            top: 45,
            transform: "rotate(-8deg)",
            width: 13,
          }}
        />
        <div
          style={{
            background: ink,
            borderRadius: 2,
            display: "flex",
            height: 2,
            position: "absolute",
            right: 3,
            top: 40,
            transform: "rotate(-8deg)",
            width: 13,
          }}
        />
        <div
          style={{
            background: ink,
            borderRadius: 2,
            display: "flex",
            height: 2,
            position: "absolute",
            right: 3,
            top: 45,
            transform: "rotate(8deg)",
            width: 13,
          }}
        />
      </div>
    ),
    size,
  );
}
