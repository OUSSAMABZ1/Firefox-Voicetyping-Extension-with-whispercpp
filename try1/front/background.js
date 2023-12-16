setTimeout(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .catch(function () {
        browser.tabs.create({
          url: browser.extension.getURL("options.html"),
          active: true
        });
      });
}, 100);
  