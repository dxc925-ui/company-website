import { useRef, useState } from "react";

interface ZoomImageProps {
  src: string;
  alt: string;
  zoom?: number; // 放大倍数
  lensRadius?: number; // 放大镜半径 (px)
}

export default function ZoomImage({
  src,
  alt,
  zoom = 2.5,
  lensRadius = 110,
}: ZoomImageProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  const width = containerRef.current?.clientWidth || 1;
  const height = containerRef.current?.clientHeight || 1;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-zoom-in"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />

      {isHovering && (
        <>
          {/* 放大图层 - 只在圆形区域内显示放大后的图片 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${zoom * 100}% ${zoom * 100}%`,
              backgroundPosition: `${(position.x / width) * 100}% ${
                (position.y / height) * 100
              }%`,
              backgroundRepeat: "no-repeat",
              clipPath: `circle(${lensRadius}px at ${position.x}px ${position.y}px)`,
              WebkitClipPath: `circle(${lensRadius}px at ${position.x}px ${position.y}px)`,
            }}
          />
          {/* 放大镜边框 */}
          <div
            className="absolute pointer-events-none rounded-full border-2 border-street-neon"
            style={{
              width: `${lensRadius * 2}px`,
              height: `${lensRadius * 2}px`,
              left: `${position.x - lensRadius}px`,
              top: `${position.y - lensRadius}px`,
              boxShadow:
                "0 0 0 1px rgba(10,10,10,0.5), 0 8px 30px rgba(196,246,0,0.35)",
            }}
          />
          {/* 十字准星 */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${position.x - 8}px`,
              top: `${position.y - 1}px`,
              width: "16px",
              height: "2px",
              background: "rgba(196,246,0,0.7)",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${position.x - 1}px`,
              top: `${position.y - 8}px`,
              width: "2px",
              height: "16px",
              background: "rgba(196,246,0,0.7)",
            }}
          />
        </>
      )}
    </div>
  );
}
