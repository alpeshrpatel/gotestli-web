import React from "react";
import Wrapper from "./Wrapper";
import HomePage1 from "./homes/home-1";
import MetaComponent from "@/components/common/MetaComponent";
import { Button, useTheme } from "@mui/material";

const metadata = {
  title: " Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges."
};
export default function index() {
  const theme = useTheme();
  return (
    <Wrapper >
      <MetaComponent meta={metadata} />
      <HomePage1 />
    </Wrapper>
  );
}
