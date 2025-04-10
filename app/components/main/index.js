import React from "react";
import ProductsComponent from "./products";
import ArticleComponent from "./articles";
import CommentsComponent from "./comments";

const mainComponent = () => {
  return (
    <div>
      <ProductsComponent />
      <ArticleComponent />
      <CommentsComponent />
    </div>
  );
};

export default mainComponent;
