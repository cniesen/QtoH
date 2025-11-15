const enabledButton = {
	16: "icon/16.png",
	32: "icon/32.png",
  48: "icon/48.png",
  96: "icon/96.png",
  128: "icon/128.png"
};
  
const disabledButton = {
	16: "icon/disabled-16.png",
 	32: "icon/disabled-32.png",
  48: "icon/disabled-48.png",
  96: "icon/disabled-96.png",
  128: "icon/disabled-128.png"
};

export function setupCounter(statusElement: HTMLParagraphElement, toggleButton: HTMLButtonElement) {
  toggleButton.addEventListener('click', () => { toggleExtensionEnabled(statusElement, toggleButton); });
  updateExtensionStatus(statusElement, toggleButton);
}

async function isExtensionEnabled(): Promise<boolean> {
  const enabledRulesets = await browser.declarativeNetRequest.getEnabledRulesets();
  return enabledRulesets.includes("ruleset");
}

export async function updateExtensionStatus(statusElement: HTMLParagraphElement, toggleButton: HTMLButtonElement): Promise<void> {
  const isEnabled = await isExtensionEnabled();
  if (isEnabled) {
    import.meta.env.FIREFOX ? browser.browserAction.setIcon({ path: enabledButton }) : browser.action.setIcon({ path: enabledButton });
    statusElement.textContent = browser.i18n.getMessage("ExtensionStatusEnabled");
    toggleButton.textContent = browser.i18n.getMessage("extensionButtonTextEnabled");
  } else {
    import.meta.env.FIREFOX ? browser.browserAction.setIcon({ path: disabledButton }) : browser.action.setIcon({ path: disabledButton });
    statusElement.textContent = browser.i18n.getMessage("ExtensionStatusDisabled");
    toggleButton.textContent = browser.i18n.getMessage("extensionButtonTextDisabled");
  }
}

export async function toggleExtensionEnabled(statusElement: HTMLParagraphElement, toggleButton: HTMLButtonElement): Promise<void> {
  const isEnabled = await isExtensionEnabled();
  const rulesets = isEnabled ? {
    enableRulesetIds: [],
    disableRulesetIds: ["ruleset"]
  } : {
    enableRulesetIds: ["ruleset"],
    disableRulesetIds: []
  };
  browser.declarativeNetRequest.updateEnabledRulesets(rulesets).then(() => { updateExtensionStatus(statusElement, toggleButton); });
} 
  