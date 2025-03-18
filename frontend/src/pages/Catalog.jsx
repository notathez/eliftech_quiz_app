import { QuizList } from '../components/QuizList/QuizList';
import { Header } from '../components/Header/Header';
import { CatalogToolbar } from '../components/CatalogToolbar/CatalogToolbar';

export default function Catalog() {
  return (
    <div>
      <Header />
      <CatalogToolbar />
      <QuizList />
    </div>
  );
}
