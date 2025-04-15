import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";
import profileImage from "../assets/profile.jpg";
import { useAnimationConfig } from "../hooks/useAnimationConfig";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ProfileContainer = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 300px;
  cursor: pointer;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff00cc, #3333ff, #00ccff, #33cc33);
    background-size: 400% 400%;
    border-radius: 50%;
    z-index: -1;
    animation: gradientBorder 8s ease infinite;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover::before {
    opacity: 0.7;
  }

  @keyframes gradientBorder {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  filter: grayscale(100%);
  transition: all 0.5s ease;

  &:hover {
    filter: grayscale(0%);
  }
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(100, 108, 255, 0.7) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  opacity: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  span {
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: linear-gradient(90deg, #fff, #9089fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.5));
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ExpandedView = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(20, 20, 30, 0.95) 0%,
    rgba(10, 10, 20, 0.98) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  z-index: 10;
  background: rgba(30, 30, 40, 0.3);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1100;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const SocialLink = styled(motion.a)`
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  padding: 0.8rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px) scale(1.2);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Bio = styled(motion.p)`
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  max-width: 600px;
  margin: 1.5rem 0 2rem;
  line-height: 1.8;
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    max-width: 90%;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin: 1rem 0 1.5rem;
  }
`;

const ExpandedImage = styled(motion.img)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-bottom: 2rem;
  object-fit: cover;
  box-shadow: 0 0 30px rgba(100, 108, 255, 0.3);
  border: 4px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 180px;
    margin-bottom: 1.5rem;
  }
`;

const ExpandedName = styled(motion.h1)`
  color: white;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(90deg, #646cff, #9089fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 5px 15px rgba(100, 108, 255, 0.4);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const ExpandedTitle = styled(motion.p)`
  color: white;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1px;
  font-weight: 300;

  span {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #646cff, transparent);
    }
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const PortfolioButton = styled(motion.a)`
  display: inline-block;
  background: linear-gradient(135deg, #646cff 0%, #535bf2 100%);
  color: white;
  font-weight: bold;
  text-decoration: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  margin-top: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 10px 20px rgba(100, 108, 255, 0.4);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 2rem;
    font-size: 0.9rem;
  }
`;

const ParticleContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

const Particle = styled(motion.div)`
  position: absolute;
  background: white;
  border-radius: 50%;
`;

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SkillTag = styled(motion.span)`
  display: inline-block;
  background: rgba(100, 108, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  margin: 0.5rem;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    margin: 0.3rem;
  }
`;

const SkillsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto 1.5rem;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const Profile: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { expandedAnimation, textAnimation, socialAnimation } =
    useAnimationConfig();

  // Generate particles for background effect
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.5 + 0.1,
    color: i % 3 === 0 ? "#646cff" : i % 3 === 1 ? "#9089fc" : "#ffffff",
  }));

  const skills = [
    "React",
    "TypeScript",
    "JavaScript",
    "CSS",
    "HTML",
    "UI/UX Design",
    "Responsive Design",
    "Web Development",
  ];

  return (
    <MainContainer>
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <ProfileContainer
            key="profile-container"
            onClick={() => setIsExpanded(true)}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{
              opacity: 1,
              rotateY: [0, 10, 0, -10, 0],
              rotateZ: [0, 2, 0, -2, 0],
              scale: [1, 1.03, 1, 1.03, 1],
              boxShadow: [
                "0 10px 30px rgba(0, 0, 0, 0.3)",
                "0 15px 40px rgba(100, 108, 255, 0.4)",
                "0 10px 30px rgba(0, 0, 0, 0.3)",
                "0 15px 40px rgba(100, 108, 255, 0.4)",
                "0 10px 30px rgba(0, 0, 0, 0.3)",
              ],
            }}
            transition={{
              boxShadow: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              },
              rotateY: {
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
              },
              rotateZ: {
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              },
              scale: {
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              },
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(100, 108, 255, 0.6)",
              rotate: [0, -5, 0, 5, 0],
              transition: {
                rotate: {
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                },
              },
            }}
          >
            <ProfileImage
              src={profileImage}
              alt="Profile"
              loading="lazy"
              animate={{
                filter: [
                  "grayscale(100%)",
                  "grayscale(80%)",
                  "grayscale(100%)",
                ],
              }}
              transition={{
                filter: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                filter: "grayscale(0%)",
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            />
            <Overlay
              initial={{ opacity: 0 }}
              whileHover={{
                opacity: 1,
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 0.3,
                scale: {
                  repeat: Infinity,
                  duration: 2,
                },
              }}
            >
              <span>Discover My Story</span>
            </Overlay>
          </ProfileContainer>
        ) : (
          <ExpandedView
            key="expanded-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ParticleContainer>
              {particles.map((particle) => (
                <Particle
                  key={particle.id}
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    opacity: particle.opacity,
                    background: particle.color,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [
                      particle.opacity,
                      particle.opacity * 1.5,
                      particle.opacity,
                    ],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "linear",
                  }}
                />
              ))}
            </ParticleContainer>

            <CloseButton
              onClick={() => setIsExpanded(false)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close profile view"
            >
              ×
            </CloseButton>

            <ContentContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ExpandedImage
                src={profileImage}
                alt="Profile"
                {...expandedAnimation}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(100, 108, 255, 0.5)",
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  rotate: {
                    duration: 2,
                    ease: "easeInOut",
                  },
                }}
              />

              <ExpandedName
                {...textAnimation(0.2)}
                whileHover={{ scale: 1.05 }}
              >
                Ayomide
              </ExpandedName>

              <ExpandedTitle {...textAnimation(0.3)}>
                <span>Front-end Developer & UI/UX Designer</span>
              </ExpandedTitle>

              <Bio {...textAnimation(0.4)}>
                Passionate about creating beautiful, functional digital
                experiences. Specializing in modern web technologies and
                intuitive user interfaces.
              </Bio>

              <SkillsContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {skills.map((skill, index) => (
                  <SkillTag
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(100, 108, 255, 0.3)",
                    }}
                  >
                    {skill}
                  </SkillTag>
                ))}
              </SkillsContainer>

              <SocialLinks>
                <SocialLink
                  href="https://github.com/LordAyo"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...socialAnimation(0.5)}
                  aria-label="GitHub Profile"
                >
                  <FaGithub />
                </SocialLink>
                <SocialLink
                  href="https://www.linkedin.com/in/ayomide-abioye/"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...socialAnimation(0.6)}
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedinIn />
                </SocialLink>
                <SocialLink
                  href="mailto:ay4ayomide@gmail.com"
                  {...socialAnimation(0.7)}
                  aria-label="Email Contact"
                >
                  <MdEmail />
                </SocialLink>
              </SocialLinks>

              <PortfolioButton
                href="https://lordayo.github.io/ayomide-portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(100, 108, 255, 0.6)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                View Portfolio
              </PortfolioButton>
            </ContentContainer>
          </ExpandedView>
        )}
      </AnimatePresence>
    </MainContainer>
  );
};

export default Profile;
