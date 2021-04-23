export const renderNumber = number => {
  const numberEl = document.createElement('code');
  numberEl.className = number <= 3 ? 'low' : number <= 7 ? 'medium' : 'high';
  numberEl.innerHTML = number;
  return numberEl;
};
