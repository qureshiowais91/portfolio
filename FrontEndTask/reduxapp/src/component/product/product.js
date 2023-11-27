import React from 'react';

const Product = ({ product, addToCart }) => {
    const { title, description, price, brand, category, rating, stock, images, thumbnail } = product;
    // console.log(addToCart)
    return (
        <div className="col-9">
            <div className="card">
                <img src={thumbnail} className="card-img-top" alt="Product Thumbnail" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">Price: ${price}</p>
                    <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-body">
                    <h5 className="card-title">Product Details</h5>
                    <p className="card-text">Brand: {brand}</p>
                    <p className="card-text">Category: {category}</p>
                    <p className="card-text">Rating: {rating}</p>
                    <p className="card-text">Stock: {stock}</p>
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-body">
                    <h5 className="card-title">Product Images</h5>
                    {images.map((image, index) => (
                        <img key={index} src={image} className="img-fluid" alt={`Product Image ${index + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;