// src/components/LandingPage.js

import React, { useState } from 'react';
import { items as initialItems } from '../data';
import ItemList from './ItemList';
import ItemForm from './ItemForm';
import { logoutUser } from '../auth';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ setAuthenticated }) => {
    const [items, setItems] = useState(initialItems);
    const [editItemId, setEditItemId] = useState(null); // Track which item is being edited
    const navigate = useNavigate();

    // Function to add a new item
    const addItem = (item) => {
        const newItem = { ...item, id: Date.now() };
        setItems([...items, newItem]);
    };

    // Function to edit an existing item
    const editItem = (editedItem) => {
        const updatedItems = items.map(item =>
            item.id === editedItem.id ? editedItem : item
        );
        setItems(updatedItems);
        setEditItemId(null); // Reset editItemId after update
    };

    // Function to delete an item
    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
        if (editItemId === id) {
            setEditItemId(null); // Reset editItemId if deleted item was being edited
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        logoutUser(setAuthenticated);
        navigate('/login');
    };

    // Function to set editItemId when clicking edit on an item
    const handleEdit = (id) => {
        setEditItemId(id);
    };

    // Get the item currently being edited based on editItemId
    const currentItem = items.find(item => item.id === editItemId);

    return (
        <div>
            <h1>Landing Page</h1>
            <button onClick={handleLogout}>Logout</button>
            <ItemForm
                addItem={addItem}
                editItem={editItem}
                setEditItemId={setEditItemId}
                editMode={editItemId !== null} // Set editMode based on whether an item is being edited
                initialValues={currentItem} // Pass currentItem as initialValues when editing
            />
            <ItemList items={items} onEdit={handleEdit} onDelete={deleteItem} />
        </div>
    );
};

export default LandingPage;
