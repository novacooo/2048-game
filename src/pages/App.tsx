import { Helmet } from 'react-helmet';
import MainTemplate from 'components/templates/MainTemplate';
import Game from 'pages/Game';

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
        <Game />
      </MainTemplate>
    </>
  );
};

export default App;
