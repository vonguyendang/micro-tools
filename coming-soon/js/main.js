(function ($) {
	"use strict";


	/*
	Preloader
	------------------------------ */

	setTimeout(function () {
		$('#preloader').fadeToggle();
	}, 1500);

	/*
	Tooltip
	------------------------------ */

	$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

	/*
	Countdown Clock
	------------------------------ */
	function makeTimer() {
		var endTime = new Date("01 January 2025 12:00:00 GMT+07:00");
		endTime = (Date.parse(endTime) / 1000);

		var now = new Date();
		now = (Date.parse(now) / 1000);

		var timeLeft = endTime - now;

		var days = Math.floor(timeLeft / 86400);
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

		if (hours < "10") { hours = "0" + hours; }
		if (minutes < "10") { minutes = "0" + minutes; }
		if (seconds < "10") { seconds = "0" + seconds; }

		$("#days").html(days + "<h6>Days</h6>");
		$("#hours").html(hours + "<h6>Hrs</h6>");
		$("#minutes").html(minutes + "<h6>Min</h6>");
		$("#seconds").html(seconds + "<h6>Sec</h6>");
	}
	setInterval(function () { makeTimer(); }, 1000);


	/*
	Prognroll 
	------------------------------ */
	$(function () {
		$("#scrollbar-right").prognroll({
			height: 2, //Progress bar height
			color: "#fd6802", //Progress bar background color
			custom: true //If you make it true, you can add your custom div and see it's scroll progress on the page
		});
	});

	/*
	Expend 
	------------------------------ */
	/*
	Expend 
	------------------------------ */
	$(".more-info-btn,.close-icon").click(function () {
		$("body,#scrollbar-right,.close-icon").toggleClass("active");
	});

	/*
Notify Form Submission
------------------------------ */
	$("#sm-form").submit(function (e) {
		e.preventDefault();
		var email = $("#email").val();
		var btn = $(this).find("button");
		var originalText = btn.text();

		btn.text("Sending...").prop("disabled", true);

		$.ajax({
			url: 'subscribe.php',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ email: email }),
			success: function (response) {
				alert(response.message);
				$("#sm-form")[0].reset();
				$('#exampleModalCenter').modal('hide');
			},
			error: function (xhr) {
				var err = JSON.parse(xhr.responseText);
				alert(err.error || "Something went wrong");
			},
			complete: function () {
				btn.text(originalText).prop("disabled", false);
			}
		});
	});

	/*
	Contact Form Submission
	------------------------------ */
	$("#contact_form").submit(function (e) {
		e.preventDefault();
		var name = $("#first_name").val();
		var email = $("#email").val(); // Note: ID conflict in HTML, need to check
		var message = $("#message").val();
		var btn = $(this).find("button");
		var originalText = btn.text();

		// Fix ID conflict: The contact form email input has id="email", same as notify form.
		// However, since they are in different forms, we can target by context, but it's better to fix HTML.
		// For now, let's assume we target relative to form.
		email = $(this).find("input[type='email']").val();

		btn.text("Sending...").prop("disabled", true);

		$.ajax({
			url: 'contact.php',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ name: name, email: email, message: message }),
			success: function (response) {
				alert(response.message);
				$("#contact_form")[0].reset();
			},
			error: function (xhr) {
				var err = JSON.parse(xhr.responseText);
				alert(err.error || "Something went wrong");
			},
			complete: function () {
				btn.text(originalText).prop("disabled", false);
			}
		});
	});


})(jQuery)