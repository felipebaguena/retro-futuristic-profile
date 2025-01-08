import { Project } from '@/types/portfolio'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import {
    DetailContainer,
    ProjectHeader,
    ProjectTitle,
    TechStack,
    TechTag,
    ProjectSection,
    SectionTitle,
    Description,
    FeatureList,
    FeatureItem,
    GithubLink,
    ImageContainer
} from '@/components/styles/PortfolioDetailsElements'

interface ProjectDetailProps {
    project: Project;
}

export const PersonalWebsiteDetail = ({ project }: ProjectDetailProps) => {
    return (
        <DetailContainer>
            <ProjectHeader>
                <ProjectTitle>{project.title}</ProjectTitle>
                <Description>{project.description}</Description>
                <TechStack>
                    {project.tech.map(tech => (
                        <TechTag key={tech}>{tech}</TechTag>
                    ))}
                </TechStack>
            </ProjectHeader>

            <ImageContainer>
                <Image
                    src={project.image}
                    alt={project.title}
                    width={1000}
                    height={562}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block'
                    }}
                    priority
                />
            </ImageContainer>

            <ProjectSection>
                <SectionTitle>Características Principales</SectionTitle>
                <FeatureList>
                    {project.details.features.map((feature, index) => (
                        <FeatureItem key={index}>{feature}</FeatureItem>
                    ))}
                </FeatureList>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Sobre el Proyecto</SectionTitle>
                <Description>
                    Este portfolio personal fue diseñado con la idea de combinar dos estilos distintos:
                    un diseño retro inspirado en las pantallas CRT y un diseño moderno y minimalista.
                    La transición entre ambos estilos se realiza de manera fluida, creando una experiencia
                    única para el usuario.
                </Description>
                <Description>
                    El proyecto está construido utilizando Next.js y TypeScript, con un enfoque en la
                    modularidad y la reutilización de componentes. Los efectos visuales, como el efecto CRT
                    y las animaciones de transición, están implementados utilizando Styled Components.
                </Description>
            </ProjectSection>

            <GithubLink
                href={project.repository.main}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaGithub size={20} />
                Ver en GitHub
            </GithubLink>
        </DetailContainer>
    )
} 