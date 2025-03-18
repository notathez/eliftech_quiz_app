import { useState } from 'react';
import { QuizList } from '../components/QuizList/QuizList';
import { Header } from '../components/Header/Header';
import { CatalogToolbar } from '../components/CatalogToolbar/CatalogToolbar';

export default function Catalog() {
  const [sortCriteria, setSortCriteria] = useState('name');

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  return (
    <div>
      <Header />
      <CatalogToolbar onSortChange={handleSortChange} />
      <QuizList sortCriteria={sortCriteria} />
    </div>
  );
}
