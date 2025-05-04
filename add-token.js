import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const filePath = path.resolve('./data/tokens.json');
    const { owner, token } = req.body;

    const tokens = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath))
      : [];

    tokens.push({ owner, token });

    fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2));
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}