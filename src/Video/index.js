import 'intersection-observer';
import React, { useEffect, useRef, useState } from 'react';
import Box from '../Box';
import Heading from '../Heading';
import { LightboxMedia } from '../Lightbox';
import PseudoBox from '../PseudoBox';
import Text from '../Text';
import { useWindowResize } from '../utils';
import { isStuckStyle, videoStyle } from './styles';

function OuterContainer(props) {
    const { id, cover, children, src, withLightbox, iFrame, innerRef, ...rest } = props;

    const containerProps = {
        ...videoStyle,
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

const getMediaStyle = ({ isStuck, allowSticky }) => {
    if (isStuck && allowSticky) {
        return isStuckStyle;
    }

    return {};
};

const VideoError = ({ error }) => {
    return (
        <Box>
            <Heading size="md">Something went wrong!</Heading>
            <Text>{error.toString()}</Text>
        </Box>
    );
};

const SourceMissingError = new Error('video source missing');

export default function Video(props) {
    const { loading, error, src, cover, id, autoplay = true, allowSticky, ...rest } = props;

    const videoRef = useRef(null);

    const { windowWidth } = useWindowResize(1000);
    const [isStuck, setIsStuck] = useState(false);

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
                <video poster={cover} key={id} style={getMediaStyle({ isStuck, allowSticky })} />
            </OuterContainer>
        );
    }

    //! ERROR
    if (error || !src) {
        return <VideoError error={error || SourceMissingError} />;
    }

    if (src.indexOf('youtube') > -1) {
        return (
            <OuterContainer id={id} cover={cover} src={src} iFrame innerRef={videoRef} {...rest}>
                <iframe id="youtube_embed" src={src} {...props} style={getMediaStyle({ isStuck, allowSticky })} />
            </OuterContainer>
        );
    }

    //* Native Video
    return (
        <OuterContainer id={id} cover={cover} innerRef={videoRef} src={src} {...rest}>
            {/* <ContentWrap className={style.videoWrapperSticky}> */}
            <video
                poster={cover}
                playsInline
                key={id}
                controls
                autoPlay={autoplay}
                style={getMediaStyle({ isStuck, allowSticky })}
            >
                <source src={src} type="video/mp4" />
                <source src={src} media="all and (max-width:800px)" type="video/mp4" />
                <p>
                    Your browser doesn't support HTML5 video. Here is a <a href={src}>link to the video</a> instead.
                </p>
            </video>
            {/* </ContentWrap> */}
        </OuterContainer>
    );
}
