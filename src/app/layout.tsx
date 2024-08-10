// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
"use client";
import "@mantine/core/styles.css";
import "./globals.scss";
import sx from "./page.module.scss";
import Logo from "./assets/logo.svg";
import {
  AppShell,
  Burger,
  Button,
  ColorSchemeScript,
  MantineProvider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const nav = useRouter();
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ApolloProvider client={client}>
          <MantineProvider>
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
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                />
                <div className={sx.logo}>
                  {"Helluci"}
                  <Logo />
                </div>
              </AppShell.Header>

              <AppShell.Navbar p="md">
                <Button mt="sm" onClick={() => nav.push("/")}>
                  Dashboard
                </Button>
                <Button mt="sm" onClick={() => nav.push("/product")}>
                  Product management
                </Button>
                <Button mt="sm" onClick={() => nav.push("/user")}>
                  User management
                </Button>
              </AppShell.Navbar>

              <AppShell.Main> {children}</AppShell.Main>
            </AppShell>
          </MantineProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
