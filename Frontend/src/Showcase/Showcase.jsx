import React from 'react';

const imagesTop = [
  'https://framerusercontent.com/images/AUhIxzYlMaaZk6JsVpjWg4CN9s.png',
  'https://framerusercontent.com/images/wPKP0qP06exdGKNkTsmZ3uHHk.jpg?scale-down-to=512',
  'https://framerusercontent.com/images/ifOncw8817LMptpgHZZy4G8e6Q.jpg?scale-down-to=512',
];

const imagesBottom = [
  'https://framerusercontent.com/images/BybjBGz9yw8T69RSwtLKpE.jpg',
  'https://framerusercontent.com/images/jIz1W52hAPZXl8qLWjP5mKyjI.jpg',
  'https://framerusercontent.com/images/4yWp6DLOXx3Q3oqmAJdqCE6440.jpg',
];

const Showcase = () => {
  return (
    <section className="showcase-section py-5 text-center">
     
      <div className="d-flex justify-content-center flex-wrap  polaroid-row">
        {imagesTop.map((src, index) => (
          <div key={index} className={`polaroid-frame rotate-${index % 4}`}>
            <div className="tape"></div>
            <img src={src} alt={`img-${index}`} className="polaroid-img" />
          </div>
        ))}
      </div>

   
      <div className="showcase-center my-4">
        <h2 className="showcase-title">Showcase</h2>
        <p className="text-muted">A glimpse into some of our best work</p>
      </div>

     
      <div className="d-flex justify-content-center flex-wrap polaroid-row">
        {imagesBottom.map((src, index) => (
          <div key={index} className={`polaroid-frame rotate-${index % 4}`}>
            <div className="tape"></div>
            <img src={src} alt={`img-${index}`} className="polaroid-img" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Showcase;
