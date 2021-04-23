export const renderButton = operation => {
  const button = document.createElement('button');
  button.innerHTML = operation;

  return button;
};
