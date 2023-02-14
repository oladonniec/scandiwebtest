import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [productForm, setProductForm] = useState({
    product_type: "",
    sku: "",
    name: "",
    price: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });

  const [errors, setErrors] = useState({
    product_type: "",
    sku: "",
    name: "",
    price: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });

  const handleChange = (event) => {
    setProductForm({
      ...productForm,
      [event.target.name]: event.target.value,
    });

    setErrors({
      ...errors,
      [event.target.name]: event.target.value ? "" : "This field is required",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isFormValid = true;

    setErrors({});

    if (!productForm.sku) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        sku: "SKU is required",
      }));
      isFormValid = false;
    }

    if (!productForm.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      isFormValid = false;
    }

    if (!productForm.price) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "Price is required",
      }));
      isFormValid = false;
    }

    if (!productForm.product_type) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        product_type: "Product Type is required",
      }));
      isFormValid = false;
    }

    if (productForm.product_type === "disc") {
      if (!productForm.size) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          size: "Size is required",
        }));
        isFormValid = false;
      }
    }

    if (productForm.product_type === "book") {
      if (!productForm.weight) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          weight: "Weight is required",
        }));
        isFormValid = false;
      }
    }

    if (productForm.product_type === "furniture") {
      if (!productForm.height || !productForm.width || !productForm.length) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          height: "Height is required",
          width: "Width is required",
          length: "Length is required",
        }));
        isFormValid = false;
      }
    }

    if (!isFormValid) {
      console.log("Its error");
      return;
    }

    const formDataToSubmit = new FormData();

    for (const key in productForm) {
      formDataToSubmit.append(key, productForm[key]);
    }

    const url =
      "https://scandiwebphpapi.000webhostapp.com/scandiback/api/addProducts.php";
    await axios
      .post(url, formDataToSubmit)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("/scandiwebtest");
  };

  return (
    <div className="productAddContainer">
      <div className="row between">
        <h2>Product Add</h2>
        <div>
          <button type="submit" id="save-button" onClick={handleSubmit}>
            Save
          </button>
          <button
            id="cancel-button"
            onClick={() => {
              navigate("/scandiwebtest");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <hr></hr>
      <form id="product_form">
        <React.Fragment>
          <div>
            <label htmlFor="sku">SKU</label>
            <input
              name="sku"
              type="text"
              id="sku"
              required
              placeholder="SKU"
              value={productForm.sku}
              onChange={handleChange}
            />
          </div>
          {errors.sku && <p>{errors.sku}</p>}
        </React.Fragment>
        <React.Fragment>
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              id="name"
              required
              placeholder="Name"
              value={productForm.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <p>{errors.name}</p>}
        </React.Fragment>
        <React.Fragment>
          <div>
            <label htmlFor="price">Price</label>
            <input
              name="price"
              type="text"
              id="price"
              required
              placeholder="Price"
              value={productForm.price}
              onChange={handleChange}
            />
          </div>
          {errors.price && <p>{errors.price}</p>}
        </React.Fragment>
        <div>
          <label htmlFor="productType">Type Switcher</label>
          <select
            onChange={handleChange}
            defaultValue={productForm.product_type}
            id="productType"
            name="product_type"
          >
            <option value="">Type Switcher</option>
            <option value="disc" id="DVD">
              DVD
            </option>
            <option value="furniture" id="Furniture">
              Furniture
            </option>
            <option value="book" id="Book">
              Book
            </option>
          </select>
        </div>
        <div>
          {productForm.product_type === "book" ? (
            <div className="productSwitch">
              <h3>Book</h3>
              <React.Fragment>
                <label htmlFor="weight">Weight (KG)</label>
                <input
                  name="weight"
                  type="text"
                  value={productForm.weight}
                  id="weight"
                  required
                  placeholder="Weight"
                  onChange={handleChange}
                />
                {errors.weight && <h3>{errors.weight}</h3>}
              </React.Fragment>
              <p>
                <small>Please Provide Weight</small>
              </p>
            </div>
          ) : productForm.product_type === "disc" ? (
            <div className="productSwitch">
              <h3>DVD</h3>
              <React.Fragment>
                <label>Size</label>
                <input
                  name="size"
                  type="text"
                  id="size"
                  value={productForm.size}
                  placeholder="Size"
                  required
                  onChange={handleChange}
                />
                {errors.size && <p>{errors.size}</p>}
              </React.Fragment>
              <p>
                <small>Please Provide Size</small>
              </p>
            </div>
          ) : productForm.product_type === "furniture" ? (
            <div className="productSwitch">
              <h3>Furniture</h3>
              <div>
                <label htmlFor="height">Height</label>
                <input
                  name="height"
                  type="number"
                  id="height"
                  required
                  value={productForm.height}
                  placeholder="Height"
                  onChange={handleChange}
                />
                {errors.height && <h3>{errors.height}</h3>}
              </div>
              <div>
                <label htmlFor="width">Width</label>
                <input
                  name="width"
                  type="number"
                  id="width"
                  value={productForm.width}
                  placeholder="Width"
                  required
                  onChange={handleChange}
                />
                {errors.width && <h3>{errors.width}</h3>}
              </div>
              <div>
                <label htmlFor="length">Length</label>
                <input
                  name="length"
                  type="text"
                  id="length"
                  value={productForm.length}
                  required
                  placeholder="Length"
                  onChange={handleChange}
                />
                {errors.length && <h3>{errors.length}</h3>}
              </div>
              <p>
                <small>Please Provide Dimension</small>
              </p>
            </div>
          ) : (
            <div className="productSwitch">
              <p>
                <strong>Please Select Your Product Type</strong>
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
