import { useLocation } from 'react-router-dom'
import './Training.css'
import type { TExercise } from '../Exercise/Exercise';
import { useEffect, useState } from 'react';
import { Button, ButtonVariants } from '@/lib/components/Button/Button';

export function Training(

) {
    const location = useLocation();
    const [setNum, setSetNum] = useState(1);
    const [weight, setWeight] = useState(1);

    const { exercise }: { exercise: TExercise } = location.state || {};
    return (
        <>
            <div className='fixed flex items-center top-0 h-19 capitalize w-full bg-light-background shadow-light'>
                <h1 className='text-dark-blue text-[32px] ml-6 w-[75%] truncate'>{exercise.name}</h1>
            </div>
            <div className='text-dark-blue flex flex-col items-center mt-[90px]'>
                <p className='text-[32px]'>SET <span className='font-bold'>{setNum}</span>/3</p>
                <p className='text-[24px] leading-3 pb-1'>REPS 8-12</p>
            </div>
            <div className='bg-orange w-[315px] h-px mx-auto my-5'></div>
            <div className='w-[343px] flex flex-col items-center gap-[19px] mx-auto'>
                <div>
                    <p className='text-[48px] text-dark-blue leading-10' >Weight [kg]</p>
                </div>
                <div className='border w-full'>
                    <p className='text-[96px] text-dark-blue text-center'><span>{weight}</span></p>
                </div>
                <div className='flex justify-between w-full'>
                    <Button
                        text="–"
                        onClick={() => setWeight(weight ? weight - .25 : weight)}
                        
                        variant={ButtonVariants.gray}
                        className='text-[92px] w-[161px] h-[100px] shadow'
                    />
                    <Button
                        text="+"
                        onClick={() => setWeight(weight + .25)}
                        variant={ButtonVariants.gray}
                        className='text-[110px] w-[161px] h-[100px] shadow'
                    />
                </div>
                <Button 
                    text="Done" 
                    variant={ButtonVariants.orange} 
                    onClick={()=>{}} 
                    className='text-[64px] w-[343px] h-[92px] shadow'
                />
            </div>
        </>
    )
}