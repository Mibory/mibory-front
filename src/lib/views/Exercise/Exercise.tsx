import { Button, ButtonVariants } from '@/lib/components/Button/Button';
import './Exercise.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';

export type TExercise = {
    _id: string;
    name: string;
    videoUrl?: string;
};

export type TTrainingDayExercise = {
    exercise: TExercise;
    sets: number;
    repsMin: number;
    repsMax?: number;
    restSeconds: number;
};

export type TExerciseConfig = {
    sets: number;
    repsMin: number;
    repsMax?: number;
    restSeconds: number;
};

export function Exercise() {
    const location = useLocation();
    const { exercise, config, trainingDayId, userName } = location.state || {} as {
        exercise: TExercise;
        config?: TExerciseConfig;
        trainingDayId?: string;
        userName?: string;
    };

    const [video, setVideo] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <div className='excercise-name-container'>
                <h1 className={cn({
                    'text-[40px]': exercise?.name.length < 30,
                    'text-[30px]': exercise?.name.length >= 30 && exercise?.name.length < 40,
                })}>{exercise?.name}</h1>
            </div>
            {video && exercise?.videoUrl &&
                <div className='absolute w-full flex justify-center mt-6 h-[210px]'>
                    <iframe
                        src={exercise.videoUrl}
                        allow='autoplay; encrypted-media'
                        allowFullScreen
                        title={exercise.name}
                        className='w-[335px]'
                    />
                </div>
            }
            <div className='ex-action-btns-container'>
                {!video && exercise?.videoUrl
                    ? <Button onClick={() => setVideo(true)} text="video" />
                    : <div className='h-16.5'></div>
                }
                <Button
                    onClick={() => navigate('/training', {
                        state: { exercise, config, trainingDayId, userName },
                    })}
                    text="start"
                    variant={ButtonVariants.orange}
                    className='font-bold shadow'
                />
            </div>
        </>
    )
}
