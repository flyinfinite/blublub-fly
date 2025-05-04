import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('./data/tokens.json');
  const tokens = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath))
    : [];

  res.status(200).json({ tokens });
}