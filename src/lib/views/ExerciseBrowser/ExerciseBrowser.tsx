import { useEffect, useState } from 'react';
import './ExerciseBrowser.css';
import { Button, ButtonVariants } from '@/lib/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useApp } from '@/lib/hooks/useApp';

type Exercise = {
    _id: string;
    name: string;
    videoUrl: string;
}

export function ExerciseBrowser(
) {
    const { isStandalone } = useApp();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cachedData = sessionStorage.getItem('cached_exercises');
        if (cachedData) {
            setExercises(JSON.parse(cachedData));
            return;
        }

        fetch('/api/exercises', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                setExercises(data);
                sessionStorage.setItem('cached_exercises', JSON.stringify(data));
            })
            .catch(err => console.error('Fetch error: ', err));
    }, []);

    return (
        <>
            <div className='eb-title-container'>
                <p>Choose the exercise</p>
            </div>
            <div className='eb-exercises-container'>
                {exercises
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((exercise, idx) => (
                        <Button
                            key={exercise._id}
                            text={exercise.name}
                            onClick={() => navigate(`/exercise?name=${encodeURIComponent(exercise.name)}&url=${encodeURIComponent(exercise.videoUrl)}`)}
                            className='capitalize'
                            variant={idx % 2 ? ButtonVariants.lightblue : undefined}
                        />
                    ))}
                <div className='h-[140px]'></div>
            </div>
            <div className={cn('eb-add-btn-container', {
                'h-35': isStandalone,
                'h-25': !isStandalone,
            })}>
                <Button text="Add new" onClick={() => { }} variant={ButtonVariants.orange} className='shadow font-bold' />
            </div>
        </>
    )
}