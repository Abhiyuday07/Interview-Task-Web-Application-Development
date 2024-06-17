// src/components/ItemForm.js

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ItemForm = ({ addItem, editItem, editMode, setEditItemId, initialValues }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

    useEffect(() => {
        if (initialValues) {
            setName(initialValues.name);
            setCategory(initialValues.category);
            setDate(initialValues.date);
        } else {
            setName('');
            setCategory('');
            setDate('');
        }
    }, [initialValues]);


    useEffect(() => {
        if (editItem)
            openDialog()
    }, [editMode])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode && initialValues) {
            editItem({ ...initialValues, name, category, date });
        } else {
            addItem({ id: uuidv4(), name, category, date });
        }
        closeDialog(); // Close dialog after submitting form
    };

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    }

    return (
        <div>
            <h3>{editMode ? 'Edit Item' : 'Add New Item'}</h3>
            {isDialogOpen ? (
                <div className="dialog">
                    <div className="dialog-content">
                        <form onSubmit={handleSubmit} style={{ minWidth: '400px' }}>
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                            <button type="submit">{editMode ? 'Update Item' : 'Add Item'}</button>
                            <button type="button" onClick={() => { toggleDialog(); setEditItemId(null) }}>Cancel</button>
                        </form>
                    </div>
                </div>
            ) :
                <button onClick={openDialog}>{editMode ? 'Edit' : 'Add New'}</button>
            }

        </div>
    );
};

export default ItemForm;
