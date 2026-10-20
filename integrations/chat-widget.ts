import { site } from '../site-config';
declare global { interface Window { leadConnector?: { chatWidget?: { openWidget?: () => void } }; } }
let loading: Promise<void> | undefined;
/** Native provider bridge. Exact API and iframe keyboard behavior require installed-widget testing. */
export async function openVerifiedChat() {
  if (site.chat.status !== 'verified' || !site.chat.evidence || !site.chat.widgetId || !site.chat.knowledgeVersion) throw new Error('Chat is not verified');
  const url = new URL(site.chat.scriptUrl);
  if (url.protocol !== 'https:' || url.hostname !== 'widgets.leadconnectorhq.com') throw new Error('Unapproved widget origin');
  if (!loading) loading = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url.href; script.dataset.widgetId = site.chat.widgetId;
    script.id = 'eah-native-chat'; script.async = true;
    const timeout = window.setTimeout(() => { script.remove(); loading = undefined; reject(new Error('Widget timeout')); }, 12000);
    script.onload = () => { window.clearTimeout(timeout); resolve(); };
    script.onerror = () => { window.clearTimeout(timeout); script.remove(); loading = undefined; reject(new Error('Widget unavailable')); };
    document.body.append(script);
  });
  await loading;
  if (!window.leadConnector?.chatWidget?.openWidget) throw new Error('Provider open method needs verification');
  window.leadConnector.chatWidget.openWidget();
}
