var fclib = {
	protocol: "https",
	server: ""
};

fclib.setServerURL = function(url) {
	window.fclib.server = url;
};

fclib.login = function(username, password, savedPW, success, fail) {
	$.ajax(window.fclib.protocol + "://" + window.fclib.server + "/Login/?Templates=JS&NS=1&Containers&Communities&Chats&ThePulse&Watches&People&BFApplications&JSON=2&appplatformtype=2",  {
		xhrFields: {
			withCredentials: true
		},
		success: function(data) {
			console.log(data);
			if (data.versions == undefined) {
				// hmm.....
				if (data.servername != undefined) {
					// already logged in!
					// let's ask
					//if (!confirm("You're already logged in as " + data.user.name + ".\n\nTo sign in as " + data.user.name + ", click OK. To sign in with the username and password you just typed in, press Cancel.")) {
					//	window.fclib.logout(function() {});
					//}
					// actually don't because FirstClass/BlueField/whatever is nice and just deals with a re-auth attempt.
				}
			} else {
				console.log("Connected to FirstClass server running " + data.versions.OTSW + " with IS version " + data.versions.IS + " and server version " + data.versions.server + "!");
			}
			$.ajax(window.fclib.protocol + "://" + window.fclib.server + "/Login/?Templates=JS&NS=1&Containers&Communities&Chats&ThePulse&Watches&People&BFApplications&JSON=2&appplatformtype=2", {
				method: "POST",
				data: {
					userid: username,
					password: password,
					charset: "UTF-8",
					savedPW: (savedPW ? "1" : "0")
				},
				xhrFields: {
					withCredentials: true
				},
				success: function(data) {
					console.log(data);
					if (data.error !== undefined) {
						fail(data.error.str + " [" + data.error.code + "]");
					} else {
						success(data);
					}
				}
			});
		}
	});
};

window.fclib = fclib;
