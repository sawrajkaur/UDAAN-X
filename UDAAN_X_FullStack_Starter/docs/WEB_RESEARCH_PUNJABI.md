# UDAAN X v0.9 – Web Research AI (ਪੰਜਾਬੀ ਸੈਟਅੱਪ)

## ਕੀ ਕਰਦਾ ਹੈ?
- ਯੂਜ਼ਰ ਦੇ ਸਵਾਲ ਲਈ Tavily ਰਾਹੀਂ ਵੈੱਬ ਖੋਜ ਕਰਦਾ ਹੈ।
- ਵੱਧ ਤੋਂ ਵੱਧ 6 ਨਤੀਜਿਆਂ ਦੇ snippets AI ਨੂੰ ਦਿੰਦਾ ਹੈ।
- AI ਪੰਜਾਬੀ, ਹਿੰਦੀ ਜਾਂ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਰਿਪੋਰਟ ਬਣਾਉਂਦਾ ਹੈ।
- ਰਿਪੋਰਟ ਵਿੱਚ [1], [2] ਵਰਗੇ ਹਵਾਲੇ ਅਤੇ ਅਸਲ ਸਰੋਤਾਂ ਦੇ ਲਿੰਕ ਦਿਖਾਉਂਦਾ ਹੈ।
- ਰਿਪੋਰਟ ਕਾਪੀ ਜਾਂ TXT ਫਾਈਲ ਵਜੋਂ ਡਾਊਨਲੋਡ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ।

## ਲੋੜੀਂਦੀਆਂ ਸੈਟਿੰਗਾਂ
1. Tavily ਖਾਤੇ ਤੋਂ API key ਲਵੋ।
2. Hosting ਦੇ server environment ਵਿੱਚ `TAVILY_API_KEY` ਸੈੱਟ ਕਰੋ।
3. ਪਹਿਲਾਂ ਤੋਂ ਵਰਤੀਆਂ ਜਾ ਰਹੀਆਂ `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL` ਸੈਟਿੰਗਾਂ ਵੀ ਲਾਜ਼ਮੀ ਹਨ।
4. Supabase Auth ਚਾਲੂ ਹੋਵੇ; ਸਿਰਫ਼ login ਕੀਤਾ ਯੂਜ਼ਰ ਖੋਜ ਕਰ ਸਕਦਾ ਹੈ।
5. Deploy ਮੁੜ ਕਰੋ ਅਤੇ `/research` ਖੋਲ੍ਹ ਕੇ ਟੈਸਟ ਕਰੋ।

## ਸੁਰੱਖਿਆ ਅਤੇ ਸੀਮਾਵਾਂ
- Tavily ਅਤੇ AI keys ਸਿਰਫ਼ server environment ਵਿੱਚ ਰੱਖੋ; browser code ਵਿੱਚ ਨਾ ਪਾਓ।
- ਇਹ ਵਰਜਨ ਛੇ search results ਦੇ extracts 'ਤੇ ਆਧਾਰਿਤ ਹੈ; ਪੂਰੀ ਵੈੱਬਸਾਈਟਾਂ ਦਾ audit ਨਹੀਂ ਕਰਦਾ।
- ਸਰੋਤਾਂ ਦੇ snippets ਅਧੂਰੇ ਜਾਂ ਪੁਰਾਣੇ ਹੋ ਸਕਦੇ ਹਨ। ਮਹੱਤਵਪੂਰਨ ਫ਼ੈਸਲੇ ਤੋਂ ਪਹਿਲਾਂ ਲਿੰਕ ਖੋਲ੍ਹ ਕੇ ਤਸਦੀਕ ਕਰੋ।
- AI citations [n] ਨੂੰ source list ਨਾਲ ਮਿਲਾ ਕੇ ਦਿਖਾਉਂਦਾ ਹੈ; AI ਦੀ ਰਿਪੋਰਟ ਵਿੱਚ ਹਰ ਵਾਕ ਦਾ ਹਵਾਲਾ ਲਾਜ਼ਮੀ ਤੌਰ 'ਤੇ ਸਹੀ ਹੋਵੇ, ਇਸ ਦੀ ਪੂਰੀ ਗਾਰੰਟੀ ਨਹੀਂ।
- Research requests authenticated ਹਨ, ਪਰ production ਲਈ rate limiting, usage quotas, abuse monitoring ਅਤੇ privacy review ਜੋੜਣੇ ਬਾਕੀ ਹਨ।
