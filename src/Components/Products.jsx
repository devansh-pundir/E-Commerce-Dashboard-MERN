import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let res = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    res = await res.json();
    setProducts(res);
  };
  console.log("Products", products);
  const deleteProduct = async (productId) => {
    let res = await fetch(`http://localhost:5000/delete/${productId}`, {
      method: "DELETE",
    });
    res = await res.json();
    if (res) {
      alert("Deleted");
    }
  };

  // Search Handle
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <>
      <div className="wrapper">
        <h1 className="products-headline">Products List</h1>
        {/* Search Bar */}
        <input
          type="search"
          placeholder="Search Product"
          onChange={searchHandle}
        />
        {products.map((item, index) => {
          return (
            <>
              <ul className="products-list">
                <li>Serial Number - {index}</li>
                <li>Name - {item.name}</li>
                <li>Price - {item.price}</li>
                <li>Category - {item.category}</li>
                <li>Company - {item.company}</li>
                <li>
                  Operation -{" "}
                  <button onClick={() => deleteProduct(item._id)}>
                    Delete
                  </button>
                  <Link to={"/update/" + item._id}>Update</Link>
                </li>
              </ul>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Products;
