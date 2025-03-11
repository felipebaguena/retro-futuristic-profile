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
import { CodeDetails } from '@/components/code-details/CodeDetails'
import { personalWebsiteExamples } from '@/components/code-details/codeExamples'

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
                    La transición entre ambos estilos se realiza de manera fluida, creando una satisfactoria experiencia
                    para el usuario.
                </Description>
                <Description>
                    El proyecto está construido utilizando Next.js y TypeScript, con un enfoque en la
                    modularidad y la reutilización de componentes. Los efectos visuales, como el efecto CRT
                    y las animaciones de transición, están creados completamente de cero empleando únicamente HTML y CSS,
                    e implementados utilizando Styled Components.
                </Description>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Curiosidades</SectionTitle>
                <Description>
                    El proyecto está repleto de detalles curiosos que buscan hablar de mis gustos e inquietudes, 
                    al mismo tiempo que intentan sacar una sonrisa a los usuarios.
                </Description>
                <ImageContainer>
                    <Image
                        src="/portfolio-images/personal-website-details-2.png"
                        alt="Detalles del diseño del sitio web"
                        width={1000}
                        height={562}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block'
                        }}
                    />
                </ImageContainer>
                <Description>
                    La presentación de la web imita al arranque desde el terminal de antigos sistemas operativos, 
                    mientras lanza algunas referencias a la cultura pop como la de la famosa escena de la película Matrix (1999).
                </Description>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Funcionamiento y flujo de la web</SectionTitle>
                <Description>
                    Al ser una web personal, me he permitido abusar un poco de recursos como el de las transiciones con secuencias de texto, 
                    o efectos estéticos que en una web de uso cotidiano serían excesivos. Sin embargo, 
                    también hay pequeños detalles para agilizar el funcionamiento sin perder el estilo.
                </Description>
                <Description>
                    Por ejemplo, cuando lanzamos la web, podemos saltarnos la secuencia de inicio con un sólo click. 
                    También podemos agilizar las transiciones realizándolas desde la barra de navegación en lugar viajar pulsando 
                    sobre los cuadros del menú central. Esto pretende evitar que tras varias visitas a la web, los efectos se sientan repetitivos.
                </Description>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Estética retro y moderna</SectionTitle>
                <Description>
                    El proyecto debía representar dos estéticas diferentes, una para generar impacto desde su presentación, 
                    muy potente en estilo, con mucho trabajo de HTML y CSS, además de muchos efectos, pero también presentar un estilo 
                    mucho más actual, minimizando efectos y aligerando el componente estético.
                </Description>
                <Description>
                    Para mostrar esta dualidad, el punto de entrada perfecto era el portfolio, un lugar en el que la importancia la tienen 
                    los proyectos que se pretenden mostrar y sobre las que esas capas de efectos podían suponer un problema. De modo que, 
                    aprovechando el concepto de sistema operativo antiguo, se pensó en una secuencia de falsa actualización para 
                    justificar un cambio de aspecto que pasaría a afectar a toda la web.
                </Description>
                <Description>
                    La web juega con los estados para, si ya has entrado en la web y has navegado al portfolio, la vuelta al 
                    menú de inicio o las otras secciones, suponga una sorpresa, ya que, toda la web habría cambiado, presentando 
                    una estética completamente diferente.
                </Description>
                <Description>
                    El nexo de unión estético entre el aspecto de CRT antiguo y el estilo minimalista actual se encuentra 
                    en la pantalla de inicio que encontramos tras realizar el cambio estético. Esta es actual y minimalista, 
                    pero muestra efectos de fallos en la imagen propios de un sistema que falla tanto a la hora de mostrar 
                    imagen de vídeo como de procesar el texto. De nuevo, todos estos efectos están desarrollados completamente con 
                    HTML, CSS y TypeScript.
                </Description>
                <ImageContainer>
                    <Image
                        src="/portfolio-images/personal-website-details-4.gif"
                        alt="Detalles del diseño del sitio web"
                        width={1000}
                        height={562}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block'
                        }}
                    />
                </ImageContainer>
            </ProjectSection>

            <ProjectSection>
                <SectionTitle>Detalles Técnicos</SectionTitle>
                <Description>
                    Uno de los aspectos más interesantes del proyecto es la implementación de los efectos visuales.
                    Por ejemplo, el efecto de glitch en los textos se logra mediante la siguiente implementación:
                </Description>
                
                <CodeDetails {...personalWebsiteExamples.glitchEffect} />

                <Description>
                    La secuencia de arranque del sitio es una parte crucial de su experiencia de usuario.
                    Esta secuencia imita el arranque de sistemas antiguos y incluye referencias a la cultura pop.
                </Description>
                
                <CodeDetails {...personalWebsiteExamples.bootSequence} />
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