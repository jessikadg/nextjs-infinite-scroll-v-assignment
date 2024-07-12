export const TrimUrl = (url: string) => {
  const questionMarkIndex = url.indexOf("?");
  if (questionMarkIndex === -1) {
    return url;
  } else {
    return url.substring(0, questionMarkIndex);
  }
};
