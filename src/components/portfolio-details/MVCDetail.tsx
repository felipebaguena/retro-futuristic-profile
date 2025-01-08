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

export const MVCDetail = ({ project }: ProjectDetailProps) => {
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
                <SectionTitle>Sobre la Aplicación</SectionTitle>
                <Description>
                    My Videogame Collection es una aplicación web fullstack diseñada para que los
                    coleccionistas de videojuegos puedan gestionar sus colecciones de manera integral.
                    Combina funcionalidades de gestión de colecciones con elementos sociales y un
                    sistema de noticias sobre videojuegos retro.
                </Description>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Funcionalidades Principales</SectionTitle>
                <Description>
                    La aplicación ofrece un conjunto completo de herramientas para coleccionistas:
                </Description>
                <FeatureList>
                    <FeatureItem>Sistema de gestión de colecciones con datatables personalizadas</FeatureItem>
                    <FeatureItem>Sección de noticias sobre videojuegos retro</FeatureItem>
                    <FeatureItem>Red social integrada con sistema de amigos</FeatureItem>
                    <FeatureItem>Chat en tiempo real entre usuarios</FeatureItem>
                    <FeatureItem>Sistema de búsqueda y filtrado avanzado</FeatureItem>
                    <FeatureItem>Gestión de usuarios y perfiles personalizados</FeatureItem>
                </FeatureList>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Desarrollo Frontend</SectionTitle>
                <Description>
                    El frontend está construido con Next.js y TypeScript, utilizando Styled Components
                    para un diseño moderno y responsive. Todos los componentes son personalizados,
                    incluyendo las datatables y el sistema de chat, proporcionando una experiencia
                    de usuario única y consistente.
                </Description>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Desarrollo Backend</SectionTitle>
                <Description>
                    El backend está desarrollado con NestJS, aprovechando TypeScript para mantener
                    un código robusto y tipado. La arquitectura del servidor está diseñada para
                    manejar eficientemente las operaciones en tiempo real del chat y la gestión
                    de datos de las colecciones.
                </Description>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Características Técnicas</SectionTitle>
                <FeatureList>
                    {project.details.features.map((feature, index) => (
                        <FeatureItem key={index}>{feature}</FeatureItem>
                    ))}
                </FeatureList>
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
        </DetailContainer>
    )
} 