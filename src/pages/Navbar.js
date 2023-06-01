import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { BsFillBookmarkHeartFill, BsSearchHeartFill, BsXCircleFill } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { search, changeCategory } from "../features/marketSlice";

const Navbar = () => {
	const [query, setQuery] = useState("");

	const dispatch = useDispatch();
	const { likedItems, cartItems, totalCredits } = useSelector(state => state.shop);

	const navigate = useNavigate();

	const { pathname } = useLocation();

	return (
		<div
			className={
				"w-screen h-20 z-10 bg-yellow-500 max-[620px]:text-2xl  fixed flex justify-around items-center top-0 drop-shadow-2xl" +
				(pathname === "/list" ? " max-[620px]:h-28" : "")
			}
		>
			<motion.h2
				whileTap={{ scale: 1.2 }}
				onClick={() => navigate("/list")}
				className={"text-3xl cursor-pointer select-none drag-none font-brand text-purple-800" + (pathname === "/list" ? " max-[620px]:mb-10" : "")}
			>
				batu
			</motion.h2>

			{pathname === "/list" && (
				<div className="relative max-[620px]:absolute  hop top-auto ">
					<label htmlFor="search" className="cursor-pointer absolute left-2 top-2">
						<BsSearchHeartFill color="#b21f1f" size={20} />
					</label>
					<BsXCircleFill
						onClick={() => {
							dispatch(search(""));
							setQuery("");
						}}
						className="absolute cursor-pointer right-2 top-2"
						color="#b21f1f"
						size={20}
					/>
					<input
						id="search"
						name="text"
						placeholder="Search..."
						onFocus={() => dispatch(changeCategory("All"))}
						value={query}
						onChange={e => {
							setQuery(e.target.value);
							dispatch(search(e.target.value));
						}}
						className=" outline-none rounded-2xl p-1 text-lg px-2 pl-8 font-medium text-yellow-800 "
						type="text"
					/>
				</div>
			)}
			<div className={"text-sm flex gap-4 h-auto mb-1" + (pathname === "/list" ? " max-[620px]:mb-12" : "")}>
				<motion.div key={totalCredits} className="relative " initial={{ y: -5 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 120 }}>
					<BiMoneyWithdraw color="green" className="md:w-10 md:h-10 w-6 h-6 font-bold" />${totalCredits.toFixed(2)}
				</motion.div>
				<Link className="h-full" to="/basket">
					<motion.button
						key={cartItems.length}
						className="relative"
						initial={{ y: -10 }}
						animate={{ y: 0 }}
						transition={{ type: "spring", stiffness: 120 }}
						whileHover={{ scale: 1.2 }}
					>
						<div className="max-[620px]:text-sm w-4 h-4 bg-red-400 absolute top-0 left-0 flex items-center justify-center rounded-sm">
							{cartItems.length}
						</div>
						<FiShoppingCart className="w-10 h-10 cursor-pointer  text-yellow-50" />
					</motion.button>
				</Link>
				<Link className="h-full" to="/favorite">
					<motion.button
						key={likedItems}
						className="relative"
						initial={{ y: -10 }}
						animate={{ y: 0 }}
						transition={{ type: "spring", stiffness: 120 }}
						whileHover={{ scale: 1.2 }}
					>
						<div className="max-[620px]:text-sm w-4 h-4 bg-red-400 absolute top-0 right-6 flex items-center justify-center rounded-sm">
							{likedItems.length}
						</div>
						<BsFillBookmarkHeartFill className="w-10 h-10 cursor-pointer text-yellow-50" />
					</motion.button>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
