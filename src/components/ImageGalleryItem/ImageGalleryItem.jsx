export const ImageGalleryItem = ({ url }) => {
  return (
    <li className="gallery-item">
      <img src={url} alt="" />
    </li>
  );
};
