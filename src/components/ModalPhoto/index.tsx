import { Modal, ContainerModal } from './styles';

interface ModalPhotoProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  img: string;
}

export function ModalPhoto({
  closeModal,
  modalIsOpen,
  img
}: ModalPhotoProps) {

  return (
    <>
      <Modal onClick={closeModal} isOpen={modalIsOpen}>
      </Modal>
      <ContainerModal isOpen={modalIsOpen} img={img}>
      </ContainerModal>
    </>

  )
}