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
        link: "https://github.com/felipebaguena/retro-futuristic-profile"
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