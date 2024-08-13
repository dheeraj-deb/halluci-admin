"use client";
import { Badge, Button, Table } from "@mantine/core";
import React, { useEffect } from "react";
import sx from "./page.module.scss";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/query";
import { ACTIVATE } from "../../graphql/mutations";

const Page = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [activate, { loading: activationLoading }] = useMutation(ACTIVATE);
  const handleApprove = async (id: string) => {
    if (!id) return;
    await activate({
      variables: {
        id,
      },
    });
    refetch();
  };

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
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.getUsers?.map((element: any) => (
            <Table.Tr key={element?.id}>
              <Table.Td>{element?.name}</Table.Td>
              <Table.Td>{element?.shopname}</Table.Td>
              <Table.Td>{element?.phone}</Table.Td>
              <Table.Td>{element?.address?.city},{element?.address?.state}</Table.Td>

              <Table.Td>
                <div className={sx.tableBtn}>
                  {element?.verified ? (
                    <Button
                      color="green"
                      onClick={() => handleApprove(element?.id)}
                    >
                      Approved
                    </Button>
                  ) : (
                    <Button
                      color="blue"
                      onClick={() => handleApprove(element?.id)}
                    >
                      Approve
                    </Button>
                  )}
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
