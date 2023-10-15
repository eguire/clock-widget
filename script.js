window.addEventListener('DOMContentLoaded', () => {

	const buttonsArr = document.querySelectorAll('.widget__button'),
				widgets = document.querySelectorAll('.widget__content'),
				clock = document.querySelector('.widget__clock');
	let clockInterval = setInterval(showTime, 1000);

	buttonsArr.forEach((btn, i) => {
		btn.addEventListener('click', (e) => {
			if (btn == e.target) {
				removeActiveClass();
				widgets[i].classList.add('widget-active');
			}
		})
	})

	function removeActiveClass() {
		widgets.forEach(block => {
			block.classList.remove('widget-active')
		})
	}

	function getZero(num) {
		if (num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function countTime(minuend, deductible) {
		const elapsedTime = minuend - deductible,
					milliseconds = elapsedTime % 1000,
					tens = getZero(Math.floor(milliseconds / 10)),
					seconds = getZero(Math.floor((elapsedTime / 1000) % 60)),
					minutes = getZero(Math.floor((elapsedTime / 1000 / 60) % 60)),
					hours = getZero(Math.floor(elapsedTime / 1000 / 60 / 60));
		return {
			elapsedTime: elapsedTime,
			tens: tens,
			seconds: seconds,
			minutes: minutes,
			hours: hours
		}
	}

	function showTime() {
		const date = new Date(),
			month = getMonthName(date.getMonth()),
			dayName = getDayName(date.getDay()),
			day = date.getDate(),
			hours = getZero(date.getHours()),
			minutes = getZero(date.getMinutes());

		clock.innerHTML = `<div class="widget__hours">${hours} : ${minutes}</div><div class="widget__day">${dayName}</div><div class="widget__date">${day} ${month}</div>`;

		function getDayName(num) {
			switch (num) {
				case 0:
					return 'Sunday';
				case 1:
					return 'Monday';
				case 2:
					return 'Tuesday';
				case 3:
					return 'Wednesday';
				case 4:
					return 'Thursday';
				case 5:
					return 'Friday';
				case 6:
					return 'Saturday';
			}
		}

		function getMonthName(num) {
			switch (num) {
				case 0:
					return 'January';
				case 1:
					return 'February';
				case 2:
					return 'March';
				case 3:
					return 'April';
				case 4:
					return 'May';
				case 5:
					return 'June';
				case 6:
					return 'July';
				case 7:
					return 'August';
				case 8:
					return 'September';
				case 9:
					return 'October';
				case 10:
					return 'November';
				case 11:
					return 'December';
			}
		}
	}

	function stopWatch() {
		const display = document.querySelector('.widget__sw-display'),
					btnsWrapper = document.querySelector('.widget__sw-buttons'),
					lapsHead = document.querySelector('.widget__sw-head'),
					lapsList = document.querySelector('.widget__sw-laps');
		let interval,
				startTime,
				totalTime,
				lapsArray = [];

		btnsWrapper.addEventListener('click', (e) => {
			const target = e.target;

			if (target.classList.contains('widget__sw-btn--start')) { // Start stopwatch
				target.classList.replace('widget__sw-btn--start', 'widget__sw-btn--pause'); // Change start button
				target.textContent = 'Pause'; // Change start button

				document.querySelector('.widget__sw-btn--lap').classList.add('widget__sw-btn--active'); // Change lap button
				document.querySelector('.widget__sw-btn--reset').classList.remove('widget__sw-btn--active'); // Change reset btn

				startTime = startTime ? Date.now() - totalTime.elapsedTime : Date.now(); // Determine start time
				interval = setInterval(updateDisplay, 10); // Start refreshing display
			} else if (target.classList.contains('widget__sw-btn--pause')) { // Pause
				target.classList.replace('widget__sw-btn--pause', 'widget__sw-btn--start'); // Change start button
				target.textContent = 'Start'; // Change start button

				document.querySelector('.widget__sw-btn--lap').classList.remove('widget__sw-btn--active'); // Change lap button
				document.querySelector('.widget__sw-btn--reset').classList.add('widget__sw-btn--active'); // Change reset btn

				clearInterval(interval);
			} else if (target.classList.contains('widget__sw-btn--reset') && target.classList.contains('widget__sw-btn--active')) { // Reset
				target.classList.remove('widget__sw-btn--active');

				for (key in totalTime) {
					totalTime[key] = 0;
				}

				startTime = 0;
				lapsArray = [];

				display.textContent = '00:00.00';

				lapsHead.classList.remove('widget__sw-head--active'); // Hide laps head block
				lapsList.style.visibility = 'hidden'; // Hide laps block
				lapsList.innerHTML = ''; // Clear laps list
			} else if (target.classList.contains('widget__sw-btn--lap') && target.classList.contains('widget__sw-btn--active')) { // Lap
				lapsHead.classList.add('widget__sw-head--active'); // Show laps head block
				lapsList.style.visibility = 'visible'; // Show laps block

				const lap = document.createElement('li'); // Creating new lap item
				lap.classList.add('widget__sw-lap');
				lapsArray.push(totalTime.elapsedTime); // Add lap time to array
				lap.innerHTML = `<span>${getZero(lapsArray.length)}</span><span>${lapTime().minutes}:${lapTime().seconds}.${lapTime().tens}</span><span>${totalTime.minutes}:${totalTime.seconds}.${totalTime.tens}</span>`;
				lapsList.prepend(lap); // Push lap item
			}
		})

		const lapTime = () => {
			return lapsArray.length > 1 ? countTime(totalTime.elapsedTime, lapsArray[lapsArray.length - 2]) : totalTime;
		}

		function updateDisplay() {
			totalTime = countTime(Date.now(), startTime);

			display.textContent = `${totalTime.minutes}:${totalTime.seconds}.${totalTime.tens}`;
		}
	}

	function timer() {
		const timer = document.querySelector('.widget__timer'),
					startBtn = timer.querySelector('.widget__timer-start'),
					resetBtn = timer.querySelector('.widget__timer-reset'),
					fields = timer.querySelectorAll('.widget__timer-item'),
					hours = timer.querySelector('#timer-hours'),
					minutes = timer.querySelector('#timer-minutes'),
					seconds = timer.querySelector('#timer-seconds'),
					timerDisplay = timer.querySelector('.widget__timer-display'),
					audio = document.createElement('audio');
		let deadline,
				totalTime,
				interval;

		audio.setAttribute('src', 'alarm.mp3');

		startBtn.addEventListener('click', (e) => { // Start or pause timer
			timer.classList.add('widget__timer--active');
			startBtn.classList.toggle('widget__timer-start--pause');

			if (e.target.classList.contains('widget__timer-start--pause')) {
				deadline = deadline ? Date.now() + totalTime.elapsedTime : Date.now() + getTimeFromInputs();
				updateTimer();
				interval = setInterval(updateTimer, 1000);
			} else {
				clearInterval(interval);
			}
		})

		resetBtn.addEventListener('click', () => { // Reset timer
			timer.classList.remove('widget__timer--active');
			startBtn.classList.remove('widget__timer-start--pause');

			startBtn.removeAttribute('disabled');
			audio.remove();

			deadline = 0;
			totalTime = 0;
			clearInterval(interval);
		})

		fields[0].addEventListener('click', (el) => {
			if (el.target.classList.contains('widget__timer-btn--minus') && hours.value < 1) {
				hours.value = 23;
				hours.setAttribute('value', `${hours.value}`);
			} else if (el.target.classList.contains('widget__timer-btn--minus')) {
				hours.stepDown();
				hours.setAttribute('value', `${hours.value}`);
			} else if (el.target.classList.contains('widget__timer-btn--plus') && hours.value > 22) {
				hours.value = 0;
				hours.setAttribute('value', `${hours.value}`);
			} else if (el.target.classList.contains('widget__timer-btn--plus')) {
				hours.stepUp();
				hours.setAttribute('value', `${hours.value}`);
			}
		})

		fields[1].addEventListener('click', (el) => {
			if (el.target.classList.contains('widget__timer-btn--minus') && minutes.value < 1) {
				minutes.value = 59;
				minutes.setAttribute('value', `${minutes.value}`);
			} else if (el.target.classList.contains('widget__timer-btn--minus')) {
				minutes.stepDown();
				minutes.setAttribute('value', `${minutes.value}`);
			} else if (el.target.classList.contains('widget__timer-btn--plus') && minutes.value > 58) {
				minutes.value = 0;
				minutes.setAttribute('value', `${minutes.value}`);
			} else if (el.target.classList.contains('widget__timer-btn--plus')) {
				minutes.stepUp();
				minutes.setAttribute('value', `${minutes.value}`);
			}
		})

		fields[2].addEventListener('click', (el) => {
			if (el.target.classList.contains('widget__timer-btn--minus') && seconds.value < 2) {
				seconds.value = 59;
				seconds.setAttribute('value', `${seconds.value}`);
			} else if (el.target.classList.contains('widget__timer-btn--minus')) {
				seconds.stepDown();
				seconds.setAttribute('value', `${seconds.value}`);
			} else if (el.target.classList.contains('widget__timer-btn--plus') && seconds.value > 58) {
				hours.value > 0 || minutes.value > 0 ? seconds.value = 0 : seconds.value = 1;
				seconds.setAttribute('value', `${seconds.value}`);
			} else if (el.target.classList.contains('widget__timer-btn--plus')) {
				seconds.stepUp();
				seconds.setAttribute('value', `${seconds.value}`);
			}
		})

		function getTimeFromInputs() {
			const getHours = hours.value * 60 * 60 * 1000,
						getMinutes = minutes.value * 60 * 1000,
						getSeconds = seconds.value * 1000,
						totalInputsTime = getHours + getMinutes + getSeconds;
			return totalInputsTime;
		}

		function updateTimer() {
			totalTime = countTime(deadline, Date.now());
			if (totalTime.elapsedTime > 0) {
				timerDisplay.textContent = `${totalTime.hours}:${totalTime.minutes}:${totalTime.seconds}`;
			} else {
				timer.append(audio);
				audio.play();

				startBtn.classList.remove('widget__timer-start--pause');
				startBtn.setAttribute('disabled', 'true');

				clearInterval(interval);
			}
		}
	}

	showTime();
	buttonsArr[2].click();
	stopWatch();
	timer();

})