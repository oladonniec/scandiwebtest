import axios from "axios";
import { useState } from "react";

const Servertest = () => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    const url = "http://localhost:8080/scandiwebbackend/";
    axios
      .post(url, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <input type="text" name="name" value={name} onChange={handleChange} />
      <input type="submit" onClick={handleSubmit} />
    </div>
  );
};

export default Servertest;
