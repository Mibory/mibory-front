import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import './HomePage.css';

export function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="header-container">
                <h1>MIBORY</h1>
                <p>gym tracker</p>
            </div>
            <div className="content-container">
                <p>Choose your fighter</p>
                <Button text="Debi" onClick={() => navigate('/training-day?usr=debi')} />
                <Button text="Misiek" onClick={() => navigate('/training-day?usr=misiek')} />
            </div>
        </>
    )
}