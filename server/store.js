import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'storage.json');

const initialState = {
  users: [
    {
      id: 'farmer-001',
      name: 'Demo Farmer',
      mobile: '9999999999',
      region: 'Pune',
      farmSizeAcres: 3,
      preferredLanguage: 'Hindi',
      updatedAt: new Date().toISOString(),
    },
  ],
  fields: [
    {
      id: 'field-001',
      userId: 'farmer-001',
      soilType: 'Loamy',
      irrigationType: 'Drip',
      currentCrop: 'Rice',
      updatedAt: new Date().toISOString(),
    },
  ],
  scans: [],
  plans: [],
};

async function ensureFile() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(initialState, null, 2), 'utf8');
  }
}

export async function readStore() {
  await ensureFile();
  const content = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(content);
}

export async function writeStore(nextState) {
  await ensureFile();
  await fs.writeFile(dataFile, JSON.stringify(nextState, null, 2), 'utf8');
}
