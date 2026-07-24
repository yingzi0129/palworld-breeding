-- D1 schema for PalworldBreeding.cc

CREATE TABLE IF NOT EXISTS pals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  number INTEGER NOT NULL,
  internal_name TEXT NOT NULL UNIQUE,
  breeding_power REAL,
  breeding_power_priority INTEGER,
  rarity INTEGER,
  nocturnal INTEGER,
  stats_json TEXT,
  partner_skill_json TEXT,
  work_suitability_json TEXT,
  drops_json TEXT,
  elements_json TEXT,
  image_key TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS breeding_combos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_a_id TEXT,
  parent_b_id TEXT,
  child_id TEXT,
  is_special INTEGER DEFAULT 0,
  gender_required TEXT,
  FOREIGN KEY (parent_a_id) REFERENCES pals(id),
  FOREIGN KEY (parent_b_id) REFERENCES pals(id),
  FOREIGN KEY (child_id) REFERENCES pals(id)
);

CREATE TABLE IF NOT EXISTS passive_skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  internal_name TEXT NOT NULL UNIQUE,
  rank INTEGER,
  description TEXT
);

CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pal_id TEXT,
  x REAL,
  y REAL,
  region TEXT,
  level_min INTEGER,
  level_max INTEGER,
  day_night TEXT,
  note TEXT,
  FOREIGN KEY (pal_id) REFERENCES pals(id)
);

CREATE INDEX IF NOT EXISTS idx_combos_child ON breeding_combos(child_id);
CREATE INDEX IF NOT EXISTS idx_combos_parent_a ON breeding_combos(parent_a_id);
CREATE INDEX IF NOT EXISTS idx_combos_parent_b ON breeding_combos(parent_b_id);
CREATE INDEX IF NOT EXISTS idx_pals_slug ON pals(slug);
