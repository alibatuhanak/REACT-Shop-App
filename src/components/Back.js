import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Back = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const path = pathname.split("/")[1];

	return (
		<div
			className={
				"w-[80vw]  h-12  flex justify-start items-center mb-16 rounded-lg text-slate-700 font-semibold bg-white shadow-xl" +
				(path === "food" ? " mt-6" : " mt-24")
			}
		>
			<motion.button onClick={() => navigate(-1)} whileHover={{ x: -10, scale: 1.2 }} className="px-3 ml-6 ">
				<BsArrowLeft className="text-4xl text-black" />
			</motion.button>
		</div>
	);
};

export default Back;
