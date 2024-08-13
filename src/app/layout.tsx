"use client";
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import "./globals.scss";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { ApolloProvider } from "@apollo/client";
import client from "./graphql";
import AuthProvider from "@/components/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        {
          <ApolloProvider client={client}>
            <AuthProvider>
              <MantineProvider>
              <Notifications />
                {children}
                </MantineProvider>
            </AuthProvider>
          </ApolloProvider>
        }
      </body>
    </html>
  );
}
