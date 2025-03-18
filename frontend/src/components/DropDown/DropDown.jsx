import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';
import styles from './dropDown.module.css';

export const DropDown = ({ quizId, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (action) => {
    setIsOpen(false);
    if (action === 'run') navigate(`/quiz/${quizId}`);
    if (action === 'edit') navigate(`/quiz/${quizId}/edit`);
    if (action === 'delete') onDelete(quizId);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.dropdownBtn} onClick={toggleDropdown}>
        <EllipsisVertical />
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li
            className={styles.dropdownItem}
            onClick={() => handleOptionClick('edit')}
          >
            Edit
          </li>
          <li
            className={styles.dropdownItem}
            onClick={() => handleOptionClick('run')}
          >
            Run
          </li>
          <li
            className={styles.dropdownItem}
            onClick={() => handleOptionClick('delete')}
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
};
