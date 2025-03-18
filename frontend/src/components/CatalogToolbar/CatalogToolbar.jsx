import React, { useState } from 'react';
import styles from './catalogToolbar.module.css';
import { useNavigate } from 'react-router-dom';

export const CatalogToolbar = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState('name');
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSort(value);
    onSortChange(value);
  };

  return (
    <div className="container">
      <div className={styles.catalogToolbar}>
        <button
          onClick={() => {
            navigate('/create');
          }}
        >
          Create Quiz
        </button>

        <div className={styles.sortBy}>
          <p>Sort By</p>
          <select value={selectedSort} onChange={handleSortChange}>
            <option value="nameA">A-Z</option>
            <option value="nameZ">Z-A</option>
            <option value="questionsL">Questions(by lower)</option>
            <option value="questionsH">Questions(by higher)</option>
            <option value="completionsL">Completions(by lower)</option>
            <option value="completionsH">Completions(by higher)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
