"use client";
import React from "react";
import Logo from "../assets/logo.svg";
import { AppShell, Box, Burger, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import sx from "./layout.module.scss";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const nav = useRouter();
  const [logout, { loading }] = useMutation(LOGOUT, {
    onCompleted: () => {
      nav.push("/login");
    },
  });
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Box hiddenFrom="sm" className={sx.logo}>
          <Burger opened={opened} onClick={toggle} size="sm" />
        </Box>
        <Box visibleFrom="sm" className={sx.logo}>
          {"Helluci"}
          {/* <Logo /> */}
        </Box>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Button mt="sm" onClick={() => nav.push("/dashboard")}>
          Dashboard
        </Button>
        <Button mt="sm" onClick={() => nav.push("/dashboard/product")}>
          Product management
        </Button>
        <Button mt="sm" onClick={() => nav.push("/dashboard/user")}>
          User management
        </Button>
        <Button loading={loading} mt="sm" onClick={() => logout()}>
          Logout
        </Button>
      </AppShell.Navbar>

      <AppShell.Main> {children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
