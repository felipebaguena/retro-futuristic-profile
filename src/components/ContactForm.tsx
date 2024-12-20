'use client'
import styled, { keyframes } from 'styled-components'
import { CRTText } from './styles/CRTText'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;

const CenterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 2rem auto;
  padding: 1rem;
  box-sizing: border-box;
`

const FormContainer = styled.div<{ $isExiting?: boolean }>`
  width: 100%;
  max-width: 600px;
  animation: ${props => props.$isExiting ? fadeOut : fadeIn} 0.5s ease-out forwards;
  background: ${({ theme }) => theme.colors.terminal};
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 580px) {
    padding: 0.8rem;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Input = styled.input`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem;
  color: inherit;
  font-family: inherit;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.8);
  }
`

const TextArea = styled.textarea`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem;
  color: inherit;
  font-family: inherit;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.8);
  }
`

const SubmitButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  color: inherit;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
  }
`

const HeaderContainer = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 40px;
`;

const HeaderTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  color: ${({ theme }) => theme.colors.crtText};
  cursor: pointer;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.8rem;
  line-height: 1;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FormText = styled(CRTText)`
  font-size: 0.9rem;
  text-transform: uppercase;
`;

interface ContactFormProps {
    onClose: () => void;
    isExiting?: boolean;
}

export const ContactForm = ({ onClose, isExiting }: ContactFormProps) => {
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
        <CenterContainer>
            <FormContainer $isExiting={isExiting}>
                <HeaderContainer>
                    <HeaderTitle>
                        <FormText>Formulario de contacto</FormText>
                    </HeaderTitle>
                    <CloseButton onClick={onClose}>
                        ×
                    </CloseButton>
                </HeaderContainer>
                <StyledForm onSubmit={handleSubmit}>
                    <InputWrapper>
                        <FormText as="label" htmlFor="nombre">Nombre:</FormText>
                        <Input
                            type="text"
                            id="nombre"
                            name="nombre"
                            required
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <FormText as="label" htmlFor="email">Email:</FormText>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <FormText as="label" htmlFor="telefono">Teléfono:</FormText>
                        <Input
                            type="tel"
                            id="telefono"
                            name="telefono"
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <FormText as="label" htmlFor="mensaje">Mensaje:</FormText>
                        <TextArea
                            id="mensaje"
                            name="mensaje"
                            required
                        />
                    </InputWrapper>

                    <SubmitButton type="submit">
                        <CRTText>ENVIAR MENSAJE</CRTText>
                    </SubmitButton>
                </StyledForm>
            </FormContainer>
        </CenterContainer>
    );
}; 