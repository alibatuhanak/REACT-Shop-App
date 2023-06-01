import React from "react";
import { BsTwitter, BsGithub, BsLinkedin, BsMailbox2 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="w-full h-36 flex flex-col bg-yellow-500 items-center justify-center">
			<div className="w-full h-1/2 flex flex-row gap-x-4 justify-center items-center">
				<Link target="_blank" to={"https://twitter.com/alibatuhanak1"}>
					<BsTwitter className="w-10 h-10 cursor-pointer" />
				</Link>
				<Link target="_blank" to={"https://github.com/alibatuhanak"}>
					<BsGithub className="w-10 h-10 cursor-pointer" />
				</Link>
				<Link target="_blank" to={"https://linkedin.com/in/alibatuhanak"}>
					<BsLinkedin className="w-10 h-10 cursor-pointer" />
				</Link>
				<Link target="_blank" to={"mailto:alibatuhanak@gmail.com"}>
					<BsMailbox2 className="w-10 h-10 cursor-pointer" />
				</Link>
			</div>
			<h3>
				&copy;Made with ❤️ by <span className="font-brand font-bold">Ali Batuhan Ak</span>
			</h3>
		</div>
	);
};

export default Footer;
