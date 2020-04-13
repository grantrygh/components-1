import 'intersection-observer';
import React, { useEffect, useRef, useState } from 'react';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { useWindowResize } from '../hooks/useWindowResize';
import { LightboxMedia } from '../Lightbox';
import { PseudoBox } from '../PseudoBox';
import { Text } from '../Text';
import useVideoStyle from './styles';
import { OuterContainerProps, VideoProps } from './types';

function OuterContainer(props: OuterContainerProps) {
    const { id, cover, children, src, withLightbox, full, iFrame, innerRef, ...rest } = props;
    const { root: videoStyleProps, full: fullVideoStyleProps } = useVideoStyle({});

    const containerProps = {
        ...videoStyleProps,
        ...(full && fullVideoStyleProps),
    };

    // set cover image background
    if (iFrame && cover) containerProps.style = { backgroundImage: `url(${cover})` };

    const innerContent = (
        <PseudoBox id={id} ref={innerRef} {...containerProps} {...rest}>
            {children}
        </PseudoBox>
    );

    if (withLightbox && src) {
        return (
            <LightboxMedia src={src} type="video" cover={cover}>
                {innerContent}
            </LightboxMedia>
        );
    }

    return innerContent;
}

const useMediaStyle = ({ isStuck = false, allowSticky = false, isEmbed = false, full = false, height, width }) => {
    const { stuck: isStuckStyleProps, native: nativeVideoStyleProps, iframe: iframeStyleProps } = useVideoStyle({});
    if (isStuck && allowSticky) {
        return isStuckStyleProps;
    }

    if (full || (height && width)) {
        if (!isEmbed) {
            return nativeVideoStyleProps;
        }
        return iframeStyleProps;
    }

    return {};
};

const VideoError = ({ error }) => {
    return (
        <Box>
            <Heading>Something went wrong!</Heading>
            <Text>{error.toString()}</Text>
        </Box>
    );
};

const SourceMissingError = new Error('video source missing');

export const Video = (props: VideoProps) => {
    const { loading, error, src, cover, id, autoplay = true, allowSticky, height, width, ...rest } = props;

    const videoRef = useRef(null);

    const { windowWidth } = useWindowResize(1000);
    const [isStuck, setIsStuck] = useState(false);

    const videoStyleProps = useMediaStyle({ isStuck, height, width, ...props });
    const embedStyleProps = useMediaStyle({ isStuck, isEmbed: true, height, width, ...props });

    useEffect(() => {
        if (allowSticky && 'IntersectionObserver' in window && windowWidth > 600) {
            const observer = new IntersectionObserver(
                items => {
                    items.forEach(item => {
                        setIsStuck(!item.isIntersecting);
                    });
                },
                {
                    threshold: 0.0,
                }
            );

            if (videoRef.current) {
                observer.observe(videoRef.current);
            }

            return () => {
                observer.disconnect();
            };
        }

        if (allowSticky && isStuck) {
            setIsStuck(false);
        }

        return () => {};
    }, [videoRef.current, windowWidth]);

    if (loading) {
        return (
            <OuterContainer id={id} cover={cover}>
                <video poster={cover} key={id} style={videoStyleProps} />
            </OuterContainer>
        );
    }

    //! ERROR
    if (error || !src) {
        return <VideoError error={error || SourceMissingError} />;
    }

    if (src.indexOf('youtube') > -1) {
        return (
            <OuterContainer
                id={id}
                cover={cover}
                src={src}
                iFrame
                innerRef={videoRef}
                height={height}
                width={width}
                {...rest}
            >
                <iframe id="youtube_embed" src={src} title="Video" style={embedStyleProps} {...props} />
            </OuterContainer>
        );
    }

    //* Native Video
    return (
        <OuterContainer id={id} cover={cover} innerRef={videoRef} src={src} height={height} width={width} {...rest}>
            <video poster={cover} playsInline key={id} controls autoPlay={autoplay} style={videoStyleProps}>
                <source src={src} type="video/mp4" />
                <source src={src} media="all and (max-width:800px)" type="video/mp4" />
                <p>
                    Your browser doesn't support HTML5 video. Here is a <a href={src}>link to the video</a> instead.
                </p>
            </video>
        </OuterContainer>
    );
};
