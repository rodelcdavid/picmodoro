import React from "react";

export default function Upload({ goalImg, imageHandler }) {
  return (
    <div className="page">
      <div className="container">
        <h1 className="heading">Add your Image</h1>
        <div className="img-holder">
          {console.log(goalImg)}
          <img src={goalImg} alt="" id="img" className="img" />
        </div>
        <input
          type="file"
          accept="image/*"
          name="image-upload"
          id="input"
          onChange={imageHandler}
        />
      </div>
    </div>
  );
}
