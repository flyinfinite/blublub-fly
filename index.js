import { useState, useEffect } from 'react';

export default function Home() {
  const [owner, setOwner] = useState('');
  const [token, setToken] = useState('');
  const [tokens, setTokens] = useState([]);

  const addToken = async () => {
    await fetch('/api/add-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner, token }),
    });
    setOwner('');
    setToken('');
    fetchTokens();
  };

  const fetchTokens = async () => {
    const res = await fetch('/api/get-tokens');
    const data = await res.json();
    setTokens(data.tokens);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl mb-4">FLY X BLUBLUB </h1>
      <input className="mb-2 p-2 w-full" value={owner} onChange={e => setOwner(e.target.value)} placeholder="Owner Name" />
      <input className="mb-2 p-2 w-full" value={token} onChange={e => setToken(e.target.value)} placeholder="Bot Token" />
      <button className="bg-purple-600 px-4 py-2" onClick={addToken}>+ Add Token</button>

      <h2 className="mt-6">Registered Tokens</h2>
      <ul>
        {tokens.map((t, i) => (
          <li key={i}>{t.owner}: {t.token}</li>
        ))}
      </ul>
    </div>
  );
}