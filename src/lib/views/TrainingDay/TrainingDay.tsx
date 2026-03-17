import './TrainingDay.css';

import { useEffect, useState } from "react";
import { Button, ButtonVariants } from "../../components/Button/Button";
import { SquareButton } from "../../components/SquareButton/SquareButton";
import { useNavigate, useSearchParams } from 'react-router-dom';

type TTrainingDay = {
    _id: string;
    dayNum: number;
    user: {
        _id: string;
        name: string;
        currentTrainingDay: number;
    };
    exercises: {
        _id: string;
        name: string;
        videoUrl: string;
    }[];
    dayName?: string;
};

export function TrainingDay() {

    const navigate = useNavigate();
    const [dayNum, setDayNum] = useState(1);
    const [trainingDays, setTrainingDays] = useState<TTrainingDay[]>([]);
    const [searchParams] = useSearchParams();
    const userName = searchParams.get('usr');

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
                        .map((ex, id) => (
                            <Button
                                key={ex._id}
                                text={ex.name}
                                onClick={() => navigate(`/exercise?name=${encodeURIComponent(ex.name)}&url=${encodeURIComponent(ex.videoUrl)}`)}
                                className='capitalize'
                                variant={id === 0 || id === 3 ? ButtonVariants.done : id % 2 ? ButtonVariants.lightblue : undefined}
                            />
                        ))
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