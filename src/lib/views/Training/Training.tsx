import { useLocation, useNavigate } from 'react-router-dom'
import './Training.css'
import type { TExercise, TExerciseConfig } from '../Exercise/Exercise';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, ButtonVariants } from '@/lib/components/Button/Button';

type PreviousSetLog = {
    setNum: number;
    weight: number;
    reps: number;
};

function Rest(
    { onDone, restSeconds }: { onDone: () => void; restSeconds: number }
) {
    const [isActive, setIsActive] = useState(true);
    const [elapsed, setElapsed] = useState(0);
    const prevTimestampRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isActive) {
            prevTimestampRef.current = null;
            return;
        }

        let frame: number;

        const tick = (timestamp: number) => {
            if (prevTimestampRef.current === null) {
                prevTimestampRef.current = timestamp;
                frame = requestAnimationFrame(tick);
                return;
            }

            const delta = (timestamp - prevTimestampRef.current) / 1000;
            prevTimestampRef.current = timestamp;

            setElapsed(prev => {
                if (prev >= restSeconds) return prev;
                const next = prev + delta;
                return next >= restSeconds ? restSeconds : next;
            });

            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [isActive, restSeconds]);

    useEffect(() => {
        if (elapsed >= restSeconds) {
            onDone();
        }
    }, [elapsed, restSeconds, onDone]);

    const displaySeconds = Math.max(0, Math.ceil(restSeconds - elapsed) - 1);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const radius = 150;
    const circumference = 2 * Math.PI * radius;
    const strokeDashOffset = (elapsed / restSeconds) * circumference;

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-[96px] text-dark-blue mt-[50px]'>Rest</h1>
            <div className="relative flex items-center justify-center my-10 w-[350px] h-[350px]">
                <svg
                    className="absolute w-full h-full"
                    viewBox="0 0 350 350"
                    style={{ transform: "rotate(-90deg)" }}
                >
                    <defs>
                        <filter id="circle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
                        </filter>
                    </defs>
                    <circle
                        cx="175"
                        cy="175"
                        r={radius}
                        fill="transparent"
                        stroke="#F5A25D"
                        strokeWidth="24"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashOffset}
                        filter="url(#circle-shadow)"
                    />
                </svg>

                <span className="text-[86px] z-10 tabular-nums text-dark-blue">
                    {formatTime(displaySeconds)}
                </span>
            </div>
            <div className='flex flex-col gap-4'>
                <Button text='skip' onClick={onDone} variant={ButtonVariants.orange} className='font-bold shadow' />
                <Button
                    text={isActive ? "stop" : "resume"}
                    onClick={() => setIsActive(!isActive)}
                    variant={ButtonVariants.darkblue}
                    className="font-bold shadow w-full"
                />
            </div>
        </div>
    );
}

