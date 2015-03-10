/*chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
	var newVal = "BlueDroid/2.3";
	var changed = false;
	for (var i = 0; i < details.requestHeaders.length; ++i) {
		//details.requestHeaders.splice(i, 1); 		
		if (details.requestHeaders[i].name === 'User-Agent') {
			details.requestHeaders[i].value = newVal;
			changed = true;
		}
		break;
	}
	if (!changed) {
		details.requestHeaders.push({name: "User-Agent", value: newVal});
	}
	return {requestHeaders: details.requestHeaders};
}, {urls: ["*://forum.dalton.org/*"]}, ["blocking", "requestHeaders"]);*/
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(info) {
        // Replace the User-Agent header
        var headers = info.requestHeaders;
        headers.forEach(function(header, i) {
            if (header.name.toLowerCase() == 'user-agent') { 
                header.value = 'BlueDroid/1.3';
            }
        });  
        return {requestHeaders: headers};
    },
    // Request filter
    {
        // Modify the headers for these pages
        urls: [
            "http://forum.dalton.org/*",
            "https://forum.dalton.org/*"
        ],
        // In the main window and frames
        types: ["xmlhttprequest"]
    },
    ["blocking", "requestHeaders"]
);