import styled from '@emotion/styled'
import { useEffect } from 'react'
import gsap from 'gsap'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 600px;
  width: 90%;
  color: white;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      gsap.from('.modal-content', {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      })
    }
  }, [isOpen])

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent className="modal-content" onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>{title}</h2>
        {children}
      </ModalContent>
    </ModalOverlay>
  )
}

export default Modal 