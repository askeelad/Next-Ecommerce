import React from "react";
import PageHeader from "../../../_components/PageHeader";
import ProductsForm from "../../_components/ProductsForm";
import db from "@/db/db";

const EditProductPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await db.product.findUnique({ where: { id: id } });
  console.log("product");
  console.log(product);
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductsForm product={product} />
    </>
  );
};

export default EditProductPage;
