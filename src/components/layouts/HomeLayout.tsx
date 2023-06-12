import React from 'react';
import { Container } from "@mui/material";
import { useRef } from "react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  const ref = useRef(null);

  return (
    <Container  component="main" ref={ref}>
      <Outlet />
    </Container>
  );
}

export default HomeLayout;
