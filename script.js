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

	buttonsArr[0].click();
	showTime();

})