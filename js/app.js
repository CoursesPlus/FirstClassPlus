$(document).ready(function() {
  $("body").attr("data-baseUrl", chrome.runtime.getURL("").slice(0, -1));
  var webview = $("webview")[0];
  webview.setUserAgentOverride("BlueDroid/1.3");
  webview.request.onHeadersReceived.addListener(function(details) {
    console.log(details);
    var rHeads = details.responseHeaders;
    rHeads.push({name: "Access-Control-Allow-Origin", value: $("body").attr("data-baseUrl")});
    rHeads.push({name: "Access-Control-Allow-Credentials", value: "true"});
    return {responseHeaders: rHeads};
  }, {urls: ["*://forum.dalton.org/*"]}, ["blocking", "responseHeaders"]);
});