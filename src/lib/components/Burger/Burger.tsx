import cn from 'classnames';
import './Burger.css'

export function Burger(
    {
        isOpen,
        onClick,
        className
    }: {
        isOpen: boolean;
        onClick: () => void;
        className?: string;
    }
) {

    return (
        <div
            className={cn("burger", { "open": isOpen }, className)}
            onClick={onClick}
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}