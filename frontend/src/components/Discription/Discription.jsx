import React from 'react'
import './Discription.css';

const Sidebar = () => {
    const categories = [
        'Automobiles',
        'Clothes and wear',
        'Home interiors',
        'Computer and tech',
        'Tools, equipment',
        'Sports and outdoor',
        'Animal and pets',
        'Machinery tools',
        'More category',
    ];

    return (
        <div className='container'>
            <ul className="list-group" style={{ width: '200px' }}>
                {categories.map((cat, index) => (
                    <li
                        key={index}
                        className="list-group-item list-group-item-action"
                        style={{ cursor: 'pointer' }}
                    >
                        {cat}
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default Sidebar