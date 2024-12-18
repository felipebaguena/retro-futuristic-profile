'use client'
import styled from 'styled-components'
import { CRTText } from './styles/CRTText'

const FormContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;
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

export const ContactForm = () => {
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
        <FormContainer>
            <StyledForm onSubmit={handleSubmit}>
                <InputWrapper>
                    <CRTText as="label" htmlFor="nombre">Nombre:</CRTText>
                    <Input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                    />
                </InputWrapper>

                <InputWrapper>
                    <CRTText as="label" htmlFor="email">Email:</CRTText>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                </InputWrapper>

                <InputWrapper>
                    <CRTText as="label" htmlFor="telefono">Teléfono:</CRTText>
                    <Input
                        type="tel"
                        id="telefono"
                        name="telefono"
                    />
                </InputWrapper>

                <InputWrapper>
                    <CRTText as="label" htmlFor="mensaje">Mensaje:</CRTText>
                    <TextArea
                        id="mensaje"
                        name="mensaje"
                        required
                    />
                </InputWrapper>

                <SubmitButton type="submit">
                    <CRTText>Enviar Mensaje</CRTText>
                </SubmitButton>
            </StyledForm>
        </FormContainer>
    );
}; 