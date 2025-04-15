import Profile from "./components/Profile";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #111 0%, #222 100%);
  padding: 2rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    background: radial-gradient(
        circle at top right,
        rgba(100, 108, 255, 0.1),
        transparent 60%
      ),
      radial-gradient(
        circle at bottom left,
        rgba(144, 137, 252, 0.1),
        transparent 60%
      );
    z-index: 0;
    pointer-events: none;
  }
`;

const ContentWrapper = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const Header = styled(motion.header)`
  margin-bottom: 3rem;
  text-align: center;
  width: 100%;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: white;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #646cff, #9089fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 5px 15px rgba(100, 108, 255, 0.4);
  letter-spacing: 2px;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 300;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Footer = styled(motion.footer)`
  margin-top: 3rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  letter-spacing: 1px;
  position: relative;
  padding: 1rem;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(100, 108, 255, 0.3),
      transparent
    );
  }
`;

function App() {
  return (
    <AppContainer>
      <ContentWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Header>
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Interactive Profile
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Click on the profile image below to explore more information about
            Ayomide and discover my skills, projects, and contact details.
          </Subtitle>
        </Header>

        <Profile />

        <Footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          © {new Date().getFullYear()} Ayomide Abioye • Built with React &
          Framer Motion
        </Footer>
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
