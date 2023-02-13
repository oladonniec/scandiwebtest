import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <Router>
      <div className="mainGrid">
        <Navbar />
        <main>
          <Routes>
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/" element={<ProductList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
