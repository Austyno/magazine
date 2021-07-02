import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './timer.css'

const minuteSeconds = 60
const hourSeconds = 3600
const daySeconds = 86400

const timerProps = {
	isPlaying: true,
	size: 120,
	strokeWidth: 10,
}

const renderTime = (dimension, time) => {
	return (
		<div className='time-wrapper'>
			<div className='time'>{time}</div>
			<div>{dimension}</div>
		</div>
	)
}

const getTimeSeconds = time => (minuteSeconds - time) | 0
const getTimeMinutes = time => ((time % hourSeconds) / minuteSeconds) | 0
const getTimeHours = time => ((time % daySeconds) / hourSeconds) | 0
const getTimeDays = time => (time / daySeconds) | 0

const Timer = ({ ending, ended }) => {
	const stratTime = Date.now() / 1000 // use UNIX timestamp in seconds
	const endTime = ending // use UNIX timestamp in seconds

	const remainingTime = endTime - stratTime
	const days = Math.ceil(remainingTime / daySeconds)
	const daysDuration = days * daySeconds

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2'>
			<CountdownCircleTimer
				{...timerProps}
				colors={[['#7E2E84']]}
				duration={daysDuration}
				initialRemainingTime={remainingTime}
				onComplete={() => ended()}>
				{({ elapsedTime }) =>
					renderTime('days', getTimeDays(daysDuration - elapsedTime))
				}
			</CountdownCircleTimer>
			<CountdownCircleTimer
				{...timerProps}
				colors={[['#D14081']]}
				duration={daySeconds}
				initialRemainingTime={remainingTime % daySeconds}
				onComplete={totalElapsedTime => [
					remainingTime - totalElapsedTime > hourSeconds,
				]}>
				{({ elapsedTime }) =>
					renderTime('hours', getTimeHours(daySeconds - elapsedTime))
				}
			</CountdownCircleTimer>
			<CountdownCircleTimer
				{...timerProps}
				colors={[['#EF798A']]}
				duration={hourSeconds}
				initialRemainingTime={remainingTime % hourSeconds}
				onComplete={totalElapsedTime => [
					remainingTime - totalElapsedTime > minuteSeconds,
				]}>
				{({ elapsedTime }) =>
					renderTime('minutes', getTimeMinutes(hourSeconds - elapsedTime))
				}
			</CountdownCircleTimer>
			<CountdownCircleTimer
				{...timerProps}
				colors={[['#218380']]}
				duration={minuteSeconds}
				initialRemainingTime={remainingTime % minuteSeconds}
				onComplete={totalElapsedTime => [remainingTime - totalElapsedTime > 0]}>
				{({ elapsedTime }) =>
					renderTime('seconds', getTimeSeconds(elapsedTime))
				}
			</CountdownCircleTimer>
		</div>
	)
}
export default Timer
// onComplete={() => {
//       // do your stuff here
//       return [true, 1500] // repeat animation in 1.5 seconds
//     }}
