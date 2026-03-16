import { Button, ButtonVariants } from '@/lib/components/Button/Button';
import './Excercise.css';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';

export function Excercise(
) {
    const [searchParams] = useSearchParams();
    const excerciseName = searchParams.get('name');
    const [video, setVideo] = useState(false);
    return (
        <>
            <div className='excercise-name-container'>
                <h1>{excerciseName}</h1>
            </div>
            {video &&
                <div className='absolute w-full flex justify-center mt-6 h-[210px]'>
                    <iframe
                        src='https://www.youtube.com/embed/bfAd9ZnSc-g'
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