# File Uploads

In diesem Kapitel findest du Code-Beispiele zu File Uploads mit Supabase.

## Datenbanktabellen
Damit die Übungen mit deinem Supabase-Projekt funktionieren, musst du folgende Vorbereitungen treffen:

- Erstelle eine Datenbanktabelle `Photos` (gross geschrieben) mit Spalten `id`, `url`, `caption`

- Erstelle einen Bucket `photos` (klein geschrieben)

## Übungen

- `ex_1_fileupload` demonstriert, wie Bilder in einen Bucket hochgeladen werden können und die URL der hochgeladenen Bilder in einer Datenbanktabelle gespeichert wird.

- `ex_2_showphotos` demonstriert, wie Bilder aus dem Bucket angezeigt werden können. Wir müssen hierzu mit sogenannten signed URLs arbeiten, da unser Bucket nicht öffentlich zugänglich ist.

- `ex_3_deletephotos` demonstriert, wie Bilder aus dem Bucket wieder gelöscht werden können.