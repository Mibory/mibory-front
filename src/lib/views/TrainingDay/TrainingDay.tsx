import './TrainingDay.css';

import { useState } from "react";
import { Button, ButtonVariants } from "../../components/Button/Button";
import { SquareButton } from "../../components/SquareButton/SquareButton";
import { useNavigate } from 'react-router-dom';

export function TrainingDay() {

    const navigator = useNavigate();
    const [dayNum, setDayNum] = useState(1);

    return (
        <>
            <div className="day-num-container">
                <h1 className="text-[42px]">Day <span className="font-bold text-orange">{dayNum}</span></h1>
            </div>
            <div className="day-excercises-container">
                <Button text="bench press" onClick={() => navigator(`/excercise?name=${encodeURIComponent('bench press')}`)} className="capitalize" />
                <Button text="pull up" onClick={() => navigator(`/excercise?name=${encodeURIComponent('pull up')}`)} variant={ButtonVariants.lightblue} className="capitalize" />
                <Button text="ławeczka" onClick={() => { }} className="capitalize" />
                <Button text="biceps" onClick={() => { }} variant={ButtonVariants.lightblue} className="capitalize" />
                <Button text="triceps" onClick={() => { }} className="capitalize" />
                <Button text="łydka" onClick={() => { }} variant={ButtonVariants.lightblue} className="capitalize" />
            </div>
            <div className="action-btns-container">
                <SquareButton text="other" onClick={() => { }} variant={ButtonVariants.orange} />
                <SquareButton text="skip" onClick={() => { setDayNum((dayNum % 3 + 1)) }} />
            </div>
        </>
    )
}