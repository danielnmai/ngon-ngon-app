import type { ImgHTMLAttributes } from "react";

type LogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
	className?: string;
};

export const Logo = ({ className, ...props }: LogoProps) => {
	return (
		<img
			src="/assets/ngon-ngon-logo.svg"
			alt="Ngon Ngon Logo"
			className={className}
			{...props}
		/>
	);
};