export function Training() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        exercise,
        config,
        trainingDayId,
        userName,
    } = location.state || {} as {
        exercise: TExercise;
        config?: TExerciseConfig;
        trainingDayId?: string;
        userName?: string;
    };

    const totalSets = config?.sets ?? 3;
    const repsMin = config?.repsMin ?? 8;
    const repsMax = config?.repsMax;
    const restSeconds = config?.restSeconds ?? 90;

    const repsLabel = repsMax ? `${repsMin}-${repsMax}` : `${repsMin}`;

    const [setNum, setSetNum] = useState(1);
    const [weight, setWeight] = useState(0);
    const [resting, setResting] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [previousSets, setPreviousSets] = useState<PreviousSetLog[]>([]);

    useEffect(() => {
        if (!userName || !trainingDayId || !exercise?._id) return;

        fetch(`/api/workout-sessions/previous?usr=${userName}&trainingDayId=${trainingDayId}&exerciseId=${exercise._id}`)
            .then(res => res.json())
            .then(data => {
                if (data?.sets) {
                    setPreviousSets(data.sets);
                    const firstSet = data.sets.find((s: PreviousSetLog) => s.setNum === 1);
                    if (firstSet) setWeight(firstSet.weight);
                }
            })
            .catch(() => {});
    }, [userName, trainingDayId, exercise?._id]);

    useEffect(() => {
        if (!userName || !trainingDayId) return;

        fetch('/api/workout-sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usr: userName, trainingDayId }),
        })
            .then(res => res.json())
            .then(data => setSessionId(data._id))
            .catch(() => {});
    }, [userName, trainingDayId]);

    const logSet = useCallback(async () => {
        if (!sessionId || !exercise?._id) return;

        await fetch(`/api/workout-sessions/${sessionId}/exercises/${exercise._id}/sets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ setNum, weight, reps: repsMin }),
        }).catch(() => {});
    }, [sessionId, exercise?._id, setNum, weight, repsMin]);

    const completeExercise = useCallback(async () => {
        if (!sessionId || !exercise?._id) return;

        await fetch(`/api/workout-sessions/${sessionId}/exercises/${exercise._id}/complete`, {
            method: 'PUT',
        }).catch(() => {});
    }, [sessionId, exercise?._id]);

    const handleDone = async () => {
        await logSet();

        if (setNum >= totalSets) {
            await completeExercise();
            navigate('/training-day', {
                state: { userName, completedExerciseId: exercise._id },
            });
            return;
        }

        setResting(true);
    };

    const handleRestDone = useCallback(() => {
        setResting(false);
        setSetNum(prev => {
            const next = prev + 1;
            const prevSet = previousSets.find(s => s.setNum === next);
            if (prevSet) setWeight(prevSet.weight);
            return next;
        });
    }, [previousSets]);

    if (resting) {
        return <Rest onDone={handleRestDone} restSeconds={restSeconds} />;
    }

    const prevSet = previousSets.find(s => s.setNum === setNum);

    return (
        <>
            <div className='fixed flex items-center top-0 h-19 capitalize w-full bg-light-background shadow-light'>
                <h1 className='text-dark-blue text-[32px] ml-6 w-[75%] truncate'>{exercise?.name}</h1>
            </div>
            <div className='text-dark-blue flex flex-col items-center mt-[90px]'>
                <p className='text-[32px]'>SET <span className='font-bold'>{setNum}</span>/{totalSets}</p>
                <p className='text-[24px] leading-3 pb-1'>REPS {repsLabel}</p>
            </div>
            <div className='bg-orange w-[315px] h-px mx-auto my-5'></div>
            <div className='w-[343px] flex flex-col items-center gap-[19px] mx-auto'>
                <div>
                    <p className='text-[48px] text-dark-blue leading-10'>Weight [kg]</p>
                </div>
                <div className='border w-full'>
                    <p className='text-[96px] text-dark-blue text-center'><span>{weight}</span></p>
                </div>
                <div className='flex justify-between w-full'>
                    <Button
                        text="-"
                        onClick={() => setWeight(prev => prev > 0 ? prev - 0.25 : 0)}
                        variant={ButtonVariants.gray}
                        className='text-[92px] w-[161px] h-[100px] shadow'
                    />
                    <Button
                        text="+"
                        onClick={() => setWeight(prev => prev + 0.25)}
                        variant={ButtonVariants.gray}
                        className='text-[110px] w-[161px] h-[100px] shadow'
                    />
                </div>
                <Button
                    text="Done"
                    variant={ButtonVariants.orange}
                    onClick={handleDone}
                    className='text-[64px] w-[343px] h-[92px] shadow'
                />
            </div>
            {prevSet && (
                <>
                    <p className='text-dark-blue text-end mr-6 mt-7'>Poprzedni trening</p>
                    <div className='bg-orange w-[340px] h-px mx-auto my-2'></div>
                    <div className='flex text-dark-blue w-[340px] mx-auto text-[24px] justify-between'>
                        <p className='ml-4 mt-1'>Weight</p>
                        <p className='text-[24px] h-[42px] bg-gray w-[130px] text-center pt-0.5 shadow-inset'>
                            {prevSet.weight} kg
                        </p>
                    </div>
                </>
            )}
        </>
    );
}
