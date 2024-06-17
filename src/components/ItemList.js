// src/components/ItemList.js

import React, { useState } from 'react';

const ItemList = ({ items, onEdit, onDelete }) => {
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));

    const sortedItems = [...filteredItems].sort((a, b) => {
        const isReversed = sortOrder === 'asc' ? 1 : -1;
        return isReversed * a.name.localeCompare(b.name);
    });

    return (
        <div>
            <input type="text" placeholder="Filter by name" value={filter} onChange={(e) => setFilter(e.target.value)} />
            <button style={{ marginInline: 4 }} onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                Sort by name ({sortOrder === 'asc' ? 'Descending' : 'Ascending'})
            </button>
            <ul>
                {sortedItems.map(item => (
                    <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {item.name} - {item.category} - {item.date}
                        <button onClick={() => onEdit(item.id)}>Edit</button>
                        <button onClick={() => onDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
