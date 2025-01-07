'use client'
import styled from 'styled-components'
import { PortfolioNavbar } from '@/components/PortfolioNavbar'
import { ModernPageContainer, ModernContentContainer } from '@/components/styles/CommonElements'
import { projects } from '@/components/PortfolioView'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'

const ProjectContainer = styled.div`
  padding: 2rem 0;
  max-width: 1000px;
  margin: 0 auto;
`

const ProjectHeader = styled.div`
  margin-bottom: 3rem;
`

const ProjectTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 2.4rem;
  color: #2d3436;
  margin-bottom: 1rem;
`

const ProjectImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 2rem 0;
`

const TechTag = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  background: #f1f2f6;
  color: #2d3436;
  border-radius: 12px;
`

const ProjectDescription = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #636e72;
  margin: 2rem 0;
`

const GithubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: #2d3436;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: background 0.2s ease;

  &:hover {
    background: #1e272e;
  }
`

const GithubLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`

export default function ProjectDetail() {
    const { projectId } = useParams()
    const project = projects.find(p => p.id === projectId)

    if (!project) {
        return <div>Proyecto no encontrado</div>
    }

    return (
        <>
            <PortfolioNavbar />
            <ModernPageContainer>
                <ModernContentContainer>
                    <ProjectContainer>
                        <ProjectHeader>
                            <ProjectTitle>{project.title}</ProjectTitle>
                            <TechStack>
                                {project.tech.map(tech => (
                                    <TechTag key={tech}>{tech}</TechTag>
                                ))}
                            </TechStack>
                        </ProjectHeader>

                        <ProjectImageContainer>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </ProjectImageContainer>

                        <ProjectDescription>
                            {project.description}
                        </ProjectDescription>

                        <GithubLinks>
                            {project.repository.main ? (
                                <GithubLink href={project.repository.main} target="_blank" rel="noopener noreferrer">
                                    <FaGithub size={20} />
                                    Ver en GitHub
                                </GithubLink>
                            ) : (
                                <>
                                    <GithubLink href={project.repository.frontend} target="_blank" rel="noopener noreferrer">
                                        <FaGithub size={20} />
                                        Ver Frontend en GitHub
                                    </GithubLink>
                                    <GithubLink href={project.repository.backend} target="_blank" rel="noopener noreferrer">
                                        <FaGithub size={20} />
                                        Ver Backend en GitHub
                                    </GithubLink>
                                </>
                            )}
                        </GithubLinks>
                    </ProjectContainer>
                </ModernContentContainer>
            </ModernPageContainer>
        </>
    )
} 