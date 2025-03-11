import styled from "styled-components";

export const DetailContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
`;

export const ProjectHeader = styled.div`
  margin-bottom: 3rem;
`;

export const ProjectTitle = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 2.4rem;
  color: #2d3436;
  margin-bottom: 1rem;
`;

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 2rem 0;
`;

export const TechTag = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  background: #f1f2f6;
  color: #2d3436;
  border-radius: 12px;
`;

export const ProjectSection = styled.section`
  margin: 3rem 0;
`;

export const SectionTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  color: #2d3436;
  margin-bottom: 1.5rem;
`;

export const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #636e72;
  margin: 0 1rem 2rem 1rem;

  @media (max-width: 768px) {
    margin: 0 0.75rem 1.5rem 0.75rem;
  }
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 2rem 0;
`;

export const FeatureItem = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  color: #636e72;
  line-height: 1.6;
`;

export const GithubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: #2d3436;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  transition: background 0.2s ease;

  &:hover {
    background: #1e272e;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin: 2rem 0;
  overflow: hidden;
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // Mantiene el aspect ratio 16:9
  margin: 2rem 0;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;
