import React, { useRef, useState } from 'react';
import Modal from '@weco/common/views/components/Modal/Modal';
import { Button } from './MyAccount.style';

export type ChangeDetailsModalContentProps = {
  onComplete: () => void;
  onCancel: () => void;
};

type ChangeDetailsModalProps = {
  id: string;
  buttonText: string;
  content: React.ComponentType<ChangeDetailsModalContentProps>;
  isDangerous?: boolean;
  onSuccess?: () => void;
};

export const ChangeDetailsModal: React.FC<ChangeDetailsModalProps> = ({
  id,
  buttonText,
  content: Content,
  isDangerous = false,
  onSuccess = () => null,
}) => {
  const [isActive, setIsActive] = useState(false);
  const openButton = useRef(null);

  const handleComplete = () => {
    onSuccess();
    setIsActive(false);
  };

  return (
    <>
      <Button isDangerous={isDangerous} onClick={() => setIsActive(true)} ref={openButton}>
        {buttonText}
      </Button>
      <Modal id={id} isActive={isActive} setIsActive={setIsActive} openButtonRef={openButton}>
        <Content onComplete={handleComplete} onCancel={() => setIsActive(false)} />
      </Modal>
    </>
  );
};
