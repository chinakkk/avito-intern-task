import { createContext, useContext, useState, ReactNode } from 'react';
import { Modal, ModalProps } from 'antd';

interface GlobalModalContextType {
  openModal: (props: Partial<ModalProps> & { content: ReactNode }) => void;
  closeModal: () => void;
}

const GlobalModalContext = createContext<GlobalModalContextType | null>(null);

export const useGlobalModal = () => {
  const context = useContext(GlobalModalContext);
  if (!context) throw new Error('GlobalModalContext not found');
  return context;
};

export const GlobalModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<Partial<ModalProps> & { content?: ReactNode }>({});

  const openModal = (props: Partial<ModalProps> & { content: ReactNode }) => {
    setModalProps(props);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalProps({});
  };

  return (
    <GlobalModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        open={isOpen}
        onCancel={closeModal}
        footer={modalProps.footer ?? null}
        title={modalProps.title}
        width={modalProps.width}
        {...modalProps}
      >
        {modalProps.content}
      </Modal>
    </GlobalModalContext.Provider>
  );
};
