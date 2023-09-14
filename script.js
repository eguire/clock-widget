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
					btnsWrapper = document.querySelector('.widget__sw-buttons');
		let interval,
				startTime,
				elapsedTime,
				time = {milliseconds: 0, tens: 0, seconds: 0, minutes: 0, hours: 0};

		btnsWrapper.addEventListener('click', (e) => {
			const target = e.target;

			if (target.classList.contains('widget__sw-btn--start')) { // Start stopwatch
				target.classList.replace('widget__sw-btn--start', 'widget__sw-btn--pause'); // Change start button
				target.textContent = 'Pause';

				document.querySelector('.widget__sw-btn--lap').classList.add('widget__sw-btn--active'); // Change lap button
				document.querySelector('.widget__sw-btn--reset').classList.remove('widget__sw-btn--active'); // Change reset btn
				
				startTime = startTime ? Date.now() - elapsedTime : Date.now(); // Determine start time
				interval = setInterval(updateDisplay, 10);
			} else if (target.classList.contains('widget__sw-btn--pause')) { // Pause
				target.classList.replace('widget__sw-btn--pause', 'widget__sw-btn--start'); // Change start button
				target.textContent = 'Start';
				
				document.querySelector('.widget__sw-btn--lap').classList.remove('widget__sw-btn--active');
				document.querySelector('.widget__sw-btn--reset').classList.add('widget__sw-btn--active');

				clearInterval(interval)
			} else if (target.classList.contains('widget__sw-btn--reset') && target.classList.contains('widget__sw-btn--active')) { // Reset
				target.classList.remove('widget__sw-btn--active');

				for (key in time) {
					time[key] = 0;
				}

				startTime = 0;
				elapsedTime = 0;

				display.textContent = '00:00.00';
			}
		})

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