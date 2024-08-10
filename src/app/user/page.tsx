"use client";
import { Badge, Button, Table } from "@mantine/core";
import React from "react";
import sx from "./page.module.scss";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useQuery } from "@apollo/client";
import { GetUsers } from "../graphql/query";

const Page = () => {
  const { loading, error, data } = useQuery(GetUsers);

  return (
    <div>
      <Table
        striped
        withTableBorder
        classNames={{ table: sx.table }}
        horizontalSpacing="md"
        verticalSpacing="md"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Shop Name</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Address</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.getProducts?.map((element: any) => (
            <Table.Tr key={element?._id}>
              <Table.Td>{element?.name}</Table.Td>
              <Table.Td>{element?.shopname}</Table.Td>
              <Table.Td>{element?.phone}</Table.Td>
              <Table.Td>{element?.phone}</Table.Td>

              <Table.Td>
                <div className={sx.tableBtn}>
                  <Button>
                    <Pencil1Icon />
                  </Button>
                  <Button color="red">
                    <TrashIcon />
                  </Button>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default Page;
