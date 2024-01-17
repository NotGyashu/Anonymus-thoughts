export const Footer = () => {
    const date = new Date()
    const year = date.getFullYear();
  return <div class=" bg-[#2d0d4a] text-white p-2 flex justify-center">{year}</div>;
};
