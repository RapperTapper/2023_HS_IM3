import { supa } from "../../../00_setup/supabase.js";

async function showMovies() {
  const ul = document.querySelector('#list');
  const { data: movies, error } = await supa.from("movies").select();
  movies.forEach(movie => {
    const li = document.createElement('li');
    li.innerHTML = movie.title;
    ul.appendChild(li);
  })
}
showMovies();

async function showActors() {
  const table = document.querySelector('#table');
  const { data: actors, error } = await supa.from("actors").select();
  actors.forEach(actor => {
    const output = `
      <tr>
        <td>${actor.first_name}</td>
        <td>${actor.last_name}</td>
        <td>${actor.birth_date}</td>
        <td>${actor.nationality}</td>
      </tr>
    `;
    table.innerHTML += output;
  })
}
showActors();