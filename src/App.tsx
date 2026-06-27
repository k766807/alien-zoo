import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CareMood, SpeciesLog, ThreatLevel, starterSpecies } from './data/species';

const STORAGE_KEY = 'alien-zoo-field-journal-v1';

const emptyLog: Omit<SpeciesLog, 'id' | 'tags'> & { tags: string } = {
  commonName: '',
  scientificName: '',
  homeWorld: '',
  habitat: '',
  diet: '',
  behaviorNotes: '',
  enrichment: '',
  conservationStatus: '',
  threatLevel: 'tiny',
  keeperMood: 'curious',
  viviNote: '',
  tags: '',
};

const threatLevels: ThreatLevel[] = ['tiny', 'medium', 'chaos goblin', 'majestic hazard'];
const careMoods: CareMood[] = ['pleased', 'curious', 'concerned', 'overstimulated', 'deeply fond'];

function makeId() {
  if ('crypto' in window && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `species-${Date.now()}`;
}

function loadLogs() {
  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return starterSpecies;
  }

  try {
    return JSON.parse(saved) as SpeciesLog[];
  } catch {
    return starterSpecies;
  }
}

function App() {
  const [logs, setLogs] = useState<SpeciesLog[]>(loadLogs);
  const [selectedId, setSelectedId] = useState(logs[0]?.id ?? '');
  const [form, setForm] = useState(emptyLog);
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const selected = logs.find((log) => log.id === selectedId) ?? logs[0];

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return logs;
    }

    return logs.filter((log) => {
      const haystack = [
        log.commonName,
        log.scientificName,
        log.homeWorld,
        log.habitat,
        log.diet,
        log.behaviorNotes,
        log.enrichment,
        log.conservationStatus,
        log.threatLevel,
        log.keeperMood,
        log.viviNote,
        log.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [logs, search]);

  function updateForm(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleAddLog(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.commonName.trim()) {
      return;
    }

    const nextLog: SpeciesLog = {
      ...form,
      id: makeId(),
      commonName: form.commonName.trim(),
      scientificName: form.scientificName.trim() || 'Unknown / awaiting classification',
      homeWorld: form.homeWorld.trim() || 'Earth, probably',
      habitat: form.habitat.trim() || 'Observation incomplete',
      diet: form.diet.trim() || 'Unknown snacks',
      behaviorNotes: form.behaviorNotes.trim() || 'Subject requires further watching.',
      enrichment: form.enrichment.trim() || 'Provide novelty, shelter, and respectful observation.',
      conservationStatus: form.conservationStatus.trim() || 'Unknown',
      viviNote: form.viviNote.trim() || 'Creature requires patience and careful notes.',
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    setLogs((current) => [nextLog, ...current]);
    setSelectedId(nextLog.id);
    setForm(emptyLog);
  }

  function resetDemoData() {
    setLogs(starterSpecies);
    setSelectedId(starterSpecies[0].id);
    setSearch('');
  }

  return (
    <main className="app-shell">
      <section className="hero panel glow-panel">
        <div>
          <p className="eyebrow">Alien Zoo Field Journal</p>
          <h1>Observe Earth creatures like a gentle extraterrestrial researcher.</h1>
          <p className="hero-copy">
            Build little field notes for real animals, zoo sims, or imaginary species. Track habitat,
            behavior, enrichment, conservation, and the official Vivi note.
          </p>
        </div>
        <div className="mission-card">
          <span className="mission-label">Current Mission</span>
          <strong>Classify the soft hazards.</strong>
          <p>Careful observation. No flattening. Purr interface optional.</p>
        </div>
      </section>

      <section className="dashboard-grid">
        <aside className="panel sidebar">
          <div className="section-heading">
            <p className="eyebrow">Specimen Index</p>
            <h2>Known creatures</h2>
          </div>

          <label className="search-label" htmlFor="search">
            Search logs
          </label>
          <input
            id="search"
            className="input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="red panda, aquatic, chaos..."
          />

          <div className="creature-list" aria-label="Creature logs">
            {filteredLogs.map((log) => (
              <button
                className={`creature-button ${log.id === selected?.id ? 'active' : ''}`}
                key={log.id}
                onClick={() => setSelectedId(log.id)}
                type="button"
              >
                <span>{log.commonName}</span>
                <small>{log.threatLevel} · {log.keeperMood}</small>
              </button>
            ))}
          </div>

          <button className="ghost-button" type="button" onClick={resetDemoData}>
            Restore starter logs
          </button>
        </aside>

        <section className="panel field-card" aria-live="polite">
          {selected ? (
            <>
              <div className="card-topline">
                <p className="eyebrow">Active Observation</p>
                <span className="pill">{selected.threatLevel}</span>
              </div>
              <h2>{selected.commonName}</h2>
              <p className="scientific-name">{selected.scientificName}</p>

              <div className="stats-row">
                <div>
                  <span>Home world</span>
                  <strong>{selected.homeWorld}</strong>
                </div>
                <div>
                  <span>Keeper mood</span>
                  <strong>{selected.keeperMood}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{selected.conservationStatus}</strong>
                </div>
              </div>

              <div className="note-grid">
                <article>
                  <h3>Habitat Needs</h3>
                  <p>{selected.habitat}</p>
                </article>
                <article>
                  <h3>Diet</h3>
                  <p>{selected.diet}</p>
                </article>
                <article>
                  <h3>Behavior Notes</h3>
                  <p>{selected.behaviorNotes}</p>
                </article>
                <article>
                  <h3>Enrichment Plan</h3>
                  <p>{selected.enrichment}</p>
                </article>
              </div>

              <div className="vivi-note">
                <span>Vivi note</span>
                <p>{selected.viviNote}</p>
              </div>

              <div className="tag-row">
                {selected.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </>
          ) : (
            <p>No creatures logged yet. Add the first strange little specimen.</p>
          )}
        </section>
      </section>

      <section className="panel add-panel">
        <div className="section-heading">
          <p className="eyebrow">New Entry</p>
          <h2>Add a creature log</h2>
        </div>

        <form className="entry-form" onSubmit={handleAddLog}>
          <label>
            Common name
            <input
              className="input"
              value={form.commonName}
              onChange={(event) => updateForm('commonName', event.target.value)}
              placeholder="Moonlit Lemur"
              required
            />
          </label>

          <label>
            Scientific / alien name
            <input
              className="input"
              value={form.scientificName}
              onChange={(event) => updateForm('scientificName', event.target.value)}
              placeholder="Lemur noctiluna"
            />
          </label>

          <label>
            Home world / range
            <input
              className="input"
              value={form.homeWorld}
              onChange={(event) => updateForm('homeWorld', event.target.value)}
              placeholder="Earth / Madagascar, maybe sector 7"
            />
          </label>

          <label>
            Conservation status
            <input
              className="input"
              value={form.conservationStatus}
              onChange={(event) => updateForm('conservationStatus', event.target.value)}
              placeholder="Endangered, stable, unknown..."
            />
          </label>

          <label>
            Threat level
            <select
              className="input"
              value={form.threatLevel}
              onChange={(event) => updateForm('threatLevel', event.target.value as ThreatLevel)}
            >
              {threatLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>

          <label>
            Keeper mood
            <select
              className="input"
              value={form.keeperMood}
              onChange={(event) => updateForm('keeperMood', event.target.value as CareMood)}
            >
              {careMoods.map((mood) => (
                <option key={mood} value={mood}>{mood}</option>
              ))}
            </select>
          </label>

          <label className="wide">
            Habitat needs
            <textarea
              className="input"
              value={form.habitat}
              onChange={(event) => updateForm('habitat', event.target.value)}
              placeholder="Temperature, plants, shelter, social space, water, climbing..."
            />
          </label>

          <label className="wide">
            Diet
            <textarea
              className="input"
              value={form.diet}
              onChange={(event) => updateForm('diet', event.target.value)}
              placeholder="Favorite snacks and nutritional diplomacy."
            />
          </label>

          <label className="wide">
            Behavior notes
            <textarea
              className="input"
              value={form.behaviorNotes}
              onChange={(event) => updateForm('behaviorNotes', event.target.value)}
              placeholder="What does the creature do when it thinks no one is watching?"
            />
          </label>

          <label className="wide">
            Enrichment plan
            <textarea
              className="input"
              value={form.enrichment}
              onChange={(event) => updateForm('enrichment', event.target.value)}
              placeholder="Objects, social structure, hiding spots, puzzles, rituals."
            />
          </label>

          <label className="wide">
            Vivi note
            <textarea
              className="input"
              value={form.viviNote}
              onChange={(event) => updateForm('viviNote', event.target.value)}
              placeholder="Creature requires patience, precise lighting, and soft observation."
            />
          </label>

          <label className="wide">
            Tags, comma separated
            <input
              className="input"
              value={form.tags}
              onChange={(event) => updateForm('tags', event.target.value)}
              placeholder="nocturnal, soft hazard, arboreal"
            />
          </label>

          <button className="primary-button" type="submit">Log creature</button>
        </form>
      </section>
    </main>
  );
}

export default App;
