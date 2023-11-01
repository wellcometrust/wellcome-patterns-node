import Modal from '@weco/common/views/components/Modal/Modal';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import { useState, useRef, useEffect } from 'react';

const Template = () => {
  const [isActive, setIsActive] = useState(false);
  const openButtonRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      openButtonRef.current.click();
    }
  }, []);

  return (
    <div style={{ padding: '50px' }}>
      <ButtonSolid
        ref={openButtonRef}
        text="Show modal"
        clickHandler={() => setIsActive(true)}
      />
      <Modal
        id="test"
        openButtonRef={openButtonRef}
        isActive={isActive}
        setIsActive={setIsActive}
      >
        <p>This is a modal window.</p>
      </Modal>
    </div>
  );
};

export const basic = Template.bind({});
basic.storyName = 'Modal';
basic.parameters = {
  chromatic: {
    delay: 500, // Allow the button to get clicked
  },
};
