import React from 'react';
import styles from './catalogToolbar.module.css';
import { useNavigate } from 'react-router-dom';

export const CatalogToolbar = () => {
  const navigate = useNavigate();
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
      </div>
    </div>
  );
};
