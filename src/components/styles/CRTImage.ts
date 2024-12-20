import styled, { keyframes } from "styled-components";

const staticNoise = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
`;

const rgbShift = keyframes`
  0% {
    filter: drop-shadow(2px 0 rgba(255,0,0,0.4)) drop-shadow(-2px 0 rgba(0,255,255,0.4));
  }
  33% {
    filter: drop-shadow(1.5px 0 rgba(255,0,0,0.4)) drop-shadow(-1.5px 0 rgba(0,255,255,0.4));
  }
  66% {
    filter: drop-shadow(2.5px 0 rgba(255,0,0,0.4)) drop-shadow(-2.5px 0 rgba(0,255,255,0.4));
  }
  100% {
    filter: drop-shadow(2px 0 rgba(255,0,0,0.4)) drop-shadow(-2px 0 rgba(0,255,255,0.4));
  }
`;

const colorGlitch = keyframes`
  0% {
    filter: none;
    opacity: 1;
  }
  0.5% {
    filter: saturate(400%) hue-rotate(-90deg) brightness(1.4);
    opacity: 0.9;
  }
  1% {
    filter: none;
    opacity: 1;
  }
  3% {
    filter: saturate(300%) hue-rotate(90deg) brightness(0.7);
    opacity: 0.9;
  }
  3.5% {
    filter: none;
    opacity: 1;
  }
  4% {
    opacity: 0.7;
  }
  4.1% {
    opacity: 1;
  }
  40% {
    filter: none;
    opacity: 1;
  }
  40.5% {
    filter: saturate(300%) hue-rotate(-60deg) brightness(1.3);
    opacity: 0.8;
  }
  40.8% {
    filter: none;
    opacity: 1;
  }
  75% {
    filter: none;
    opacity: 1;
  }
  75.5% {
    filter: saturate(400%) hue-rotate(-45deg) brightness(1.4);
    opacity: 0;
  }
  75.6% {
    opacity: 1;
  }
  76% {
    filter: none;
    opacity: 1;
  }
  85% {
    filter: none;
    opacity: 1;
  }
  85.5% {
    filter: saturate(400%) hue-rotate(-70deg) brightness(1.3);
    opacity: 0.8;
  }
  86% {
    filter: none;
    opacity: 1;
  }
  100% {
    filter: none;
    opacity: 1;
  }
`;

const glitch = keyframes`
  0% {
    transform: translate(0);
    opacity: 1;
  }
  0.1% {
    transform: translate(-3px, 2px);
    opacity: 0.8;
  }
  0.2% {
    transform: translate(3px, -2px);
    opacity: 1;
  }
  0.3% {
    transform: translate(0);
    opacity: 0.9;
  }
  5% {
    transform: translate(0);
    opacity: 1;
  }
  45% {
    transform: translate(0);
    opacity: 1;
  }
  45.1% {
    transform: translate(-2px, 1px);
    opacity: 0.8;
  }
  45.2% {
    transform: translate(2px, -1px);
    opacity: 1;
  }
  45.3% {
    transform: translate(0);
    opacity: 0.9;
  }
  95% {
    transform: translate(0);
    opacity: 1;
  }
  95.1% {
    transform: translate(-2px, 1px);
    opacity: 0.8;
  }
  95.2% {
    transform: translate(2px, -1px);
    opacity: 1;
  }
  95.3% {
    transform: translate(0);
    opacity: 0.9;
  }
  100% {
    transform: translate(0);
    opacity: 1;
  }
`;

export const CRTImageContainer = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  margin: 1rem auto;
  border: 2px solid ${({ theme }) => theme.colors.crtText};
  overflow: hidden;
  animation: ${rgbShift} 4s ease-in-out infinite, ${glitch} 8s step-end infinite;
  will-change: filter, transform, opacity;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
    background-size: 150px 150px;
    opacity: 0;
    z-index: 3;
    pointer-events: none;
    animation: ${staticNoise} 0.2s steps(2) infinite;
    mix-blend-mode: overlay;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(33, 255, 100, 0.15);
    mix-blend-mode: multiply;
    z-index: 1;
    pointer-events: none;
    animation: ${colorGlitch} 12s step-end infinite;
  }

  img {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    filter: brightness(1) contrast(1) sepia(0.15) blur(0.3px) saturate(1.4);
    transform: scale(1.01);
    image-resolution: 72dpi;
    transform-origin: center;
    transform: scale(0.9999);
  }

  &.noise-active::before {
    opacity: 1;
  }
`;
