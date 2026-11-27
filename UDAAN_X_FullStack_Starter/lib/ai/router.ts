export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<Record<string, unknown>>;
};

type ProviderConfig = { name: string; baseUrl: string; apiKey: string; model: string };

function providerFrom(prefix: 'AI_PRIMARY' | 'AI_FALLBACK'): ProviderConfig | null {
  const baseUrl = process.env[`${prefix}_BASE_URL`];
  const apiKey = process.env[`${prefix}_API_KEY`];
  const model = process.env[`${prefix}_MODEL`];
  if (!baseUrl || !apiKey || !model) return null;
  return { name: prefix === 'AI_PRIMARY' ? 'primary' : 'fallback', baseUrl, apiKey, model };
}

function getProviders(): ProviderConfig[] {
  const primary = providerFrom('AI_PRIMARY');
  const fallback = providerFrom('AI_FALLBACK');
  // Backward compatibility with v0.2-v0.9 configuration.
  const legacy = process.env.AI_BASE_URL && process.env.AI_API_KEY && process.env.AI_MODEL
    ? { name: 'legacy', baseUrl: process.env.AI_BASE_URL, apiKey: process.env.AI_API_KEY, model: process.env.AI_MODEL }
    : null;
  return [primary, fallback, legacy].filter((item): item is ProviderConfig => Boolean(item))
    .filter((item, index, all) => all.findIndex((other) => other.baseUrl === item.baseUrl && other.model === item.model) === index);
}

export async function completeChat(
  messages: ChatMessage[],
  options: { temperature?: number; timeoutMs?: number } = {},
): Promise<{ content: string; provider: string; model: string }> {
  const providers = getProviders();
  if (!providers.length) throw new Error('AI_PROVIDER_NOT_CONFIGURED');
  const failures: string[] = [];
  for (const provider of providers) {
    try {
      const response = await fetch(`${provider.baseUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${provider.apiKey}` },
        body: JSON.stringify({ model: provider.model, messages, temperature: options.temperature ?? 0.4 }),
        signal: AbortSignal.timeout(options.timeoutMs ?? 60000),
        cache: 'no-store',
      });
      if (!response.ok) {
        const detail = await response.text();
        failures.push(`${provider.name}:${response.status}:${detail.slice(0, 180)}`);
        continue;
      }
      const payload = await response.json();
      const content = payload.choices?.[0]?.message?.content;
      if (typeof content !== 'string' || !content.trim()) {
        failures.push(`${provider.name}:empty_response`);
        continue;
      }
      return { content, provider: provider.name, model: provider.model };
    } catch (error) {
      failures.push(`${provider.name}:${error instanceof Error ? error.message : 'network_error'}`);
    }
  }
  console.error('All configured AI providers failed', failures);
  throw new Error('AI_PROVIDERS_UNAVAILABLE');
}

export function aiReadiness() {
  const providers = getProviders();
  return { configured: providers.length > 0, count: providers.length, names: providers.map((p) => p.name) };
}
