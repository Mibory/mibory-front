import cn from 'classnames'
import { Button } from '../../components/Button/Button';
import './Menu.css'


export function Menu({
    isMenuOpen
}: {
    isMenuOpen: boolean;
}) {
    return (
        <div className={cn("menu", {
                'closed': !isMenuOpen,
            })}>
                <div className="buttons-container">
                    <Button text="Dane" onClick={() => {}}/>
                </div>
            </div>
    )
}