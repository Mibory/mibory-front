import { ButtonVariants, type ButtonVariant } from '../Button/Button';
import './SquareButton.css'
import cn from 'classnames'

export function SquareButton(
    {
        text,
        onClick,
        variant = ButtonVariants.lightblue,
        className
    }: {
        text: string;
        onClick: () => void;
        variant?: ButtonVariant;
        className?: string;
    }
) {
    return (
        <button
            onClick={onClick}
            className={cn("square-btn", className, {
                "bg-orange": variant === ButtonVariants.orange,
                "bg-light-blue": variant === ButtonVariants.lightblue,
                "bg-dark-blue": variant === ButtonVariants.darkblue,
            })}
        >
            {text}
        </button>
    )
}