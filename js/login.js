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
		window.fclib.login($("#username").val(), $("#password").val(), false, function(data) {
			// Success
			$("#login").removeClass("disabled");
			$("#login").text("Log in");

			$("#welcome").addClass("hidden");
			$("#client").removeClass("hidden");
			$(".righthandname").text(data.user.name + " (" + data.user.userid + ") at " + data.servername);

			$(".quota-used").text(data.user.diskuse / 1000);
			$(".quota-max").text(data.user.quota / 1000);

			$.each(data.records, function() {
				var $listitem = $("<li></li>");
				if (this.icon != undefined) {
					var $itemicon = $("<img />");
						$itemicon.attr("src", this.icon.uri);
						$itemicon.attr("data-id", this.icon.id);
					$listitem.append($itemicon);
				}
				$listitem.append("<span>" + this.name + "</span>");
				if (this.subject != undefined && this.subject != "") {
					// it's an email...
					// this is ignored right now.
					// SKIP IT
					return;
				}
				$("#main > ul").append($listitem);
			});
		}, function(msg) {
			// Fail
			$("#login").removeClass("disabled");
			$("#login").text("Log in");

			alert(msg);
		});
	});
});
