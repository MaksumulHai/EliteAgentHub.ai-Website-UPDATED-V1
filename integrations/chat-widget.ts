import { site } from '../site-config';
type ChatConfiguration = {
  enabled: boolean; status: string; scope: string; widgetId: string;
  scriptUrl: string; resourcesUrl: string; knowledgeVersion: string; evidence: string;
};
const scriptSelector = 'script[data-eah-native-chat-loader="true"]';
const loaderUrl = 'https://widgets.leadconnectorhq.com/loader.js';
const resourcesUrl = 'https://widgets.leadconnectorhq.com/chat-widget/loader.js';
let loading: Promise<void> | undefined;
/** Load the official embed once. Visitors open and close its native launcher. */
export function loadInformationChat(config: ChatConfiguration = site.chat): Promise<void> {
  if (!config.enabled || config.status !== 'verified' || config.scope !== 'information-only' ||
      !config.evidence || !config.knowledgeVersion || !/^[a-f0-9]{24}$/i.test(config.widgetId)) {
    return Promise.reject(new Error('Information chat is not verified'));
  }
  if (config.scriptUrl !== loaderUrl || config.resourcesUrl !== resourcesUrl) {
    return Promise.reject(new Error('Unapproved widget source'));
  }
  const existing = document.querySelector(scriptSelector) as HTMLScriptElement | null;
  if (existing && (existing.tagName !== 'SCRIPT' || existing.src !== loaderUrl ||
      existing.dataset.widgetId !== config.widgetId || existing.dataset.resourcesUrl !== resourcesUrl)) {
    return Promise.reject(new Error('Conflicting widget configuration'));
  }
  if (loading) return loading;
  if (existing?.dataset.eahState === 'loaded') return Promise.resolve();
  const script = existing || document.createElement('script');
  script.dataset.eahNativeChatLoader = 'true'; script.src = loaderUrl;
  script.dataset.resourcesUrl = resourcesUrl;
  script.dataset.widgetId = config.widgetId;
  script.async = true;
  loading = new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      window.clearTimeout(timeout);
      script.removeEventListener('load', loaded);
      script.removeEventListener('error', failed);
    };
    const fail = (message: string) => {
      cleanup(); script.remove(); loading = undefined; reject(new Error(message));
    };
    const loaded = () => { cleanup(); script.dataset.eahState = 'loaded'; resolve(); };
    const failed = () => fail('Widget unavailable');
    const timeout = window.setTimeout(() => fail('Widget timeout'), 12000);
    script.addEventListener('load', loaded, { once: true });
    script.addEventListener('error', failed, { once: true });
    if (!existing) document.body.append(script);
  });
  return loading;
}
