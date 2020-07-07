export interface IImageCrop {
    // image source
    src: string;

    // callback function that passes the image after cropping
    setCroppedImage: Function;

    // crop area aspect ratio . Defaults to 4 / 3
    aspect?: number;

    // optional trigger for handling the crop modal.
    trigger?: React.ReactElement;

    // default state for showing the crop modal.
    open?: boolean;

    // function to be called when the crop modal closes.
    onClose?: Function;

    // canvas blob image type. Defaults to 'jpeg'
    imageType?: string;
}

export type ImageCropProps = IImageCrop;
