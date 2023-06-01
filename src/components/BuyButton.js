import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { FaShoppingBasket } from "react-icons/fa";
import { addCartItem, deleteCartItem } from "../features/marketSlice";
import { motion } from "framer-motion";

const BuyButton = ({ item }) => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector(state => state.shop);

	const findCartItem = cartItems.find(x => x.id === item.id);

	return (
		<button
			onClick={() => (findCartItem === undefined ? dispatch(addCartItem(item)) : null)}
			className="w-56 flex relative flex-row justify-center max-h-[35px] mt-3 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none   font-medium rounded-xl text-sm px-[76px]   py-1.5  mr-2 mb-2"
		>
			{findCartItem === undefined ? (
				<>
					<FaShoppingBasket className="text-2xl" />
					<h3 className="mx-2 font-semibold text-lg">Buy</h3>
				</>
			) : (
				<>
					{findCartItem.qty === 1 && (
						<AiFillDelete onClick={() => dispatch(deleteCartItem(item))} className="absolute w-6 h-6 top-[0.35rem] left-16  " />
					)}
					{findCartItem.qty > 1 && (
						<AiFillMinusCircle onClick={() => dispatch(deleteCartItem(item))} className="absolute w-6 h-6 top-[0.35rem] left-16  " />
					)}
					<div className="w-5 h-5 bg-white text-black font-bold text-center text-md rounded-2xl flex items-center justify-center  my-[0.10rem] mx-auto">
						<motion.span animate={{ y: 0 }} initial={{ y: 10 }} key={findCartItem.qty}>
							{findCartItem.qty}
						</motion.span>
					</div>
					<AiFillPlusCircle onClick={() => dispatch(addCartItem(item))} className="absolute w-6 h-6 top-[0.35rem] right-16" />
				</>
			)}
		</button>
	);
};

export default BuyButton;
