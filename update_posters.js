// Script to update poster paths in the database
const pool = require('./config/db');
const path = require('path');

// Title → filename mapping (exact lowercase keys from database titles)
const titleToFilename = {
  'animal':             'animal.jpg',
  'pulp fiction':       'pulp fiction.jpg',
  'interstellar':       'intersteller.jpg',
  'the godfather':      'the godfather.jpg',
  'the shawshank redemption': 'the shawsank redemption.jpg',
  'parasite':           'Parasite_(2019_film).png',
  'jawan':              'jawan.jpg',
  'beast':              'beast.jpg',
  'leo':                'Leo_(2023_Indian_film).jpg',
  'oppenheimer':        'oppenheimer.jpg',
  'rrr':                'RRR.jpeg',
  'janatha garage':     'Janatha_Garage.jpg',
  'aadi':               'aadi.jpg',
  'student no.1':       'student no1.jpg',
  'ntr: kathanayakudu': 'ntr kathanayakudu.jpg',
  'madhavudu':          null,          // no poster
  'legend':             'legend.avif',
  'gopala gopala':      'gopala gopala.jpg',
  'indra':              'indra.jpg',
  'tagore':             'tagore.jpg',
  'rangasthalam':       'rangastalam.jpg',
  'sye':                null,
  'attarintiki daredi': 'attarintiki daredi.jpg',
  'khaidi':             null,
  'dunki':              'dunki.jpg',
  'mirzapur':           'mirzapur.jpg',
  'panchayat':          'panchayat.jpg',
  'varisu':             'varisu.jpg',
  'the family man':     'the family man.jpg',
  'maharani':           'maharani.jpg',
  'vikram':             'vikram.jpg',
  'kgf chapter 2':      'kgf 2.jpg',
  'vikram vedha':       null,
  'vada chennai':       null,
  '2.0':                null,
  'kalki 2898 ad':      'kalki 2898 ad.jpg',
  'pushpa: the rise':   null,
  'baahubali: the beginning': null,
  'baahubali 2: the conclusion': null,
  'arjun reddy':        null,
  'uppena':             null,
  'drishyam 2':         null,
  'kgf chapter 1':      null,
  'lucifer':            null,
  '2018':               '2018.jpg',
  'manjummel boys':     'manjummel boys.jpg',
  'premam':             null,
  'pathaan':            null,
  'scam 1992':          'scam 1992.jpg',
  'ponniyin selvan: i': null,
  'jailer':             'jailer.jpg',
  'animal':             'animal.jpg',
  'student no.1':       'student no1.jpg',
};

async function updatePosters() {
  const [rows] = await pool.query('SELECT id, title, type FROM content ORDER BY id');

  let updated = 0;
  let skipped = 0;
  for (const row of rows) {
    const titleKey = row.title.toLowerCase().trim();
    const filename = titleToFilename[titleKey];

    if (filename) {
      const posterPath = `/posters/${filename}`;
      await pool.query(
        'UPDATE content SET thumbnail = ?, banner = ? WHERE id = ?',
        [posterPath, posterPath, row.id]
      );
      console.log(`✅ ID ${row.id}: "${row.title}" → ${filename}`);
      updated++;
    } else {
      console.log(`⚠️  ID ${row.id}: "${row.title}" → NO MATCH`);
      skipped++;
    }
  }

  console.log(`\nUpdated ${updated}/${rows.length} items (${skipped} skipped — no poster available)`);
}

updatePosters().catch(console.error);

