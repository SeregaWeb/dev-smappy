;
(function ($) {

	$(document).ready(function () {

		let text_area = document.querySelectorAll('.js-text-counter');

		document.body.addEventListener('submit', (event) => {
			let role = event.target.dataset.role;

			if (!role) {
				return 0;
			}

			switch (role) {
				case 'mail':
					event.preventDefault();
					let action = 'mail.php';
					let form = event.target;

					if (form) {
						let notice_container = form.querySelector('.js-notice');
						let form_data = new FormData(form);

						const options = {
							method: 'POST',
							body: form_data,
						};

						fetch(action, options)
							.then(res => res.json())
							.then(requestStatus => {
								console.log(requestStatus)
								if (requestStatus.success === true) {
									form.reset();
									notice_container.innerHTML = `<p class="notice-success"><bdo dir="rtr">${requestStatus.message}</bdo></p>`;
								} else {
									notice_container.innerHTML = `<p class="notice-error"><bdo dir="rtr">${requestStatus.message}</bdo></p>`;
								}
							});
					}
					break;
			}
		});

		// counter length in textarea popup
		(text_area) && text_area.forEach(item => {
			item.addEventListener('input', event => {
				let label = event.target.closest('label');
				let counter = label.querySelector('.js-count');
				if (counter) {
					counter.innerText = event.target.value.length;
				}
			})
		});

		// funcybox popup
		$('.js-popup-activatop').click(function (event) {
			event.preventDefault();
			let popup = $(`#${event.target.dataset.popup}`);
			if (popup) {
				popup_open(popup);
			}
		});

		function popup_open(popup) {
			if (popup) {
				$.fancybox.close();
				$.fancybox.open({
					openEffect: 'none',
					closeEffect: 'none',
					type: 'inline',
					src: popup,
					scrolling: 'no',
					helpers: {
						overlay: {
							locked: false
						}
					}
				}).trigger('click');
			}
		}
	});

})(jQuery);