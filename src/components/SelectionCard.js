import React from 'react';

function SelectionCard({ title, options }) {
  return (
    <div className="selection-card">
      <h2>{title}</h2>
      <div className="selection-options">
        {options.map((option, index) => (
          <label key={index}>
            <input type="radio" name={title} value={option} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}