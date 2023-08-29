window.addEventListener('DOMContentLoaded', () => {

	const buttonsArr = document.querySelectorAll('.clock__button'),
				content = document.querySelector('.clock__content');

	buttonsArr.forEach(btn => {
		btn.addEventListener('click', (e) => {
			switch (e.target.innerText) {
				case 'Clock':
					showTime();
					break;
				case 'Stopwatch':
					console.log('stopwatch')
					break;
				case 'Timer':
					console.log('timer')
					break;
			}
		})
	})

	function showTime() {
		updateTime();
		setInterval(updateTime, 1000);

		function updateTime() {
			const date = new Date(),
						month = getMonthName(date.getMonth()),
						dayName = getDayName(date.getDay()),
						day = date.getDate(),
						hours = date.getHours(),
						minutes = date.getMinutes();

			content.innerHTML = `<div class="clock__hours">${hours} : ${minutes}</div><div class="clock__day">${dayName}</div><div class="clock__date">${day} ${month}</div>`
		}

		function getDayName(num) {
			switch (num) {
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
				case 7: 
					return 'Sunday';
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

})