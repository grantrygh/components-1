import React, { cloneElement, useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Box } from '../Box';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Heading } from '../Heading';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '../Modal';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '../Slider';
import getCroppedImg from './CropImage';
import useImageCropStyle from './styles';
import { ImageCropProps } from './types';

export const ImageCrop = ({
    src,
    aspect = 4 / 3,
    setCroppedImage,
    trigger,
    open = false,
    onClose,
    imageType = 'jpeg',
}: ImageCropProps) => {
    const [isOpen, setIsOpen] = useState(open);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const { root: containerStyleProps, controls: controlsStyleProps } = useImageCropStyle(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixelsNew) => {
        setCroppedAreaPixels(croppedAreaPixelsNew);
    }, []);

    const makeCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(src, croppedAreaPixels, rotation, imageType);
            if (setCroppedImage) {
                setCroppedImage(croppedImage);
            }
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation]);

    const closeModal = () => {
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };

    const closeWithSave = () => {
        makeCroppedImage();
        closeModal();
    };

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={closeModal} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading kind="h5">Crop Image</Heading>
                    </ModalHeader>

                    <ModalCloseButton onClick={closeModal} position="absolute" top="8px" right="12px" />

                    <ModalBody>
                        <Box {...containerStyleProps}>
                            <Cropper
                                image={src}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={aspect}
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </Box>
                        <Box {...controlsStyleProps}>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={zoomChange => setZoom(zoomChange)}
                            >
                                <SliderTrack />
                                <SliderFilledTrack />
                                <SliderThumb />
                            </Slider>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <ButtonGroup>
                            <Button variant="tertiary" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button onClick={closeWithSave}>Finish</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {trigger &&
                cloneElement(trigger, {
                    onClick: () => setIsOpen(!isOpen),
                })}
        </>
    );
};
