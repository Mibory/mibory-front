import './TrainingDay.css';

import { useEffect, useState } from "react";
import { Button, ButtonVariants } from "../../components/Button/Button";
import { SquareButton } from "../../components/SquareButton/SquareButton";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import type { TExercise } from '../Exercise/Exercise';

type TTrainingDay = {
    _id: string;
    dayNum: number;
    user: {
        _id: string;
        name: string;
        currentTrainingDay: number;
    };
    exercises: TExercise[];
    dayName?: string;
};

export function TrainingDay() {

    const location = useLocation();
    const userName = location.state || '';
    const navigate = useNavigate();
    const [dayNum, setDayNum] = useState(1);
    const [trainingDays, setTrainingDays] = useState<TTrainingDay[]>([]);

    useEffect(() => {
        const cachedData = sessionStorage.getItem(`cached_training_days_${userName}`);
        if (cachedData) {
            setTrainingDays(JSON.parse(cachedData));
            return;
        }

        fetch(`/api/training-days?usr=${userName}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(data => {
                setTrainingDays(data);
                sessionStorage.setItem(`cached_training_days_${userName}`, JSON.stringify(data));
            })
            .catch(err => console.error('Fetch error: ', err));
    }, []);

    return (
        <>
            <div className="day-num-container">
                <h1>
                    Day
                    <span>
                        {' ' + (trainingDays.find(td => td.dayNum === dayNum)?.dayName ?? dayNum)}
                    </span>
                </h1>
            </div>
            <div className="day-excercises-container">
                {
                    trainingDays
                        .find(td => td.dayNum === dayNum)
                        ?.exercises
                        .map((exercise, id) => {
                            return (
                                <Button
                                    key={exercise._id}
                                    text={exercise.name}
                                    onClick={() => navigate('/exercise', { state: {exercise} })}
                                    className='capitalize'
                                    variant={id === 0 || id === 3 ? ButtonVariants.done : id % 2 ? ButtonVariants.lightblue : undefined}
                                />
                            )
                        })
                }
                <div className='h-[140px]'></div>
            </div>
            <div className="action-btns-container">
                <SquareButton text="other" onClick={() => navigate('/exercise-browser')} variant={ButtonVariants.orange} />
                <SquareButton text="skip" onClick={() => {
                    setDayNum((dayNum % trainingDays.length) + 1);
                }} />
            </div>
        </>
    )
}