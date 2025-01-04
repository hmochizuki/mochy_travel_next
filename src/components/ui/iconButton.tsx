import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-12 w-12",
				sm: "h-10 w-10",
				lg: "h-14 w-14",
				icon: "h-16 w-16",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={cn(
					buttonVariants({ variant, size, className })
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
IconButton.displayName = "IconButton";

export { IconButton };
