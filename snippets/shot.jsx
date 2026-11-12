export const Shot = ({ name, alt }) => (
  <Frame>
    <img src={`/images/guides/${name}-light.webp`} alt={alt} className="block dark:hidden" style={{ margin: 0 }} />
    <img src={`/images/guides/${name}-dark.webp`} alt={alt} className="hidden dark:block" style={{ margin: 0 }} />
  </Frame>
);
