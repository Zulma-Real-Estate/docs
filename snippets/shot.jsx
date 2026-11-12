export const Shot = ({ name, alt, width }) => {
  const style = { margin: "0 auto", maxWidth: width ? `${width}px` : "100%", width: "100%" };
  return (
    <Frame>
      <img src={`/images/guides/${name}-light.webp`} alt={alt} className="block dark:hidden" style={style} />
      <img src={`/images/guides/${name}-dark.webp`} alt={alt} className="hidden dark:block" style={style} />
    </Frame>
  );
};
