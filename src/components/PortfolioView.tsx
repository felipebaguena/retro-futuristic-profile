import styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  padding: 2rem 0;
`

const ProjectCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`

const ProjectImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`

const ProjectInfo = styled.div`
  padding: 1.5rem;
`

const ProjectTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.4rem;
  color: #2d3436;
  margin: 0 0 0.5rem 0;
`

const ProjectDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #636e72;
  line-height: 1.5;
  margin: 0;
`

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`

const TechTag = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  padding: 0.2rem 0.8rem;
  background: #f1f2f6;
  color: #2d3436;
  border-radius: 12px;
`

export const projects = [
    {
        id: "personal-website",
        title: "Portfolio Personal",
        description: "Portfolio con efectos CRT y diseño moderno, construido con Next.js y TypeScript. Incluye transiciones entre estilos retro y modernos, efectos de glitch y animaciones personalizadas.",
        image: "/portfolio-images/personal-website.png",
        tech: ["Next.js", "TypeScript", "Styled Components", "React"],
        repository: {
            main: "https://github.com/felipebaguena/retro-futuristic-profile"
        },
        details: {
            features: [
                "Diseño dual con modo retro CRT y moderno",
                "Transiciones y animaciones personalizadas",
                "Efectos de glitch y scanlines",
                "Diseño responsive"
            ]
        }
    },
    {
        id: "grim-reckoning",
        title: "Grim Reckoning",
        description: "Videojuego web RPG desarrollado en React con estética retro inspirada en los clásicos de SEGA de los 90. Incluye sistema de combate por turnos, progresión de personajes, inventario de objetos y narrativa ramificada.",
        image: "/portfolio-images/grim-reckoning.png",
        tech: ["React", "JavaScript", "PHP", "Laravel", "Bootstrap", "CSS3", "HTML5"],
        repository: {
            frontend: "https://github.com/felipebaguena/fbp_font_proyecto_final_gh_2023",
            backend: "https://github.com/felipebaguena/fbp_bbdd_proyecto_final_gh_2023"
        },
        details: {
            features: [
                "Sistema de combate por turnos con más de 100 enemigos únicos",
                "Progresión de personajes con niveles y equipamiento",
                "Sistema de diálogos con decisiones que afectan la narrativa",
                "Diseño responsive para móviles y tablets",
                "Estética retro con efectos CRT y scanlines",
                "Backend en PHP Laravel con sistema de usuarios y rankings"
            ],
            stack: {
                frontend: ["React", "JavaScript", "Bootstrap", "CSS3", "HTML5"],
                backend: ["PHP", "Laravel", "MySQL"]
            }
        }
    },
    {
        id: "mvc-app",
        title: "My Videogame Collection",
        description: "Aplicación web fullstack para gestión de colecciones de videojuegos con funcionalidades sociales, noticias retro y sistema de chat en tiempo real.",
        image: "/portfolio-images/mvc.png",
        tech: ["Next.js", "TypeScript", "Styled Components", "Node.js", "NestJS"],
        repository: {
            frontend: "https://github.com/felipebaguena/appCollectionFront",
            backend: "https://github.com/felipebaguena/appCollectionBack"
        },
        details: {
            features: [
                "Gestión integral de colecciones con datatables personalizadas",
                "Sistema de noticias sobre videojuegos retro",
                "Funcionalidades sociales con sistema de amigos",
                "Chat en tiempo real",
                "Backend robusto con NestJS y TypeScript",
                "Diseño moderno y responsive con componentes custom"
            ],
            stack: {
                frontend: ["Next.js", "TypeScript", "Styled Components", "React"],
                backend: ["NestJS", "Node.js", "TypeScript"]
            }
        }
    }
]

export const PortfolioView = () => {
    const router = useRouter()

    const handleProjectClick = (projectId: string) => {
        router.push(`/portfolio/${projectId}`)
    }

    return (
        <PortfolioGrid>
            {projects.map(project => (
                <ProjectCard
                    key={project.id}
                    onClick={() => handleProjectClick(project.id)}
                >
                    <ProjectImage>
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </ProjectImage>
                    <ProjectInfo>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectDescription>{project.description}</ProjectDescription>
                        <TechStack>
                            {project.tech.map(tech => (
                                <TechTag key={tech}>{tech}</TechTag>
                            ))}
                        </TechStack>
                    </ProjectInfo>
                </ProjectCard>
            ))}
        </PortfolioGrid>
    )
} 