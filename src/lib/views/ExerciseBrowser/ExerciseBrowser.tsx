import { useEffect, useState } from 'react';
import './ExerciseBrowser.css';
import { Button, ButtonVariants } from '@/lib/components/Button/Button';
import { useNavigate } from 'react-router-dom';

type Exercise = {
    _id: string;
    name: string;
    videoUrl: string;
}

export function ExerciseBrowser(
) {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExercises = async () => {
            const cachedData = sessionStorage.getItem('cached_exercises');
            if (cachedData) {
                setExercises(JSON.parse(cachedData));
                return;
            }
            try {
                const res = await fetch('/api/exercises', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                setExercises(data);
                sessionStorage.setItem('cached_exercises', JSON.stringify(data));
            } catch (err) {
                console.error('Fetch error: ', err);
            }
        };
        fetchExercises();
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
            <div className='eb-add-btn-container'>
                <Button text="Add new" onClick={() => { }} variant={ButtonVariants.orange} className='shadow font-bold' />
            </div>
        </>
    )
}