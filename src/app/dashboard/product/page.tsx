"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Fieldset,
  FileInput,
  Group,
  Input,
  Modal,
  Table,
} from "@mantine/core";
import * as Yup from "yup";
import { Pencil1Icon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";
import { ADD_PRODUCT } from "../../graphql/mutations";
import { GET_CATEGORIES, GET_PRODUCTS } from "../../graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import { useDisclosure } from "@mantine/hooks";
import sx from "./page.module.scss";
import ResponsiveText from "@/components/ResponsiveText";

// Define types
interface Variation {
  color: string;
  image?: string;
  size: string;
  editIndex?: boolean | number;
}

interface FormValues {
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
  stock: number;
  variations: Variation[];
}

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  price: Yup.number().required("Required").positive("Must be positive"),
  stock: Yup.number().required("Required").positive("Must be positive"),
});

const Page: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [variation, setVariation] = useState<Variation>({
    color: "",
    image: "",
    size: "",
    editIndex: false,
  });
  const [opened, { open, close }] = useDisclosure(false);

  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const { data: categories } = useQuery(GET_CATEGORIES);

  const [addProduct, { loading: loadingCreation }] = useMutation(ADD_PRODUCT, {
    onError(e) {
      console.log(e);
    },
    onCompleted() {
      formik.resetForm();
      refetch();
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
      stock: 0,
      variations: [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("got");

      addProduct({
        variables: {
          name: values.name,
          description: values.description,
          category: values.category,
          price: parseFloat(values.price),
          stock: values.stock,
          image: file ? file.name : "",
          variations: values.variations.map(({ color, size, image }) => ({
            image,
            color,
            size,
          })),
        },
      })
        .then((response) => {
          console.log("Product added:", response.data);
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    },
  });

  const createVariations = (e: FormEvent) => {
    e.preventDefault();
    if (typeof variation.editIndex === "number") {
      const updatedVar = formik.values.variations.with(
        variation.editIndex,
        variation
      );

      formik.setFieldValue("variations", updatedVar);
    } else {
      formik.setFieldValue("variations", [
        ...formik.values.variations,
        variation,
      ]);
    }
    setVariation({ color: "", image: "", size: "", editIndex: false });
    close();
  };

  useEffect(() => {
    if (data) {
      console.log(data, "hi");
    }
  }, [data]);

  return (
    <div className={sx.container}>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Variation"
        centered
        classNames={{ body: sx.variation }}
      >
        <form className={sx.form} onSubmit={createVariations}>
          <Input.Wrapper
            label="Color"
            error={
              formik.touched.variations && formik.errors.variations?.[0]?.color
            }
          >
            <Input
              type="color"
              value={variation.color}
              onChange={(e) =>
                setVariation({ ...variation, color: e.currentTarget.value })
              }
            />
          </Input.Wrapper>

          <Input.Wrapper
            label="Size"
            error={
              formik.touched.variations && formik.errors.variations?.[0]?.color
            }
          >
            <Input
              value={variation.size}
              onChange={(e) =>
                setVariation({ ...variation, size: e.currentTarget.value })
              }
            />
          </Input.Wrapper>
          <Input.Wrapper
            error={
              formik.touched.variations && formik.errors.variations?.[0]?.image
            }
          >
            <FileInput
              clearable
              // value={variation?.image}
              onChange={(file) => {
                setVariation({ ...variation, image: file?.name });
              }}
              label="Product Image"
              placeholder="Select Product Image"
            />
          </Input.Wrapper>
          <Button type="submit" loading={loadingCreation}>
            Create
          </Button>
        </form>
      </Modal>

      <form onSubmit={formik.handleSubmit}>
        <Fieldset legend="Create Product" classNames={{ root: sx.form }}>
          <Input.Wrapper
            label="Product Name"
            error={formik.touched.name && formik.errors.name}
          >
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label="Description"
            error={formik.touched.description && formik.errors.description}
          >
            <Input
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label="Category"
            error={formik.touched.category && formik.errors.category}
          >
            <Input
              name="category"
              component="select"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Category</option>
              {categories?.getCategories?.map(
                (category: { label: string; _id: string }, index: number) => (
                  <option value={category._id} key={index}>
                    {category.label}
                  </option>
                )
              )}
            </Input>
          </Input.Wrapper>
          <Input.Wrapper
            label="Price"
            error={formik.touched.price && formik.errors.price}
          >
            <Input
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Input.Wrapper>

          <Input.Wrapper
            label="Stock"
            error={formik.touched.stock && formik.errors.stock}
          >
            <Input
              name="stock"
              type="number"
              value={formik.values.stock}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Input.Wrapper>

          <div className={sx.var}>
            <label>Variations</label>
            <Group className={sx.variationGroup}>
              {formik.values.variations.map((e, index) => (
                <div
                  key={index}
                  className={sx.circle}
                  style={{ background: e.color }}
                  onClick={() => {
                    setVariation({ ...e, editIndex: index });
                    open();
                  }}
                >
                  {e.size}
                </div>
              ))}
              <div
                className={sx.circle}
                onClick={() => {
                  setVariation({
                    color: "",
                    size: "",
                    image: "",
                    editIndex: false,
                  });
                  open();
                }}
              >
                <PlusIcon alignmentBaseline="middle" />
              </div>
            </Group>
          </div>

          <FileInput
            clearable
            value={file}
            onChange={setFile}
            label="Product Image"
            placeholder="Select Product Image"
          />
          <Button type="submit">Create</Button>
        </Fieldset>
      </form>

      <Table
        striped
        withTableBorder
        classNames={{ table: sx.table }}
        horizontalSpacing="md"
        verticalSpacing="md"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Product Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Stock</Table.Th>

            <Table.Th>Category</Table.Th>
            <Table.Th>Variations</Table.Th>
            <Table.Th>Image</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.getProducts?.map((element: any) => (
            <Table.Tr key={element?._id}>
              <Table.Td>{element?.name}</Table.Td>
              <Table.Td>{element?.description}</Table.Td>
              <Table.Td>{element?.price}</Table.Td>
              <Table.Td>{element?.stock}</Table.Td>
              <Table.Td>{element?.category}</Table.Td>
              <Table.Td>
                {element?.variations?.map((e: Variation, index: number) => (
                  <Badge key={index} size="xs" circle color={e.color}></Badge>
                ))}
              </Table.Td>
              <Table.Td>
                <img src={element?.image} alt="Product Image" />
              </Table.Td>
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
