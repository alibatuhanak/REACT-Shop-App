import React from "react";
import FoodItem from "./FoodItem";
import { useSelector } from "react-redux";
import Categories from "./Categories";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { deleteAllLikedItems, deleteAllCartItems, buyNow } from "../features/marketSlice";
import { ClipLoader } from "react-spinners";

const FoodList = () => {
	const { allFoods, likedItems, cartItems, totalAmount, query, isPending } = useSelector(state => state.shop);
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	if (isPending) {
		return <ClipLoader color="#c1b21d" loading size={130} speedMultiplier={2} className="absolute mx-auto left-0 right-0 top-40" />;
	}

	return (
		<div className="items-center flex flex-col relative ">
			{pathname === "/list" && <Categories />}

			<div className="max-[700px]:flex-col max-[700px]:items-center max-[700px]:gap-y-2  flex flex-row">
				{(pathname === "/favorite" || pathname === "/basket") && (
					<motion.button
						whileHover={{
							scale: 1.05,
							transition: { duration: 0.1 },
						}}
						whileTap={{ scale: 0.8 }}
						className="max-[700px]:w-full px-10 py-1 bg-yellow-600 rounded-2xl text-gray-100 text-lg"
						onClick={() => {
							if (pathname === "/favorite") {
								dispatch(deleteAllLikedItems());
							} else {
								dispatch(deleteAllCartItems());
							}
						}}
					>
						Delete all {pathname === "/favorite" ? "favorites" : "cart"}
					</motion.button>
				)}
				{pathname === "/basket" && (
					<>
						<div className="max-[700px]:w-full max-[700px]:py-1 font-bold  rounded-2xl bg-slate-600 mx-10 flex  items-center text-lg px-6 text-white ">
							Total Amount: ${totalAmount.toFixed(2)}
						</div>
						<motion.button
							whileHover={{
								scale: 1.05,
								transition: { duration: 0.1 },
							}}
							whileTap={{ scale: 0.8 }}
							className="max-[700px]:w-full px-10 py-1 bg-yellow-600 rounded-2xl text-gray-100 text-lg"
							onClick={() => dispatch(buyNow())}
						>
							Buy now
						</motion.button>
					</>
				)}
			</div>
			<div className="text-yellow-500 w-[85vw] min-h-[50vh] mt-8 py-10 justify-center  flex flex-wrap  gap-x-12 gap-y-10 ">
				{pathname === "/list" &&
					allFoods.filter(food => food.name.toLowerCase().includes(query.toLowerCase())).map((item, key) => <FoodItem key={key} item={item} />)}
				{pathname === "/favorite" && likedItems.length === 0 ? (
					<img className="absolute w-72 h-72 top-10 left-0 right-2 m-auto mt-10" src="/assets/heart.png" alt="empty-favorite" />
				) : (
					pathname === "/favorite" && likedItems.map((item, key) => <FoodItem key={key} item={item} />)
				)}
				{pathname === "/basket" && cartItems.length === 0 ? (
					<img
						className="max-[700px]:w-60 max-[700px]:h-60 max-[700px]:mt-24 max-[700px]:right-0 absolute w-72 h-72 top-10 left-0 right-0 m-auto mt-10"
						src="/assets/online-shopping.png"
						alt="empty-basket"
					/>
				) : (
					pathname === "/basket" && cartItems.map((item, key) => <FoodItem key={key} item={item} />)
				)}
			</div>
		</div>
	);
};

export default FoodList;
