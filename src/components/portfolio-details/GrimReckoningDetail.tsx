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
    ImageContainer,
    VideoContainer,
    StyledIframe
} from '@/components/styles/PortfolioDetailsElements'

interface ProjectDetailProps {
    project: Project;
}

export const GrimReckoningDetail = ({ project }: ProjectDetailProps) => {
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
                <SectionTitle>Sobre el Juego</SectionTitle>
                <Description>
                    Grim Reckoning es un videojuego web RPG que sumerge a los jugadores en el misterioso
                    mundo de Ravenhollow. Con una estética retro inspirada en los clásicos de SEGA de los 90,
                    el juego combina elementos de RPG tradicional con un sistema de diálogo ramificado y
                    combates por turnos estratégicos.
                </Description>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Sistema de Combate</SectionTitle>
                <Description>
                    El juego presenta un sistema de combate por turnos profundo y estratégico:
                </Description>
                <FeatureList>
                    <FeatureItem>Más de 100 enemigos únicos con diferentes niveles de dificultad</FeatureItem>
                    <FeatureItem>Sistema de daño basado en estadísticas y equipamiento</FeatureItem>
                    <FeatureItem>Mecánicas de defensa y gestión de recursos</FeatureItem>
                    <FeatureItem>Objetos de diferentes niveles de rareza</FeatureItem>
                    <FeatureItem>Progresión de personaje con subidas de nivel</FeatureItem>
                </FeatureList>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Características Principales</SectionTitle>
                <FeatureList>
                    {project.details.features.map((feature, index) => (
                        <FeatureItem key={index}>{feature}</FeatureItem>
                    ))}
                </FeatureList>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Desarrollo Técnico</SectionTitle>
                <Description>
                    El frontend está construido en React, con un enfoque en la modularidad y la
                    reutilización de componentes. La interfaz combina elementos modernos con una
                    estética retro, incluyendo efectos CRT y scanlines para mayor inmersión.
                </Description>
                <Description>
                    El backend, desarrollado en PHP Laravel, gestiona toda la lógica de juego,
                    incluyendo el sistema de usuarios, la progresión de personajes, el inventario
                    y el ranking global de héroes.
                </Description>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Enlaces del Proyecto</SectionTitle>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <GithubLink
                        href={project.repository.frontend}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub size={20} />
                        Ver Frontend en GitHub
                    </GithubLink>
                    <GithubLink
                        href={project.repository.backend}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub size={20} />
                        Ver Backend en GitHub
                    </GithubLink>
                </div>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Demostración del Juego</SectionTitle>
                <Description>
                    Mira el vídeo de presentación para ver el juego en acción, incluyendo el sistema
                    de combate, la progresión de personajes y las diferentes características del juego.
                </Description>
                <VideoContainer>
                    <StyledIframe
                        src="https://www.youtube.com/embed/JZwAMuQmA08"
                        title="Grim Reckoning Gameplay"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </VideoContainer>
            </ProjectSection>
        </DetailContainer>
    )
} 