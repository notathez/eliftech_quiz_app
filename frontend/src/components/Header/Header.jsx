import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div style={{ borderBottom: '1px solid #e7e7e7', marginBottom: '20px' }}>
      <div className="container">
        <h1
          style={{
            padding: '20px 0',
            fontSize: '2rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <a>Eliftech Quiz App</a>
        </h1>
      </div>
    </div>
  );
};
