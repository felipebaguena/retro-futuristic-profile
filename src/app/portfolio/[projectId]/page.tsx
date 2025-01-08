'use client'
import { useParams } from 'next/navigation'
import { PortfolioNavbar } from '@/components/PortfolioNavbar'
import { ModernPageContainer, ModernContentContainer } from '@/components/styles/CommonElements'
import { projects } from '@/components/PortfolioView'
import { PersonalWebsiteDetail } from '@/components/portfolio-details/PersonalWebsiteDetail'
import { GrimReckoningDetail } from '@/components/portfolio-details/GrimReckoningDetail'
import { MVCDetail } from '@/components/portfolio-details/MVCDetail'

const getProjectComponent = (projectId: string) => {
    switch (projectId) {
        case 'personal-website':
            return PersonalWebsiteDetail
        case 'grim-reckoning':
            return GrimReckoningDetail
        case 'mvc-app':
            return MVCDetail
        default:
            return null
    }
}

export default function ProjectDetail() {
    const { projectId } = useParams()
    const project = projects.find(p => p.id === projectId)
    const ProjectDetailComponent = getProjectComponent(projectId as string)

    if (!project || !ProjectDetailComponent) {
        return <div>Proyecto no encontrado</div>
    }

    return (
        <>
            <PortfolioNavbar />
            <ModernPageContainer>
                <ModernContentContainer>
                    <ProjectDetailComponent project={project} />
                </ModernContentContainer>
            </ModernPageContainer>
        </>
    )
} 