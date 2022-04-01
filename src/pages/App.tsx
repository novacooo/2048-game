import { Helmet } from 'react-helmet';
import MainTemplate from 'components/templates/MainTemplate';

const App = () => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <MainTemplate>
        <div>Welcome in React App!</div>
      </MainTemplate>
    </>
  );
};

export default App;
