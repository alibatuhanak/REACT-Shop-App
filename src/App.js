import React, { useEffect, useState } from "react";
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
import { DotLoader } from "react-spinners";

const App = () => {
	const dispatch = useDispatch();
	const [control, setControl] = useState(true);

	useEffect(() => {
		dispatch(foodFetch());
		setTimeout(() => {
			setControl(false);
		}, 1400);
	}, [dispatch]);

	return (
		<>
			<Navbar />

			{control ? (
				<DotLoader color="#c1b21d" loading size={130} speedMultiplier={2} className="absolute mx-auto left-0 right-0 top-80" />
			) : (
				<>
					<Routes>
						<Route path="/list" element={<Food />} />
						<Route path="/basket" element={<Basket />} />
						<Route path="/favorite" element={<Basket />} />
						<Route index path="/food/:id" element={<MainFoodItem />} />
						<Route path="*" element={<Navigate to="list" />} />
					</Routes>
					<ToastContainer />
					<Footer />
				</>
			)}
		</>
	);
};

export default App;
