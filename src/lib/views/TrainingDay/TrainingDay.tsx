import './TrainingDay.css';

import { useEffect, useState } from "react";
import { Button, ButtonVariants } from "../../components/Button/Button";
import { SquareButton } from "../../components/SquareButton/SquareButton";
import { useLocation, useNavigate } from 'react-router-dom';
import type { TTrainingDayExercise } from '../Exercise/Exercise';

type TTrainingDay = {
    _id: string;
    dayNum: number;
    user: {
        _id: string;
        name: string;
        currentTrainingDay: number;
    };
    exercises: TTrainingDayExercise[];
    dayName?: string;
};

export function TrainingDay() {

    const location = useLocation();
    const state = location.state || {};
    const userName = typeof state === 'string' ? state : state.userName || '';
    const completedExerciseId: string | undefined = typeof state === 'object' ? state.completedExerciseId : undefined;

    const navigate = useNavigate();
    const [dayNum, setDayNum] = useState(1);
    const [trainingDays, setTrainingDays] = useState<TTrainingDay[]>([]);
    const [doneExercises, setDoneExercises] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (completedExerciseId) {
            setDoneExercises(prev => new Set(prev).add(completedExerciseId));
        }
    }, [completedExerciseId]);

    useEffect(() => {
        fetch(`/api/training-days?usr=${userName}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                setTrainingDays(data);
            })
            .catch(err => console.error('Fetch error: ', err));
    }, [userName]);

    const currentDay = trainingDays.find(td => td.dayNum === dayNum);

    return (
        <>
            <div className="day-num-container">
                <h1>
                    Day
                    <span>
                        {' ' + (currentDay?.dayName ?? dayNum)}
                    </span>
                </h1>
            </div>
            <div className="day-excercises-container">
                {
                    currentDay?.exercises.map((entry, id) => {
                        const isDone = doneExercises.has(entry.exercise._id);
                        return (
                            <Button
                                key={entry.exercise._id}
                                text={entry.exercise.name}
                                disabled={isDone}
                                onClick={() => navigate('/exercise', {
                                    state: {
                                        exercise: entry.exercise,
                                        config: {
                                            sets: entry.sets,
                                            repsMin: entry.repsMin,
                                            repsMax: entry.repsMax,
                                            restSeconds: entry.restSeconds,
                                        },
                                        trainingDayId: currentDay._id,
                                        userName,
                                    },
                                })}
                                className='capitalize'
                                variant={isDone ? ButtonVariants.done : id % 2 ? ButtonVariants.lightblue : undefined}
                            />
                        );
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
