import React, { useState } from "react";

const AddProduct = () => {
  //   STATES
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setCompany] = useState();

  // Error State
  const [error, setError] = useState(false);

  //   HANDLE ADD
  const handleAdd = async () => {
    // Adding Form Validation
    if (!name || !category || !price || !company) {
      setError(true);
      return false;
    }

    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    let res = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, company, userId, category }),
    });
    res = await res.json();
    console.log(res);
  };
  return (
    <>
      <div className="wrapper">
        <h1 className="add-product-headline">Add Product</h1>
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
          {error && !name && <span>Enter Valid Name</span>}
          <input
            type="text"
            placeholder="Enter Product Price"
            name="price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          {error && !price && <span>Enter Valid Price</span>}
          <input
            type="text"
            placeholder="Enter Product Category"
            name="category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
          {error && !category && <span>Enter Valid Category</span>}
          <input
            type="text"
            placeholder="Enter Product Company"
            name="company"
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
            }}
          />
          {error && !company && <span>Enter Valid Company</span>}
          <button type="submit" onClick={handleAdd}>
            Add Product
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
