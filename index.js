const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://ogtmyyohrjrwsbtgupwe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ndG15eW9ocmpyd3NidGd1cHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMDMzNDMsImV4cCI6MjA1Njc3OTM0M30.2RM1LY0_Wm41IFJaX9I-dI40s_eb0ekJkz4fN4_CjL4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch all notes
async function fetchNotes() {
  const { data, error } = await supabase
    .from('notes')
    .select('*');

  if (error) {
    console.error('Error fetching notes:', error.message);
    return;
  }
  console.log('Notes:', data);
}

// Add a new note
async function addNote(username, email, title, content) {
  const { data, error } = await supabase
    .from('notes')
    .insert([{ username, email, title, content }])
    .select(); // Ensure the added note is returned

  if (error) {
    console.error('Error adding note:', error.message);
    return;
  }
  console.log('Note added:', data);
}

// Update a note by ID
async function updateNote(id, newContent) {
  const { data, error } = await supabase
    .from('notes')
    .update({ content: newContent })
    .eq('id', id)
    .select(); // Ensure the updated note is returned

  if (error) {
    console.error('Error updating note:', error.message);
    return;
  }
  console.log('Note updated:', data);
}

// Delete a note by ID
async function deleteNote(id) {
  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .select(); // Ensure the deleted note is returned

  if (error) {
    console.error('Error deleting note:', error.message);
    return;
  }
  console.log('Note deleted:', data);
}

// Check table structure
async function checkTableStructure() {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching table structure:', error.message);
    return;
  }
  console.log('Table structure:', data);
}

// Run all functions
(async () => {
  console.log('Fetching all notes...');
  await fetchNotes();

  console.log('Adding a new note...');
  await addNote('Abanoup', 'abanoup@example.com', 'Test Note', 'This is a test note.');

  console.log('Updating note with ID 2...');
  await updateNote(2, 'Updated content for note 2.');

  console.log('Deleting note with ID 2...');
  await deleteNote(2);

  console.log('Checking table structure...');
  await checkTableStructure();
})();
