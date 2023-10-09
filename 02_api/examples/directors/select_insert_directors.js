// Supabase Importieren
import { supa } from "../../../../00_setup/supabase.js";

console.log("Hello World");

async function getAllDirectors() {
  const { data, error } = await supa
    .from("directors")
    .select("first_name, last_name")
    .order('first_name', { ascending: false })
    .limit(5);

  return data;
}

async function displayDirectors() {
  const directors = await getAllDirectors();
  const directorListElement = document.getElementById("directorList"); // Assuming you have an HTML element with id="directorList"

  directors.forEach((director) => {
    const fullName = `${director.first_name} ${director.last_name}`;
    const li = document.createElement("li");
    li.textContent = fullName;
    directorListElement.appendChild(li);
  });
}

// Call the function to display director names
displayDirectors();

// Get references to the input fields
const firstNameInput = document.querySelector(
  'input[placeholder="First Name"]'
);
const lastNameInput = document.querySelector('input[placeholder="Last Name"]');

// Function to add a director to the database
async function addDirector() {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;

  // Check if both first name and last name are provided
  if (firstName && lastName) {
    try {
      // Insert a new director into the "actors" table
      const { data, error } = await supa.from("directors").insert([
        {
          first_name: firstName,
          last_name: lastName,
          birth_date: 'abcd',
        },
      ]);

      if (!error) {
        console.log("Director added successfully:", data);
      } else {
        console.error("Error adding director:", error);
      }
    } catch (error) {
      console.error("Error adding director:", error);
    }
  } else {
    console.error("Please provide both first name and last name.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Call the addDirector function when a button or form is submitted
  // For example, if you have a button with an ID "addDirectorButton":
  document
    .getElementById("addDirectorButton")
    .addEventListener("click", addDirector);
});
