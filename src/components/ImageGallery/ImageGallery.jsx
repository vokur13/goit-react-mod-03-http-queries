import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ selectedGallery }) => {
  return (
    <ul className="gallery">
      {selectedGallery.map(({ id, webformatURL, largeImageURL }) => {
        <ImageGalleryItem />;
      })}
    </ul>
  );
};

const ArticleList = ({ articles }) => (
  <ul>
    {articles.map(({ objectID, url, title }) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
      </li>
    ))}
  </ul>
);
