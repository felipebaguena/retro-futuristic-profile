'use client'
import styled, { keyframes } from 'styled-components'

const fadeInOverlay = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOutOverlay = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideInForm = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOutForm = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const Overlay = styled.div<{ $isExiting?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${props => props.$isExiting ? fadeOutOverlay : fadeInOverlay} 0.3s ease-out forwards;
`

const FormContainer = styled.div<{ $isExiting?: boolean }>`
  background: white;
  padding: 2rem;
  border-radius: 4px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${props => props.$isExiting ? slideOutForm : slideInForm} 0.3s ease-out forwards;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  
  &:hover {
    color: #000;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  color: #333;
  font-size: 0.9rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #666;
  }
`

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #666;
  }
`

const SubmitButton = styled.button`
  background: #333;
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #000;
  }
`

interface ModernContactFormProps {
    onClose: () => void;
    isExiting?: boolean;
}

export const ModernContactForm = ({ onClose, isExiting }: ModernContactFormProps) => {
    const formspreeUrl = "https://formspree.io/f/xpwzgbrg";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Mensaje enviado correctamente');
                (e.target as HTMLFormElement).reset();
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar el mensaje');
        }
    };

    return (
        <Overlay $isExiting={isExiting} onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <FormContainer $isExiting={isExiting} onClick={e => e.stopPropagation()}>
                <Header>
                    <Title>Contacto</Title>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </Header>
                <StyledForm onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input
                            type="text"
                            id="nombre"
                            name="nombre"
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                            type="tel"
                            id="telefono"
                            name="telefono"
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label htmlFor="mensaje">Mensaje</Label>
                        <TextArea
                            id="mensaje"
                            name="mensaje"
                            required
                        />
                    </InputGroup>

                    <SubmitButton type="submit">
                        Enviar mensaje
                    </SubmitButton>
                </StyledForm>
            </FormContainer>
        </Overlay>
    );
}; 