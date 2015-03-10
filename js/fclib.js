var fclib = {server: ""};

fclib.setServerURL = function(url) {
	window.fclib.server = url;
}

fclib.login = function(username, password, savedPW, success, fail) {
	$.get("https://" + window.fclib.server + "/Login/?Templates=JS&NS=1&Containers&Communities&Chats&ThePulse&Watches&People&BFApplications&JSON=2&appplatformtype=2", function(data) {
		console.log(data);
		alert("Connected to FirstClass server running " + data.versions.OTSW + " with IS version " + data.versions.IS + " and server version " + data.versions.server + "!");
		$.post("https://" + window.fclib.server + "/Login/?Templates=JS&NS=1&Containers&Communities&Chats&ThePulse&Watches&People&BFApplications&JSON=2&appplatformtype=2",
			{
				userid: username,
				password: password,
				charset: "UTF-8",
				savedPW: (savedPW ? "1" : "0")
			},
			function(data) {
				console.log(data);
				if (data.error != undefined) {
					fail(data.error.str + " [" + data.error.code + "]");
				} else {
					success();
				}
		});
	});
};

window.fclib = fclib;