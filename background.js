chrome.action.onClicked.addListener((tab) => {
  const enabledButton = {
	16: "buttons/qtoh-enabled-16.png",
	32: "buttons/qtoh-enabled-32.png"
  };
  
  const disabledButton = {
	16: "buttons/qtoh-disabled-16.png",
	32: "buttons/qtoh-disabled-32.png"
  };
  
  function showTimedNotification(message, duration) {
    const notificationOptions = {
      type: 'basic',
      iconUrl: 'icons/qtoh-32.png',
      title: chrome.i18n.getMessage("systemMessageTitle"),
      message: message
    };
    chrome.notifications.create(notificationOptions, (notificationId) => {
      setTimeout(() => {chrome.notifications.clear(notificationId);}, 5000);
    });
  }  

  chrome.declarativeNetRequest.getEnabledRulesets().then((sessionRules) => {
    if (sessionRules.includes("ruleset")) {
	  chrome.declarativeNetRequest.updateEnabledRulesets({  
	    enableRulesetIds: [],
        disableRulesetIds: ['ruleset']
	  }, () => {
		  if (chrome.runtime.lastError) {
			console.error("Error disabling ruleset: ", chrome.runtime.lastError);
		  } else {
			chrome.action.setIcon({ path: disabledButton });
			showTimedNotification(chrome.i18n.getMessage("systemMessageExtensionDisabled"));
		  }
	  });
	} else {
	  chrome.declarativeNetRequest.updateEnabledRulesets({  
	    enableRulesetIds: ['ruleset'],
        disableRulesetIds: []
	  }, () => {
		  if (chrome.runtime.lastError) {
			console.error("Error enabling ruleset: ", chrome.runtime.lastError);
		  } else {
			chrome.action.setIcon({ path: enabledButton });
			showTimedNotification(chrome.i18n.getMessage("systemMessageExtensionEnabled"));
		  }
	  });
	}
  });
});