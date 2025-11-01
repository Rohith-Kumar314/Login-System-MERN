import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { toast, ToastContainer } from "react-toastify";
export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("user Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = "http://localhost:8080/products";
        const headers = {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        };
        const response = await fetch(url, headers);
        const result = await response.json();
        console.log(result);
        setProducts(result);
      } catch (err) {
        handleError(err);
      }
    };

    fetchProducts();
  },[]);

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Log Out</button>

      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name}</li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
}
