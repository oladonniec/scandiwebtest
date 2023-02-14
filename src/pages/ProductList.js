import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState(null);
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url =
        "https://scandiwebphpapi.000webhostapp.com/scandiback/api/getProducts.php";
      await axios.get(url).then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
      });
    }
    fetchData();
  }, []);

  const toggleCheckBox = (e, product) => {
    if (e.target.checked) {
      let arr = checkedBoxes;
      arr.push(product.sku);
      setCheckedBoxes(arr);
    } else {
      let items = checkedBoxes.splice(checkedBoxes.indexOf(product.sku), 1);
      setCheckedBoxes(items);
    }
    console.log(checkedBoxes);
  };

  const handleDelete = async () => {
    let deleteData = new FormData();
    deleteData.append("skus", checkedBoxes);
    const url =
      "https://scandiwebphpapi.000webhostapp.com/scandiback/api/deleteProducts.php";
    await axios
      .post(url, deleteData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    window.location.reload(true);
  };

  return (
    <div className="productListContainer">
      <div className="row between">
        <h2>Product List</h2>
        <div className="controlBtns">
          <button
            id="add-button"
            onClick={() => {
              navigate("/addproduct");
            }}
          >
            ADD
          </button>
          <button id="delete-product-btn" onClick={handleDelete}>
            Mass Delete
          </button>
        </div>
      </div>
      <hr></hr>
      <div className="product-list">
        <div className="products row center">
          {products ? (
            products?.map((product) => (
              <div className="card" key={product.sku}>
                <div>
                  <input
                    type="checkbox"
                    className="delete-checkbox"
                    value={product.sku}
                    checked={checkedBoxes.find(
                      (item) => item.sku === product.sku
                    )}
                    onChange={(e) => toggleCheckBox(e, product)}
                  />
                </div>
                <ul>
                  <li>SKU: {product.sku}</li>
                  <li>Name: {product.name}</li>
                  <li>Price: {product.price}</li>
                  {product.product_type === "disc" ? (
                    <li>Size: {product.size} MB</li>
                  ) : product.product_type === "book" ? (
                    <li>Weight: {product.weight} KG</li>
                  ) : (
                    <li>Dimension: {product.dimension}</li>
                  )}
                </ul>
              </div>
            ))
          ) : (
            <div>Product Not Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
