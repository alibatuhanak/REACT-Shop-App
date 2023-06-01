import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Food from "./pages/Food";
import MainFoodItem from "./components/MainFoodItem";
import { useDispatch } from "react-redux";
import { foodFetch } from "./features/marketSlice";
import Basket from "./pages/Basket";
import Footer from "./pages/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	const dispatch = useDispatch();
	dispatch(foodFetch());
	useEffect(() => {}, []);

	return (
		<>
			<Navbar />
			<Routes>
				<Route path="list" element={<Food />} />
				<Route path="/basket" element={<Basket />} />
				<Route path="/favorite" element={<Basket />} />
				<Route index path="/food/:id" element={<MainFoodItem />} />
				<Route path="*" element={<Navigate to="list" />} />
			</Routes>
			<ToastContainer />
			<Footer />
		</>
	);
};

export default App;
