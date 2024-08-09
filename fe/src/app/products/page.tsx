import productAPI from "./api";

const Products = async () => {
  const products = await productAPI.getProducts();
  console.log(products);
  return (
    <>
      <h1>Products</h1>
      <ul>
        {products?.data?.map((product) => (
          <li key={product.id}>1</li>
        ))}
      </ul>
    </>
  );
};

export default Products;
