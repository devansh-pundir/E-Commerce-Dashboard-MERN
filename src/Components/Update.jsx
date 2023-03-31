import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  //   States
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setCompany] = useState();

  const params = useParams();
  const navigate = useNavigate();

  const getProductDetail = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCompany(result.company);
    setCategory(result.category);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  //   Handle Update
  const updateProduct = async () => {
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "PUT",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, category, company }),
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };
  return (
    <>
      <div className="wrapper">
        <h1 className="add-product-headline">Update Product</h1>
        <div className="form">
          <input
            type="text"
            placeholder="Enter Product Name"
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Enter Product Price"
            name="price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter Product Category"
            name="category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Enter Product Company"
            name="company"
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
            }}
          />

          <button type="submit" onClick={() => updateProduct()}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default Update;
