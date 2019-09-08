import React from 'react';
import './style.scss';

import { Image as CloudinaryImage, Transformation } from 'cloudinary-react';

const Image = ({ className, publicId, transformation = {}, alt, url, defaultImage }) => {
    if (publicId) {
        return (
            <CloudinaryImage className={'Image ' + className} publicId={publicId}>
                <Transformation crop="fill" format="auto" quality="auto" {...transformation} />
            </CloudinaryImage>
        );
    }

    return (
        <img
            src={url || (defaultImage ? defaultImage : '')}
            alt={alt}
            className={'Image ' + className}
            width={transformation.width}
            height={transformation.height}
            // onLoad={this.setLoaded}
        />
    );
};

export default Image;
