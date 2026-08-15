import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

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
            background: "#fff7ed",
            borderRadius: "50% 50% 46% 46%",
            bottom: 10,
            display: "flex",
            height: 27,
            position: "absolute",
            transform: "rotate(180deg)",
            width: 34,
          }}
        />
        <div
          style={{
            background: "#fff7ed",
            borderRadius: "50%",
            display: "flex",
            height: 14,
            left: 8,
            position: "absolute",
            top: 23,
            transform: "rotate(-20deg)",
            width: 12,
          }}
        />
        <div
          style={{
            background: "#fff7ed",
            borderRadius: "50%",
            display: "flex",
            height: 16,
            left: 20,
            position: "absolute",
            top: 12,
            transform: "rotate(-8deg)",
            width: 13,
          }}
        />
        <div
          style={{
            background: "#fff7ed",
            borderRadius: "50%",
            display: "flex",
            height: 16,
            position: "absolute",
            right: 20,
            top: 12,
            transform: "rotate(8deg)",
            width: 13,
          }}
        />
        <div
          style={{
            background: "#fff7ed",
            borderRadius: "50%",
            display: "flex",
            height: 14,
            position: "absolute",
            right: 8,
            top: 23,
            transform: "rotate(20deg)",
            width: 12,
          }}
        />
      </div>
    ),
    size,
  );
}
