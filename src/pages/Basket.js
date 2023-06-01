import React, { useEffect } from "react";
import Back from "../components/Back";
import FoodList from "../components/FoodList";

const Basket = () => {
	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		scrollToTop();
	}, []);

	return (
		<div className="bg-slate-200 flex flex-col items-center w-screen max-w-full min-h-screen h-auto  px-20 pb-20">
			<Back />
			<FoodList />
		</div>
	);
};

export default Basket;
