$(document).ready(function() {
	$("#login").click(function() {
		if ($(this).hasClass("disabled")) {
			return;
		}
		if ($("#username").val() == "" || $("#password").val() == "") {
			alert("Please type in both a username and password.");
			return;
		}
		$(this).addClass("disabled");
		$(this).text("Logging in..");
		window.fclib.setServerURL("forum.dalton.org");
		window.fclib.login($("#username").val(), $("#password").val(), false, function() {			
			// Success
			alert("login success");
			$("#login").removeClass("disabled");
			$("#login").text("Log in");
		}, function(msg) {			
			// Fail
			alert(msg);
			$("#login").removeClass("disabled");
			$("#login").text("Log in");
		});
	});
});