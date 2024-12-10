import React, { useState, useEffect } from "react";

export default function SelectedContact({ selectedContactId, setSelectedContactId }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
        );
        const result = await response.json();
        setContact(result); // Store the fetched contact data
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    }

    if (selectedContactId) {
      fetchContact(); // Fetch contact data only if an ID is present
    }
  }, [selectedContactId]);

  function handleBackClick() {
    setSelectedContactId(null); // Reset the selectedContactId to go back to the list view
  }

  if (!contact) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  return (
    <div>
      <h2>Selected Contact Details</h2>
      <p><strong>Name:</strong> {contact.name}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Company:</strong> {contact.company.name}</p>
      <p><strong>Website:</strong> {contact.website}</p>
      <p><strong>Address:</strong> {`${contact.address.street}, ${contact.address.city}`}</p>
      <button onClick={handleBackClick}>Back to Contact List</button>
    </div>
  );
}
