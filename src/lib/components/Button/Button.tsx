import './Button.css';
import cn from "classnames";

export const ButtonVariants = {
    orange: "orange",
    darkblue: "darkblue",
    lightblue: "lightblue",
    done: "done"
} as const;

export type ButtonVariant = keyof typeof ButtonVariants;

export function Button({
    text,
    variant = ButtonVariants.darkblue,
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
                'bg-orange text-dark-blue uppercase': variant === ButtonVariants.orange,
                'bg-light-green text-green-on-light-green': variant === ButtonVariants.done,
                'text-[24px]': text.length < 30,
                'text-[20px]': text.length >= 30 && text.length < 50,
            }, className)}
            onClick={onClick}
        >
            {text.length < 50 ? text : text.substring(0, 50) + '...'}
        </button>
    </>
}