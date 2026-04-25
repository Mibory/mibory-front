import './Button.css';
import cn from "classnames";

export const ButtonVariants = {
    orange: "orange",
    darkblue: "darkblue",
    lightblue: "lightblue",
    gray: "gray",
    done: "done"
} as const;

export type ButtonVariant = keyof typeof ButtonVariants;

export function Button({
    text,
    variant = ButtonVariants.darkblue,
    className,
    onClick,
    disabled = false,
}: {
    text: string;
    variant?: ButtonVariant;
    className?: string;
    onClick: () => void;
    disabled?: boolean;
}) {
    return <>
        <button
            type='button'
            disabled={disabled}
            className={cn("btn", {
                'bg-dark-blue text-beige': variant === ButtonVariants.darkblue,
                'bg-light-blue text-dark-blue': variant === ButtonVariants.lightblue,
                'bg-orange text-dark-blue uppercase': variant === ButtonVariants.orange,
                'bg-light-green text-green-on-light-green': variant === ButtonVariants.done,
                'bg-gray text-dark-blue': variant === ButtonVariants.gray,
                'text-[24px]': text.length < 30,
                'text-[20px]': text.length >= 30 && text.length < 50,
            }, className)}
            onClick={disabled ? undefined : onClick}
        >
            {text.length < 50 ? text : text.substring(0, 50) + '...'}
        </button>
    </>
}