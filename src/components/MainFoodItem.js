import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Back from "./Back";
import BuyButton from "./BuyButton";

const MainFoodItem = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { allFoods } = useSelector(state => state.shop);

	const food = allFoods.find(item => item.id === parseInt(id));

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		scrollToTop();
	}, []);

	if (!food) {
		return navigate("..");
	}

	return (
		<div className="flex w-full h-[1000px] bg-slate-200 flex-col  justify-center items-center pb-10">
			<Back />
			<div className="max-[1000px]:flex-col  w-[80vw]	 h-[420px]  bg-white shadow-lg rounded-xl  shadow-yellow-600 flex flex-row justify-center items-center  p-2">
				<img
					className="max-[1000px]:w-44 max-[700px]:h-44 max-[700px]:shadow-lg  w-[300px] h-[300px] self-center  shadow-2xl border border-l-indigo-950 border-l-4 border-t-4 border-t-yellow-400"
					src={`/${food.img}`}
					alt={food.name.toLowerCase()}
				/>
				<div className="max-[1000px]:w-full max-[1000px]:text-center flex flex-col w-2/5 justify-evenly self-center items-center tracking-wide h-4/5">
					<h3 className="text-2xl text-yellow-500">Category: {food.tag}</h3>
					<h3 className="text-lg text-gray-600">Name: {food.name}</h3>
					<h3 className=" mb-1 text-lg">kg: {food.kg}</h3>
					<h3 className="text-2xl text-yellow-800">
						Price: $ <span className="text-black">{food.price}</span>
					</h3>
					<BuyButton item={food} />
				</div>
			</div>
			<img className="mt-10  w-56 h-56 self-center" src="/assets/cooking.png" alt="cooking" />
		</div>
	);
};

export default MainFoodItem;
