import { Button, ButtonVariants } from '@/lib/components/Button/Button';
import './Exercise.css';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';

export function Exercise(
) {
    const [searchParams] = useSearchParams();
    const excerciseName = searchParams.get('name');
    const excerciseUrl = searchParams.get('url');
    const [video, setVideo] = useState(false);
    return (
        <>
            <div className='excercise-name-container'>
                <h1 className={cn({
                    'text-[40px]': excerciseName!.length < 30,
                    'text-[30px]': excerciseName!.length >= 30 && excerciseName!.length < 40,
                })}>{excerciseName}</h1>
            </div>
            {video &&
                <div className='absolute w-full flex justify-center mt-6 h-[210px]'>
                    <iframe
                        src={excerciseUrl!}
                        allow='autoplay; encrypted-media'
                        allowFullScreen
                        title={excerciseName!}
                        className='w-[335px]'
                    />
                </div>
            }
            <div className='ex-action-btns-container'>
                {!video ? <Button onClick={() => setVideo(true)} text="video" /> : <div className='h-16.5'></div>}
                <Button onClick={() => { }} text="start" variant={ButtonVariants.orange} className='font-bold shadow' />
            </div>
        </>
    )
}