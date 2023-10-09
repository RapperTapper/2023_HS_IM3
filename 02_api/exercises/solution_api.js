import { supa } from "../../00_setup/supabase.js";

console.log("08 Übungsdatei verbunden")

// 1. **Alle Filme abrufen**: Hole alle Spalten aller Filme aus der Tabelle `movies`.
async function ex_1() {
    const { data, error } = await supa.from("movies").select();
  
    return data;
  }

console.log('ex_1', ex_1());

// 2. **Nach Genre filtern**: Rufe alle Filme ab, die dem Genre "Action" gehören.
async function ex_2() {
  const { data, error } = await supa.from("movies").select().eq('genre', 'Action');
  return data;
}

console.log('ex_2', ex_2());

// 3. **Ergebnisse sortieren**: Rufe alle Regisseure ab. Ordne sie nach ihrem Geburtsdatum `birth_date` in absteigender Reihenfolge.
async function ex_3() {
  const { data, error } = await supa.from("directors").select().order('birth_date', { ascending: false });
  return data;
}

console.log('ex_3', ex_3());

// 4. **Filme zählen**: Ermittle, wie viele Filme Quentin Tarantino gedreht hat.
async function ex_4() {
  const { data, error } = await supa.from("directors").select().eq('first_name', 'Quentin').eq('last_name', 'Tarantino');
  
  if (data && data.length > 0) {
      const { data: moviesData, error: moviesError } = await supa.from("movies").select().eq('director_id', data[0].director_id);
      return moviesData.length;
  }
  return 0;
}

console.log('ex_4', ex_4());

// 5. **Schauspieler einfügen**: Füge Rowan Atkinson (06.01.1955, British) in die Tabelle `actors` ein.
async function ex_5() {
  const { data, error } = await supa.from("actors").insert([
      { first_name: 'Rowan', last_name: 'Atkinson', birth_date: '1955-01-06', nationality: 'British' }
  ]);
  return data;
}

console.log('ex_5', ex_5());


// 6. **Einen neuen Film hinzufügen**: Füge den Film 'The Hateful Eight' von Quentin Tarantino zur Tabelle `movies` hinzu. (Genre: Western, Rating: R, Veröffentlichungsdatum: 25.12.2015)
async function ex_6() {
  const { data: directorData, error: directorError } = await supa.from("directors").select("director_id").eq('last_name', 'Tarantino');
  if (directorData && directorData.length > 0) {
      const directorID = directorData[0].director_id;
      const { data, error } = await supa.from("movies").insert([
          { title: 'The Hateful Eight', director_id: directorID, release_date: '2015-12-25', genre: 'Western', rating: 'R' }
      ]);
      return data;
  }
  return null;
}

console.log('ex_6', ex_6());

// 7. **Aktualisierungen**: Ändere das Genre von 'Django Unchained' auf 'Action'.
async function ex_7() {
  const { data, error } = await supa.from("movies").update({ genre: 'Action' }).eq('title', 'Django Unchained');
  return data;
}

console.log('ex_7', ex_7());

// 8. **Regisseur aktualisieren**: Ändere den Namen von 'Quentin Tarantino' auf 'Tentin Quarantino'.
async function ex_8() {
  const { data, error } = await supa.from("directors").update({ first_name: 'Tentin', last_name: 'Quarantino' }).eq('first_name', 'Quentin').eq('last_name', 'Tarantino');
  return data;
}

console.log('ex_8', ex_8());

// 9. **Schauspieler löschen**: Lösche einen bestimmten Schauspieler.
async function ex_9() {
  const { data, error } = await supa.from("actors").delete().eq('first_name', 'Rowan').eq('last_name', 'Atkinson');
  return data;
}

console.log('ex_9', ex_9());

// 10. **Tabellen verknüpfen**: Rufe alle Filme zusammen mit den vollständigen Namen ihrer jeweiligen Regisseure ab.
async function ex_10() {
  const { data, error } = await supa.from("movies").select("title, directors(first_name, last_name)");
  return data;
}

console.log('ex_10', ex_10());

// 11. **Mit Verknüpfungen filtern**: Rufe alle Filme ab, die von amerikanischen Regisseuren gedreht wurden.
// Lösung noch bereitstellen

// 12. **Datumsoperationen**: Liste alle Filme auf, die vor dem Jahr 2000 veröffentlicht wurden.
async function ex_12() {
  const { data, error } = await supa
      .from('movies')
      .select('title')
      .lte('release_date', '2000-01-01');
  return data;
}
console.log('ex_12', ex_12());

// 13. **LIKE Operator**: Finde alle Regisseure, deren Vorname ODER Nachname mit dem Buchstaben 'C' beginnt.
async function ex_13() {
  const { data, error } = await supa
      .from('directors')
      .select('*')
      .or('first_name.ilike.C%,last_name.ilike.C%');
  return data;
}
console.log('ex_13', ex_13());

// 14. **Aggregation**: Ermittle, wie viele Filme jeder Regisseur gedreht hat, und ordne das Ergebnis nach der Anzahl der Filme in absteigender Reihenfolge.
async function ex_14() {
  try {
      let directors = await supa.from('directors').select('director_id, first_name, last_name');

      for (let director of directors.data) {
          const { data: movies, error } = await supa.from('movies').select('movie_id').eq('director_id', director.director_id);
          director.movie_count = movies.length;
      }

      directors.data.sort((a, b) => b.movie_count - a.movie_count); // sort descending

      return directors.data;
  } catch (error) {
      console.error('Error fetching directors and their movies:', error.message);
      return [];
  }
}
console.log('ex_14', await ex_14());


// 15. **Case-Anweisungen**: Kategorisiere Filme anhand des Veröffentlichungsdatums vor 2010 als 'Alt', nach 2010 als 'Neu' und zähle die Anzahl in jeder Kategorie.
// Für diese Aufgabe kann die Supabase-API nicht direkt verwendet werden, da sie keine direkte CASE-Anweisungsunterstützung bietet.
// Stattdessen können die Daten abgerufen und in JavaScript verarbeitet werden.
async function ex_15() {
  const { data, error } = await supa.from('movies').select('release_date');
  const categorized = {
      Alt: 0,
      Neu: 0
  };
  for (const movie of data) {
      if (new Date(movie.release_date) < new Date('2010-01-01')) {
          categorized.Alt++;
      } else {
          categorized.Neu++;
      }
  }
  return categorized;
}
console.log('ex_15', ex_15());