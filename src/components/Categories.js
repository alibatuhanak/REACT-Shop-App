import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../features/marketSlice";

const Categories = () => {
	const dispatch = useDispatch();
	const { option } = useSelector(state => state.shop);

	const [selected, setSelected] = useState(1);

	const aRef = useRef(null);
	const vRef = useRef(null);
	const fRef = useRef(null);
	const dRef = useRef(null);
	const deRef = useRef(null);
	const mRef = useRef(null);
	const sRef = useRef(null);

	const category = (ref, num) => {
		setSelected(num);
		dispatch(changeCategory(ref.current.textContent));
	};

	return (
		<div className="max-[620px]:mt-16 mt-12 h-16 max-[620px]:w-[90vw]  max-[620px]:rounded-xl w-full flex justify-start items-center rounded-lg text-slate-700 font-semibold bg-white shadow-xl lg:overflow-x-hidden overflow-x-scroll">
			<button
				ref={aRef}
				className={((selected && option) === 1 ? "bg-yellow-300 " : " bg-gray-200 hover:bg-yellow-400 ") + "rounded-2xl p-3 px-4 mx-4"}
				onClick={() => category(aRef, 1)}
			>
				All
			</button>
			<button
				ref={vRef}
				className={((selected && option) === 2 ? "bg-yellow-300 " : "bg-gray-200 hover:bg-yellow-400 ") + "rounded-2xl p-3 px-4 mx-4"}
				onClick={() => category(vRef, 2)}
			>
				Vegetables
			</button>
			<button
				ref={fRef}
				className={((selected && option) === 3 ? "bg-yellow-300 " : "bg-gray-200 hover:bg-yellow-400 ") + "rounded-2xl p-3 px-4 mx-4"}
				onClick={() => category(fRef, 3)}
			>
				Fruits
			</button>
			<button
				ref={dRef}
				className={((selected && option) === 4 ? "bg-yellow-300 " : "bg-gray-200 hover:bg-yellow-400 ") + "rounded-2xl p-3 px-4 mx-4"}
				onClick={() => category(dRef, 4)}
			>
				Drinks
			</button>
			<button
				ref={deRef}
				className={((selected && option) === 5 ? "bg-yellow-300 " : "bg-gray-200 hover:bg-yellow-400 ") + "rounded-2xl p-3 px-4 mx-4"}
				onClick={() => category(deRef, 5)}
			>
				Desserts
			</button>
			<button
				ref={mRef}
				className={((selected && option) === 6 ? "bg-yellow-300 " : "bg-gray-200 hover:bg-yellow-400 ") + "rounded-2xl p-3 px-4 mx-4"}
				onClick={() => category(mRef, 6)}
			>
				Meats
			</button>
			<button
				ref={sRef}
				className={((selected && option) === 7 ? "bg-yellow-300 " : "bg-gray-200 hover:bg-yellow-400 ") + "rounded-2xl p-3 px-4 mx-4"}
				onClick={() => category(sRef, 7)}
			>
				Others
			</button>
		</div>
	);
};

export default Categories;
