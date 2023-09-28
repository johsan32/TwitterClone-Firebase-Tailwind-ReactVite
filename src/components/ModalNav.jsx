const ModalNav = ({ setShow, buttonRef }) => {
  const calculateModalPosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const top = buttonRect.bottom - 200;
      const left = buttonRect.left;
      return { bottom, left };
    }
    return { bottom: 0, left: 0 };
  };

  const modalPosition = calculateModalPosition();

  return (
    <div
      className="fixed flex justify-end space-y-4 animated fadeIn faster outline-none focus:outline-none"
      style={{
        bottom: `${modalPosition.bottom}px`,
        left: `${modalPosition.left}px`,
      }}
    >
      <div className="flex flex-col p-8 bg-gray-800 shadow-md hover:shadow-lg rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p
              className="font-medium leading-none text-gray-100"
              onClick={() => setShow(false)}
            >
              Delete Your Account?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNav;
