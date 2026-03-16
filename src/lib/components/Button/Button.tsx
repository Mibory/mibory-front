import './Button.css';
import cn from "classnames";

export const ButtonVariants = {
    orange: "orange",
    darkblue: "darkblue",
    lightblue: "lightblue"
} as const;

export type ButtonVariant = keyof typeof ButtonVariants;

export function Button({
    text,
    variant = "darkblue",
    className,
    onClick
}: {
    text: string;
    variant?: ButtonVariant;
    className?: string;
    onClick: () => void;
}) {
    return <>
        <button 
            className={cn("btn", {
                'bg-dark-blue text-beige': variant === ButtonVariants.darkblue,
                'bg-light-blue text-dark-blue': variant === ButtonVariants.lightblue,
                'bg-orange text-dark-blue uppercase': variant === ButtonVariants.orange
            }, className)}
            onClick={onClick}
        >
            {text}
        </button>
    </>
}