"use client";
import { AppShell, Burger, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import sx from './page.module.scss'
import Logo from "./assets/logo.svg"
import { useRouter } from "next/navigation";
function Page() {
  const [opened, { toggle }] = useDisclosure();
  const nav = useRouter()

  return (
    <>
    Overview
    </>
  );
}
export default Page;
