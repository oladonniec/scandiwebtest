import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <div className="mainGrid">
      <Navbar />
      <main>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
