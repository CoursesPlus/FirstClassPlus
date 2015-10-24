function launch() {
  chrome.app.window.create('app.html', {
    id: 'main',
    bounds: { width: 620, height: 500 }
  });
}

chrome.app.runtime.onLaunched.addListener(launch);