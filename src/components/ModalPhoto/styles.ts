import { styled } from "@mui/material/styles";

type ModalProps = {
  isOpen: boolean;
}

export const Modal = styled('div') <ModalProps>`
  display: ${props => props.isOpen ? 'grid' : 'none'};

  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);;
  z-index: 2;

  justify-content: center;
  place-items: center;
`

type ContainerModalProps = {
  isOpen: boolean;
  img: string;
}

export const ContainerModal = styled('div') <ContainerModalProps>`
  display: ${props => props.isOpen ? 'block' : 'none'};

  background-image: url(${props => props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;

  width: 500px;
  height: 400px;
  background-color: #FFFFFF;
  border-radius: 5px;
`