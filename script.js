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
				elapsedTime,
				time = {milliseconds: 0, tens: 0, seconds: 0, minutes: 0, hours: 0},
				lapsArray = [];

		btnsWrapper.addEventListener('click', (e) => {
			const target = e.target;

			if (target.classList.contains('widget__sw-btn--start')) { // Start stopwatch
				target.classList.replace('widget__sw-btn--start', 'widget__sw-btn--pause'); // Change start button
				target.textContent = 'Pause'; // Change start button

				document.querySelector('.widget__sw-btn--lap').classList.add('widget__sw-btn--active'); // Change lap button
				document.querySelector('.widget__sw-btn--reset').classList.remove('widget__sw-btn--active'); // Change reset btn
				
				startTime = startTime ? Date.now() - elapsedTime : Date.now(); // Determine start time
				interval = setInterval(updateDisplay, 10); // Start refreshing display
			} else if (target.classList.contains('widget__sw-btn--pause')) { // Pause
				target.classList.replace('widget__sw-btn--pause', 'widget__sw-btn--start'); // Change start button
				target.textContent = 'Start'; // Change start button
				
				document.querySelector('.widget__sw-btn--lap').classList.remove('widget__sw-btn--active'); // Change lap button
				document.querySelector('.widget__sw-btn--reset').classList.add('widget__sw-btn--active'); // Change reset btn

				clearInterval(interval);
			} else if (target.classList.contains('widget__sw-btn--reset') && target.classList.contains('widget__sw-btn--active')) { // Reset
				target.classList.remove('widget__sw-btn--active');

				for (key in time) {
					time[key] = 0;
				}

				startTime = 0;
				elapsedTime = 0;
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
				lapsArray.push(elapsedTime);
				lap.innerHTML = `<span>${getZero(lapsArray.length)}</span><span>${countLapTime().minutes}:${countLapTime().seconds}.${countLapTime().tens}</span><span>${getZero(time.minutes)}:${getZero(time.seconds)}.${getZero(time.tens)}</span>`;
				lapsList.prepend(lap); // Push lap item
			}
		})

		function countLapTime() {
			if (lapsArray.length > 1) {
				const lapTime = elapsedTime - lapsArray[lapsArray.length - 2],
							milliseconds = lapTime % 1000,
							tens = getZero(Math.floor(milliseconds / 10)),
							seconds = getZero(Math.floor((lapTime / 1000) % 60)),
							minutes = getZero(Math.floor((lapTime / 1000 / 60) % 60)),
							hours = getZero(Math.floor(lapTime / 1000 / 60 / 60));
				return {
					tens: tens,
					seconds: seconds,
					minutes: minutes,
					hours: hours
				}
			} else {
				return {
					tens: getZero(time.tens),
					seconds: getZero(time.seconds),
					minutes: getZero(time.minutes),
					hours: getZero(time.hours)
				}
			}
		}

		function updateDisplay() {
			elapsedTime = Date.now() - startTime;
			time.milliseconds = elapsedTime % 1000;
			time.tens = Math.floor(time.milliseconds / 10);
			time.seconds = Math.floor((elapsedTime / 1000) % 60);
			time.minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
			time.hours = Math.floor(elapsedTime / 1000 / 60 / 60);

			display.textContent = `${getZero(time.minutes)}:${getZero(time.seconds)}.${getZero(time.tens)}`;
		}
	}

	showTime();
	buttonsArr[0].click();
	stopWatch();

})