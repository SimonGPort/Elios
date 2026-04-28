import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [heroSpriteCol, setHeroSpriteCol] = useState(0);
  const [heroState, setHeroState] = useState("rightIdleNoWeapon");
  const [heroSquarePosition, setHeroSquarePosition] = useState({ x: 0, y: 0 });
  const viewPortSize = 64;
  const ANIMATIONSPEED = 120; // milliseconds (animation speed)
  const TILE_SIZE = 64;
  const MAP_SIZE = 640;
  const offset = MAP_SIZE / 2 - TILE_SIZE / 2;

  const heroStateInfo = {
    rightIdleNoWeapon: { frameCount: 12, row: 0 },
    rightIdleWeapon: { frameCount: 12, row: -1 },
    rightWalkNoWeapon: { frameCount: 8, row: -2 },
    rightWalkWeapon: { frameCount: 8, row: -3 },
    rightAttackNoWeapon: { frameCount: 7, row: -4 },
    rightAttackWeapon: { frameCount: 6, row: -5 },
    downIdleNoWeapon: { frameCount: 12, row: -6 },
    downIdleWeapon: { frameCount: 12, row: -7 },
    downWalkNoWeapon: { frameCount: 8, row: -8 },
    downWalkWeapon: { frameCount: 8, row: -9 },
    downAttackNoWeapon: { frameCount: 7, row: -10 },
    downAttackWeapon: { frameCount: 6, row: -11 },
    leftIdleNoWeapon: { frameCount: 12, row: -12 },
    leftIdleWeapon: { frameCount: 12, row: -13 },
    leftWalkNoWeapon: { frameCount: 8, row: -14 },
    leftWalkWeapon: { frameCount: 8, row: -15 },
    leftAttackNoWeapon: { frameCount: 7, row: -16 },
    leftAttackWeapon: { frameCount: 6, row: -17 },
    upIdleNoWeapon: { frameCount: 12, row: -18 },
    upIdleWeapon: { frameCount: 12, row: -19 },
    upWalkNoWeapon: { frameCount: 8, row: -20 },
    upWalkWeapon: { frameCount: 8, row: -21 },
    upAttackNoWeapon: { frameCount: 7, row: -22 },
    upAttackWeapon: { frameCount: 6, row: -23 },
    dead: { frameCount: 14, row: -24 },
  };

  const keyMap = {
    ArrowDown: "downWalkNoWeapon",
    ArrowUp: "upWalkNoWeapon",
    ArrowLeft: "leftWalkNoWeapon",
    ArrowRight: "rightWalkNoWeapon",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSpriteCol(
        (prev) => (prev - 1) % heroStateInfo[heroState].frameCount,
      );
    }, ANIMATIONSPEED);

    return () => clearInterval(interval);
  }, [heroState]);

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tileX = Math.floor(x / TILE_SIZE);
    const tileY = Math.floor(y / TILE_SIZE);

    console.log("tile:", tileX, tileY);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
        }}
      >
        {/* 🌍 MAP (moves) */}
        <div
          onClick={handleMapClick}
          style={{
            position: "absolute",
            width: `${MAP_SIZE}px`,
            height: `${MAP_SIZE}px`,
            backgroundImage: "url('/map.jpg')",
            backgroundSize: `${MAP_SIZE}px ${MAP_SIZE}px`,
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",

            // 🎯 center map in viewport
            left: "50%",
            top: "50%",
            transform: `
      translate(-50%, -50%)
      translate(${offset - heroSquarePosition.x * TILE_SIZE}px, ${offset - heroSquarePosition.y * TILE_SIZE}px)
    `,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: viewPortSize,
            height: viewPortSize,
            backgroundImage: "url('/warrior.png')",
            backgroundPosition: `${heroSpriteCol * viewPortSize}px ${
              heroStateInfo[heroState].row * viewPortSize
            }px`,
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </>
  );
}

export default App;
