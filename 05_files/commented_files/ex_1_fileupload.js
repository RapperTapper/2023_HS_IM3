// Import the Supabase client from the setup file
import { supa } from "../../00_setup/supabase.js";

// Add an event listener to ensure the DOM is fully loaded before attaching event handlers
document.addEventListener('DOMContentLoaded', (event) => {
    // Get the upload button by its ID
    const uploadButton = document.getElementById('uploadButton');
    
    // Attach the uploadPhoto function to the button's click event
    uploadButton.addEventListener('click', uploadPhoto);
});

// Define an asynchronous function to handle photo uploads
async function uploadPhoto() {
    // Get the file input and caption input elements by their IDs
    const fileInput = document.getElementById('photoInput');
    const captionInput = document.getElementById('captionInput');
    
    // Check if a file has been selected
    if (fileInput.files.length > 0) {
        // Get the selected file
        const file = fileInput.files[0];
        
        // Define the path where the file will be stored in Supabase Storage
        const filePath = `uploads/${file.name}`;
        
        // Upload the file to Supabase Storage
        const { error: uploadError } = await supa.storage.from('photos').upload(filePath, file);
        
        // Check for errors during the upload
        if (uploadError) {
            console.error('Error uploading file:', uploadError);
            return;
        }
        
        // Save the file metadata (URL and caption) to the 'Photos' table in the database
        const { data, error } = await supa.from('Photos').insert([
            {
                url: filePath,
                caption: captionInput.value
            }
        ]);
        
        // Check for errors during the database insert
        if (error) {
            console.error('Error saving to Photos table:', error);
        } else {
            console.log('Uploaded and saved successfully:', data);
            // Display an alert to inform the user that the upload was successful
            alert('Photo uploaded successfully!');
        }
    } else {
        console.log('No file selected.');
    }
}
