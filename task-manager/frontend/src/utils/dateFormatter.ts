export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString('uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
