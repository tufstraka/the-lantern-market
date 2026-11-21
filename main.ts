// The Lantern Market — entry program (Node 22+, standard library only).
//
// The game itself is the plain static folder game/: an index.html, a stylesheet
// and ES modules that paint two night-market scenes and run the hunt. Nothing
// here builds or bundles it. This program only hands the entry in: it copies
// game/ and screenshots/ next to the output and writes dossier.json, the text
// and image summary the judge reads, with the kit's buildDossier.
//
// Play it locally with `node serve.ts` (http://localhost:8080); outside the
// grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate's own caps, as reference/gate.json states them: text_max_bytes only
// shapes the dossier's text, the rest keep us from writing an entry the scorer
// would refuse.
const DOSSIER_LIMITS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
};

function copyInto(name) {
  const from = join(repoRoot, name);
  if (!existsSync(from)) return false;
  cpSync(from, join(outDir, name), { recursive: true });
  return true;
}

// A fresh output tree every run, so two runs cannot differ by leftovers.
rmSync(join(outDir, 'game'), { recursive: true, force: true });
rmSync(join(outDir, 'screenshots'), { recursive: true, force: true });
rmSync(join(outDir, 'dossier.json'), { force: true });
mkdirSync(outDir, { recursive: true });

copyInto('game');
if (!existsSync(join(outDir, 'screenshots'))) mkdirSync(join(outDir, 'screenshots'), { recursive: true });
copyInto('screenshots');

writeFileSync(join(outDir, 'dossier.json'), buildDossier(outDir, DOSSIER_LIMITS));
console.log(`Lantern Market: ${outDir} is ready (game/, screenshots/, dossier.json).`);
