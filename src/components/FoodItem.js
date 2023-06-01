import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLikedItem } from "../features/marketSlice";
import BuyButton from "./BuyButton";

const FoodItem = ({ item }) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	const { likedItems } = useSelector(state => state.shop);
	const findLikedItem = likedItems.find(x => x.id === item.id);

	return (
		<motion.div
			whileHover={{ scale: 1.03 }}
			key={item.id}
			className="w-60 h-80  bg-white shadow-lg rounded-xl  hover:shadow-2xl flex flex-col justify-center items-start p-2"
		>
			<div className="w-8 h-auto flex justify-center items-center bg-slate-200 rounded-sm shadow-xl cursor-pointer self-end">
				{findLikedItem !== undefined ? (
					<AiFillHeart onClick={() => dispatch(addLikedItem(item))} className="text-yellow-600 text-2xl" />
				) : (
					<AiOutlineHeart onClick={() => dispatch(addLikedItem(item))} className="text-yellow-600 text-2xl" />
				)}
			</div>
			<Link className="w-full h-full  " to={`/food/${item.id}`}>
				<img className="w-4/5 ml-6  cursor-pointer" src={`/${item.img}`} alt={item.name.toLowerCase()} />
			</Link>
			<h3 className="text-lg text-gray-600">{item.name}</h3>
			<h3 className="self-end mb-1 text-lg">${item.price}</h3>
			{pathname !== "/favorite" && <BuyButton item={item} />}
		</motion.div>
	);
};

export default FoodItem;
